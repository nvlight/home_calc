<template>
    <!-- Шаг 1. Введите размеры комнаты -->
    <div class="min-h-full flex items-center justify-start pt-4 pb-2 px-2 sm:px-2 lg:px-2">
        <div class="max-w-md w-full space-y-2">

            <div class="flex">
                <div class="w-full flex items-center">
                    <div class="font-semibold text-xl"> {{number}}.</div>
                    <div class="w-full ml-2 mr-2">
                        <mg-input-labeled classes="md:text-xl" v-model="title"></mg-input-labeled>
                    </div>

                </div>
                <div class="flex justify-between items-center">
                    <button @click="updateRoom({number, title})" class="mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-700">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                    </button>

                    <mg-trash-icon-button @click="deleteRoom(number)"></mg-trash-icon-button>
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

            <div class="windows_doors_showHide_labels">
                <div class="flex justify-between">
                    <label>
                        <input type="checkbox"
                               :value="this.room.is_windows_showing"
                               @change="this.room.is_windows_showing = !this.room.is_windows_showing"
                        >
                        <span class="pl-1">Показать окна</span>
                    </label>
                    <label>
                        <input type="checkbox"
                               :value="this.room.is_doors_showing"
                               @change="this.room.is_doors_showing = !this.room.is_doors_showing"
                        >
                        <span class="pl-1">Показать двери</span>
                    </label>
                </div>

            </div>

            <div class="windows_wrapper"
                 v-if="this.room.is_windows_showing">
                <div class="flex">
                    <div class="mr-2">
                        <label class="">
                            <span>Длина</span>
                            <input required
                                   v-model="windows_add.length"
                                   class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="1.2">
                        </label>
                    </div>
                    <div class="mr-2">
                        <label class="">
                            <span>Высота</span>
                            <input required
                                   v-model="windows_add.height"
                                   class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="1.2">
                        </label>
                    </div>
                    <div class="mr-2">
                        <label class="">
                            <span>Ширина (проем)</span>
                            <input  required
                                   v-model="windows_add.width"
                                   class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="1.2">
                        </label>
                    </div>
                </div>
                <div class="mt-3">
                    <button
                        @click="addWindow"
                        class="py-2 px-4
                        border border-transparent
                        text-sm font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500">
                        <span class="">Добавить окно</span>
                    </button>
                </div>
                <div v-if="this.room?.windows" class="mt-3">
                    <div v-for="(window, key) in this.room.windows"
                        class="flex items-center justify-between
                        ">
                        <div>
                            <div class="font-semibold">{{key+1}}.</div>
                            <ul>
                                <li>Длина: {{window.length}} м.</li>
                                <li>Высота: {{window.height}} м.</li>
                                <li>Ширина (проем): {{window.width}} м.</li>
                            </ul>
                        </div>
                        <div>
                            <button
                                @click="deleteWindow(window.id)"
                                class="ml-1 p-1
                                text-red-500
                                rounded-full
                                focus:outline-none
                                border border-transparent
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-red-300
                                ">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else="">
                    <span class="font-light">Нет окон</span>
                </div>
            </div>

            <div class="doors_wrapper"
                 v-if="this.room.is_doors_showing">
                <div class="flex">
                    <div class="mr-2">
                        <label class="">
                            <span>Длина</span>
                            <input  required
                                    v-model="doors_add.length"
                                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="1.2">
                        </label>
                    </div>
                    <div class="mr-2">
                        <label class="">
                            <span>Высота</span>
                            <input required
                                   v-model="doors_add.height"
                                   class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="1.2">
                        </label>
                    </div>
                    <div class="mr-2">
                        <label class="">
                            <span>Ширина (проем)</span>
                            <input  required
                                    v-model="doors_add.width"
                                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="1.2">
                        </label>
                    </div>
                </div>
                <div class="mt-3">
                    <button
                        @click="addDoor"
                        class="py-2 px-4
                        border border-transparent
                        text-sm font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500">
                        <span class="">Добавить дверь</span>
                    </button>
                </div>
                <div v-if="this.room?.doors" class="mt-3">
                    <div v-for="(door, key) in this.room.doors"
                         class="flex items-center justify-between
                        ">
                        <div>
                            <div class="font-semibold">{{key+1}}.</div>
                            <ul>
                                <li>Длина: {{door.length}} м.</li>
                                <li>Высота: {{door.height}} м.</li>
                                <li>Ширина (проем): {{door.width}} м.</li>
                            </ul>
                        </div>
                        <div>
                            <button
                                @click="deleteDoor(door.id)"
                                class="ml-1 p-1
                                text-red-500
                                rounded-full
                                focus:outline-none
                                border border-transparent
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-red-300
                                ">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else="">
                    <span class="font-light">Нет дверей</span>
                </div>
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

            <label for="job_type" class="block text-sm font-medium text-gray-700">Наименование работы</label>
            <select v-model="currentPickedJob" @change="setCurrentPickedJob(currentPickedJob)" v-if="workTypes?.length" id="job_type" name="job_type" autocomplete="job name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3"
            >
                <option :value="0" selected>Выберите вид работы</option>
                <option v-for="(wt,index) in workTypes"
                    :key="index"
                    :value="wt.id"
                    class="text-1xl"
                >{{wt.id}}.  {{wt.title}}<span class="font-semibold"></span></option>
            </select>

            <show-picked-component
                :currentPickedJob="currentPickedJob"
                :room="room">
            </show-picked-component>
        </div>
    </div>

    <!-- added Jobs list -->
    <room-job-list :room_id="room.id"></room-job-list>
    <!-- / added Jobs list -->

    <room-jobs-materials-sum :room_id="room.id"></room-jobs-materials-sum>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";
import ShowPickedComponent from "./ShowPickedComponent.vue";
import RoomJobList from "./RoomJobList.vue";
import AddedBuildingMaterialsList from "./AddedBuildingMaterialsList.vue";
import RoomJobsSum from "./RoomJobsSum.vue";
import RoomJobsMaterialsSum from "./RoomJobsMaterialsSum.vue";

export default {
    name: "room-item",
    components: {
        ShowPickedComponent, RoomJobList, AddedBuildingMaterialsList, RoomJobsSum, RoomJobsMaterialsSum,
    },
    props: {
        number: Number,
        room: Object,
    },
    emits: [
        'addCalcedCeiling',
        'addCalcedDoorstep',
        'addWindow',
        'deleteWindow',
        'addDoor',
        'deleteDoor',
    ],
    data(){
        return {
            projectId: 0,
            projectName: '',
            title: 'Имя комнаты',

            currentPickedJob: 0,

            workTypes: [
                { id: 1, title: "Натяжной потолок",},
                { id: 8, title: "Гипсокартон (потолок)",},
                { id: 9, title: "Гипсокартон (стены)",},
                { id: 2, title: "Карнизы",},
                { id: 4, title: "Шпатлевка под обои (потолок)",},
                { id: 5, title: "Шпатлевка под обои (стены)", },
                { id: 6, title: "Обои поклейка (потолок)", },
                { id: 7, title: "Обои, поклейка (стены)", },
                { id: 10,title: "Ламинат",},
                { id: 12,title: "Плинтуса",},
                { id: 13,title: "Порог",},
                { id: 14,title: "Плитка, пол",},
                { id: 15,title: "Плитка, стены",},
            ],
            added_materials: [],
            windows_add:{
                length: 1.2,
                height: 1.1,
                width: 0.4,
            },
            doors_add:{
                length: 0.8,
                height: 2.1,
                width: 0.3,
            },
        }
    },
    methods: {
        ...mapActions({
            deleteRoom: 'room/deleteRoom',
            setCurrentPickedJob: 'setCurrentPickedJob',
            insertRoom: 'room/createRoomQuery',
            updateRoom: 'room/updateRoom',
        }),

        addWindow(){
            //console.log('addWindow');
            if (!this.windows_add.height || !this.windows_add.length || !this.windows_add.width){
                alert('Параметры окна не должны быть пустыми!');
                return;
            }

            const res = {
              windows_add: this.windows_add,
              room_id: this.room.id,
            };

            this.$emit('addWindow', res);
        },
        deleteWindow(del_id){
            const res = {
                del_id: del_id,
                room_id: this.room.id,
            };

            this.$emit('deleteWindow', res);
        },
        addDoor(){
            //console.log('addWindow');
            if (!this.doors_add.height || !this.doors_add.length || !this.doors_add.width){
                alert('Параметры дверы не должны быть пустыми!');
                return;
            }

            const res = {
                doors_add: this.doors_add,
                room_id: this.room.id,
            };

            this.$emit('addDoor', res);
        },
        deleteDoor(del_id){
            const res = {
                del_id: del_id,
                room_id: this.room.id,
            };

            this.$emit('deleteDoor', res);
        },

    },
    computed:{
        ...mapState({
            addedJobs: state => state.addedJobs,
        }),
        ...mapGetters({
            //jobsSum: 'roomJob/jobsSum',
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

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    },
}
</script>

<style scoped>
</style>
