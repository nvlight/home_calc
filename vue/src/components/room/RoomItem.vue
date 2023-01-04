<template>
    <!-- Шаг 1. Введите размеры комнаты -->
    <div class="min-h-full flex items-center justify-start pt-4 pb-2 px-2 sm:px-2 lg:px-2">
        <div class="max-w-md w-full space-y-2">

            <div class="flex">
                <div class="w-full flex items-center">
                    <div class="font-semibold text-xl"> {{room.id}}.</div>
                    <div class="w-full ml-2 mr-2">
                        <mg-input-labeled classes="md:text-xl" v-model="title"></mg-input-labeled>
                    </div>

                </div>
                <div class="flex justify-between items-center">
                    <mg-update-icon-button @click="updateRoom({room_id: room.id, title})" class="mt-0.5"></mg-update-icon-button>

                    <mg-trash-icon-button @click="deleteRoomHandler(room.id)"></mg-trash-icon-button>
                </div>
            </div>
            <h1 class="font-light text-xl">Шаг 1. Введите размеры комнаты</h1>

            <div class="rounded-md shadow-sm flex">
                <div class="mr-2">
                    <mg-input-labeled v-model="room.sizes.s1">Сторона 1</mg-input-labeled>
                </div>
                <div class="mr-2">
                    <mg-input-labeled v-model="room.sizes.s2">Сторона 2</mg-input-labeled>
                </div>
                <div class="mr-2">
                    <mg-input-labeled v-model="room.sizes.s3">Сторона 3</mg-input-labeled>
                </div>
                <div class="mr-2">
                    <mg-input-labeled v-model="room.sizes.s4">Сторона 4</mg-input-labeled>
                </div>

                <div class="mr-2">
                    <mg-input-labeled v-model="room.height">Высота</mg-input-labeled>
                </div>
            </div>

            <div class="windows_doors_baseboards">
                <room-door :room="room"></room-door>
                <room-window :room="room"></room-window>
                <room-baseboards :room="room"></room-baseboards>
            </div>

            <div class="rooms_calc">
                <div>Периметр: <span class="font-semibold">{{perimeter}}</span> м.</div>
                <div>Площадь потолка: <span class="font-semibold">{{squareCeiling}} </span> кв.м.</div>
                <div>Площадь пола: <span class="font-semibold">{{squareFloor}} </span> кв.м.</div>
                <div>Площадь стен: <span class="font-semibold">{{squareWalls}} </span> кв.м.</div>
            </div>

        </div>
    </div>

    <!-- Шаг 2. Выбор и добавление работ -->
    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-2 lg:px-2">
        <div class="max-w-md w-full space-y-2">
            <h1 class="font-light text-xl text-center">Шаг 2. Выбор и добавление работ</h1>

            <label>
                <span class="block text-sm font-medium text-gray-700">Наименование работы</span>
                <select v-model="selectedJob" @change="setRoomSelectedJobId(selectedRoomJobIds)"
                    v-if="jobSelectList?.length"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3"
                >
                    <option :value="-1" selected>Выберите вид работы</option>
                    <option v-for="(job,index) in jobSelectList"
                        :key="index"
                        :value="index"
                        class="text-1xl"
                    >{{index+1}}. {{job.data().title}}<span class="font-semibold"></span></option>
                </select>
            </label>

            <job-select
                :selectedJob="selectedJob"
                :room="room"
            ></job-select>

        </div>
    </div>

    <!-- room job list -->
    <room-job-list :room_id="room.id"></room-job-list>
    <!-- /room job list -->

    <!-- room material list -->
    <room-material-list :room_id="room.id"></room-material-list>
    <!-- /room material list -->

    <room-jobs-materials-sum ></room-jobs-materials-sum>
</template>

<script>
import {mapState, mapActions} from "vuex";
import RoomJobList from "../roomJob/RoomJobList.vue";
import RoomJobsSum from "../roomJob/RoomJobsSum.vue";
import RoomJobsMaterialsSum from "./RoomJobsMaterialsSum.vue";
import RoomMaterialList from "../roomMaterial/RoomMaterialList.vue";
import JobSelectList from "../job"
import JobSelect from "../job/JobSelect.vue";
import RoomDoor from "./door/RoomDoor.vue";
import RoomWindow from "./window/RoomWindow.vue";
import RoomBaseboards from "./baseboards/RoomBaseboards.vue";

export default {
    name: "room-item",
    components: {
        RoomJobList, RoomJobsSum, RoomJobsMaterialsSum,
        RoomMaterialList, JobSelect, RoomDoor, RoomWindow, RoomBaseboards,
    },
    props: {
        room: Object,
    },
    provide(){
        return {
            room_id: this.room.id, // this is not reactive!
            //room_id: computed( () => this.room.id ), // this is reactive!
        }
    },
    data(){
        return {
            projectId: 0,
            projectName: '',
            title: 'Имя комнаты',

            selectedJob: 0,

            added_materials: [],
            jobSelectList: [],

            sizes: {},
        }
    },
    methods: {
        ...mapActions({
            deleteRoom: 'room/deleteRoom',
            insertRoom: 'room/createRoomQuery',
            updateRoom: 'room/updateRoom',
            setRoomSelectedJobId: 'room/setRoomSelectedJobId',
        }),

        deleteRoomHandler(id){
            if (confirm('Удалить комнату?')){
                this.deleteRoom(id);
            }
        },
    },
    computed:{
        ...mapState({
            addedJobs: state => state.addedJobs,
        }),

        selectedRoomJobIds(){
            return {
                roomId: this.room.id,
                jobId: this.selectedJob,
            }
        },

        perimeter(){
            return (+this.room.sizes.s1 +
                    +this.room.sizes.s2 +
                    +this.room.sizes.s3 +
                    +this.room.sizes.s4).toFixed(2)
        },
        squareCeiling(){
            return (Math.max(+this.room.sizes.s1, +this.room.sizes.s3) *
                    Math.max(+this.room.sizes.s2, +this.room.sizes.s4)).toFixed(2)
        },
        squareFloor(){
            return this.squareCeiling;
        },
        squareWalls(){
            return (this.perimeter * this.room.height).toFixed(2)
        },

    },
    created(){
    },
    mounted(){
        this.jobSelectList = JobSelectList;
        this.title = this.room.title;
        //this.sizes = {...this.room.sizes};

        if (sessionStorage.getItem('selectedJobsArray')){
            let pr = JSON.parse(sessionStorage.getItem('selectedJobsArray'));
            const ser = pr.filter(t => t.roomId === this.room.id);
            this.selectedJob = ser.length ? ser[0].jobId : 0;
            // todo: возможно не стоит доверь данным из session, поставить проверку на set
            this.$store.commit('room/setRoomSelectedJobsArray', pr);
        }
    },
}
</script>

<style scoped>
</style>
