<template>
    <!-- Шаг 1. Введите размеры комнаты -->
    <div class="min-h-full p-2 sm:px-2 lg:px-2">
        <div class="max-w-md w-full">

            <div class="flex flex-wrap w-full">
                <div class="font-semibold text-xl mr-2"> {{room.id}}.</div>
                <div class="mr-2 flex-grow">
                    <mg-input-labeled v-model="title"></mg-input-labeled>
                </div>
                <div class="flex justify-between items-center">
                    <mg-update-icon-button @click="updateRoom({room_id: room.id, title})" class="mt-0.5"></mg-update-icon-button>

                    <mg-trash-icon-button @click="deleteRoomHandler(room.id)"></mg-trash-icon-button>
                </div>
            </div>
            <h1 class="font-light text-xl text-center">Шаг 1. Введите размеры комнаты</h1>

            <div class="rounded-md flex justify-around flex-wrap ">
                <mg-input-labeled-2 class="" v-model="room.sizes.s1">Сторона 1</mg-input-labeled-2>
                <mg-input-labeled-2 class="" v-model="room.sizes.s2">Сторона 2</mg-input-labeled-2>
                <mg-input-labeled-2 class="" v-model="room.sizes.s3">Сторона 3</mg-input-labeled-2>
                <mg-input-labeled-2 class="" v-model="room.sizes.s4">Сторона 4</mg-input-labeled-2>
                <mg-input-labeled-2 class="" v-model="room.height">Высота</mg-input-labeled-2>
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

    <job-selection :room="room"/>
    <room-job-list :room_id="room.id"/>
    <room-material-list :room_id="room.id"/>
    <room-jobs-materials-sum/>
</template>

<script>
import {mapState, mapActions} from "vuex";
import RoomJobList from "../roomJob/RoomJobList.vue";
import RoomJobsSum from "../roomJob/RoomJobsSum.vue";
import RoomJobsMaterialsSum from "./RoomJobsMaterialsSum.vue";
import RoomMaterialList from "../roomMaterial/RoomMaterialList.vue";
import RoomDoor from "./door/RoomDoor.vue";
import RoomWindow from "./window/RoomWindow.vue";
import RoomBaseboards from "./baseboards/RoomBaseboards.vue";
import JobSelection from "../job/JobSelection.vue";

export default {
    name: "room-item",
    components: {
        RoomJobList, RoomJobsSum, RoomJobsMaterialsSum,
        RoomMaterialList, RoomDoor, RoomWindow, RoomBaseboards, JobSelection,
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

            added_materials: [],
            sizes: {},
        }
    },
    methods: {
        ...mapActions({
            deleteRoom: 'room/deleteRoom',
            insertRoom: 'room/createRoomQuery',
            updateRoom: 'room/updateRoom',
        }),

        deleteRoomHandler(id){
            if (confirm('Удалить комнату?')){
                this.deleteRoom(id);
            }
        },
    },
    computed:{
        ...mapState({
            //addedJobs: state => state.addedJobs,
        }),

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
        this.title = this.room.title;
    },
}
</script>

<style scoped>
</style>
