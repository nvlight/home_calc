<template>
    <!-- Шаг 1. Введите размеры комнаты -->
    <div class="min-h-full flex items-center justify-start pt-4 pb-2 px-2 sm:px-2 lg:px-2">
        <div class="max-w-md w-full space-y-2">

            <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400">
                {{ room }}
            </div>

            <h1 class="font-semibold text-xl text-center">Комната {{number+1}}</h1>
            <h1 class="font-light text-xl">Шаг 1. Введите размеры комнаты</h1>

            <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400">
                isSimpleSidesCounting: {{(room.isSimpleSidesCounting)}}
            </div>
            <fieldset>
                <div class="space-y-4">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input :id="'isSimpleSidesCountingId' + number" name="comments" type="checkbox"
                                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                                   focus:outline-none  focus:ring-offset-2 focus:ring-indigo-500                                   "
                                   @click="isSimpleSidesCountingChange"
                                   checked
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label :for="'isSimpleSidesCountingId' + number" class="font-medium text-gray-700">Простой подсчет сторон</label>
                        </div>
                    </div>

                </div>
            </fieldset>

            <div class="rounded-md shadow-sm flex">
                <div class="mr-2">
                    <label for="s1" class="">Сторона 1</label>
                    <input @change="updatePerimeterAndSquares" id="s1" name="s1" v-model="room.sizes.s1" type="text" autocomplete="s1" required
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Сторона 1">
                </div>
                <div class="mr-2">
                    <label for="s2" class="">Сторона 2</label>
                    <input @change="updatePerimeterAndSquares" id="s2" name="s2" v-model="room.sizes.s2" type="text" autocomplete="s2" required
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Сторона 2">
                </div>

                <template v-if="!room.isSimpleSidesCounting">
                    <div class="mr-2">
                        <label for="s3" class="">Сторона 3</label>
                        <input @change="updatePerimeterAndSquares" id="s3" name="s3" v-model="room.sizes.s3" type="text" autocomplete="s3" required
                               class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                               placeholder="Сторона 3">
                    </div>
                    <div class="mr-2">
                        <label for="s4" class="">Сторона 4</label>
                        <input @change="updatePerimeterAndSquares" id="s4" name="s4" v-model="room.sizes.s4" type="text" autocomplete="current-password" required
                               class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                               placeholder="Сторона 4">
                    </div>
                </template>

                <div class="mr-2">
                    <label for="room_height" class="">Высота</label>
                    <input @change="updatePerimeterAndSquares" id="room_height" name="room_height" v-model="room.height" type="text" autocomplete="current-password" required
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-md focus:outline-none
                           focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Высота">
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
                            <input  required
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
                <div v-if="room.perimeter" class="pt-3">
                    Периметр: <span >{{room.perimeter}} м.</span>
                </div>
                <div v-if="room.square.ceiling" class="pt-3">
                    Площадь потолка: <span >{{room.square.ceiling}} кв.м.</span>
                    <br>
                    Площадь пола: <span >{{room.square.floor}} кв.м.</span>
                </div>
                <div v-if="room.square.walls" class="pt-3">
                    Площадь стен: <span >{{room.square.walls}} кв.м.</span>
                </div>
            </div>

        </div>
    </div>

    <!-- Шаг 2. Выбор и добавление работ -->
    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-2 lg:px-2">
        <div class="max-w-md w-full space-y-2">
            <h1 class="font-light text-xl text-center">Шаг 2. Выбор и добавление работ</h1>

            <label for="job_type" class="block text-sm font-medium text-gray-700">Наименование работы</label>
            <select v-model="currentPickedJob" @change="setCurrentPickedJob(currentPickedJob)" v-if="work_types?.length" id="job_type" name="job_type" autocomplete="job name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3"
            >
                <option :value="0" selected>Выберите вид работы</option>
                <option v-for="(wt,index) in work_types"
                    :key="index"
                    :value="wt.id"
                    class="text-1xl"
                >{{wt.id}}.  {{wt.title}}<span class="font-semibold"></span></option>
            </select>

            <div v-if="$store.state.debug" class="border-dotted border-2 p-3 border-red-400">
                currentPickedJob: {{(currentPickedJob)}} {{Boolean(currentPickedJob)}}
            </div>

            <show-picked-component
                :currentPickedJob="currentPickedJob"
                :room="room">
            </show-picked-component>
        </div>
    </div>

    <!-- Результаты подсчетов -->
    <div class="resultOfCalculations">
        <h1 class="font-semibold text-2xl text-center">Результаты подсчетов</h1>
    </div>

    <!-- added Jobs list -->
    <added-job-list :room_id="room.id"></added-job-list>
    <!-- / -->

    <!-- added Building materials list -->
    <added-building-materials-list></added-building-materials-list>
    <!-- / added Building materials list -->
</template>

<script>
import CeilingCalc from "../components/CeilingCalc.vue";
import LaminateCalc from "../components/LaminateCalc.vue";
import DoorstepCalc from "./DoorstepCalc.vue";
import BaseboardsCalc from "./BaseboardsCalc.vue";
import {mapState, mapActions, mapGetters} from "vuex";
import WallpaperCalc from "./WallpaperCalc.vue";
import ShowPickedComponent from "./ShowPickedComponent.vue";
import AddedJobList from "./AddedJobList.vue";
import AddedBuildingMaterialsList from "./AddedBuildingMaterialsList.vue";
import RoomJobsSum from "./RoomJobsSum.vue";

export default {
    name: "room-item",
    components: {
        WallpaperCalc, DoorstepCalc, CeilingCalc, LaminateCalc, BaseboardsCalc, ShowPickedComponent, AddedJobList,
        AddedBuildingMaterialsList, RoomJobsSum
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
            currentPickedJob: 0,
            work_types: [
                {
                    id: 1,
                    title: "Натяжной потолок",
                    description: '',
                    cost: 400,
                },
                {
                    id: 8,
                    title: "Гипсокартон (потолок)",
                    description: '',
                    cost: 350,
                },
                {
                    id: 9,
                    title: "Гипсокартон (стены)",
                    description: '',
                    cost: 300,
                },
                {
                    id: 2,
                    title: "Карнизы",
                    description: '',
                    cost: 75,
                },
                {
                    id: 4,
                    title: "Шпатлевка под обои (потолок)",
                    description: '',
                    cost: 250,
                },
                {
                    id: 5,
                    title: "Шпатлевка под обои (стены)",
                    description: '',
                    cost: 200,
                },
                {
                    id: 6,
                    title: "Обои поклейка (потолок)",
                },
                {
                    id: 7,
                    title: "Обои, поклейка (стены)",
                },
                {
                    id: 10,
                    title: "Ламинат",
                    description: '',
                    cost: 150,
                },
                {
                    id: 12,
                    title: "Плинтуса, установка",
                    description: '',
                    cost: 70
                },
                {
                    id: 13,
                    title: "Порог, установка",
                    description: '',
                    cost: 150
                },
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
            deleteJob: 'deleteJobHandler',
            setCurrentPickedJob: 'setCurrentPickedJob',
        }),
        isSimpleSidesCountingChange(){
            this.room.isSimpleSidesCounting = !(this.room.isSimpleSidesCounting);
            this.updatePerimeterAndSquares();
        },
        updatePerimeterHandler(sidesArr) {
            let res = 0;
            for(let i=0; i<sidesArr.length; i++){
                res += +(sidesArr[i]);
            }
            return res;
        },
        updatePerimeter() {
            if (this.room.isSimpleSidesCounting){
                this.room.perimeter = this.updatePerimeterHandler([
                    (this.room.sizes.s1),
                    (this.room.sizes.s2),
                    (this.room.sizes.s1),
                    (this.room.sizes.s2),
                ]);
            }else{
                this.room.perimeter = this.updatePerimeterHandler([
                    (this.room.sizes.s1),
                    (this.room.sizes.s2),
                    (this.room.sizes.s3),
                    (this.room.sizes.s4),
                ]);
            }
        },
        updateCeilingSquareHandler(sidesArr){
            let res = 1;
            for(let i=0; i<sidesArr.length; i++){
                res *= +(sidesArr[i]);
            }
            return res;
        },
        updateCeilingAndFloorSquare(){
            if (this.room.isSimpleSidesCounting){
                this.room.square.ceiling = this.updateCeilingSquareHandler([
                    (this.room.sizes.s1),
                    (this.room.sizes.s2),
                ]);
                this.room.square.floor = this.room.square.ceiling
            }else{
                // todo пока тут дублирование идет, исправить потом, выбирать наибольшие 2 из 4-х сторон
                this.room.square.ceiling = this.updateCeilingSquareHandler([
                    (this.room.sizes.s1),
                    (this.room.sizes.s2),
                ]);
                this.room.square.floor = this.room.square.ceiling
            }
        },
        updateWallsSquare(){
            this.room.square.walls = this.room.perimeter * +(this.room.height)
        },
        updatePerimeterAndSquares(){
            this.updatePerimeter();
            this.updateCeilingAndFloorSquare();
            this.updateWallsSquare();
        },
        getJobTitleById(id){
            let find = "";
            for (let i in this.work_types){
                if (this.work_types[i].id === parseInt(id)){
                   find = this.work_types[i].title + ` (id=${this.work_types[i].id})`;

                   break;
                }
            }
            return find;
        },
        getJobCostById(id){
            let job_cost = 0;
            let adding_job_info_string = "";
            const currency = "₽";
            for (let i in this.work_types){
                if (this.work_types[i].id === (id)){
                    job_cost = this.work_types[i].cost;

                    switch (id){
                        case 2:
                            job_cost *= this.room.perimeter;
                            adding_job_info_string = `${this.room.perimeter} x ${job_cost} ${currency}`;
                            break;
                        case 3:
                            adding_job_info_string = `${this.room.perimeter} x ${job_cost} ${currency}`;
                            job_cost *= this.room.perimeter;
                            break;
                        case 4:
                            adding_job_info_string = `${this.room.square.ceiling} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.ceiling;
                            break;
                        case 5:
                            adding_job_info_string = `${this.room.square.walls} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.walls;
                            break;
                        case 6:
                            adding_job_info_string = `${this.room.square.ceiling} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.ceiling;
                            break;
                        case 7:
                            adding_job_info_string = `${this.room.square.walls} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.walls;
                            break;
                        case 8:
                            adding_job_info_string = `${this.room.square.ceiling} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.ceiling;
                            break;
                        case 9:
                            adding_job_info_string = `${this.room.square.walls} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.walls;
                            break;
                        case 10:
                            adding_job_info_string = `${this.room.square.floor} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.floor;
                            break;
                        case 11:
                            adding_job_info_string = `${this.room.square.floor} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.floor;
                            break;
                        case 12:
                            adding_job_info_string = `${this.room.perimeter} x ${job_cost} ${currency}`;
                            job_cost *= this.room.perimeter;
                            break;
                        case 27:
                            adding_job_info_string = `${this.room.square.ceiling} x ${job_cost} ${currency}`;
                            job_cost *= this.room.square.ceiling;
                            break;
                    }

                    break;
                }
            }
            return {
                job_cost,
                adding_job_info_string,
            };
        },

        addCalcedJob(){
            //console.log('addCalcedJob');
            this.addedJobs_i++;

            let tmp_job = {}
            tmp_job.id = this.addedJobs_i;
            tmp_job.job_id = this.currentPickedJob; // choosed id

            let job_cost = this.getJobCostById(this.currentPickedJob);
            tmp_job.summ = job_cost['job_cost'];
            tmp_job.adding_job_info_string = job_cost['adding_job_info_string'];

            tmp_job.title = this.getJobTitleById(tmp_job.job_id);
            //console.log(tmp_job);

            this.$store.commit('incValueToJobsResultingSumm', tmp_job.summ);

            this.addedJobs.push(tmp_job);
        },

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
            currPickedJob: state => state.currentPickedJob,
        }),
        ...mapGetters({
            jobsSum: 'jobsSum',
        }),
    },
    created() {
        this.updatePerimeterAndSquares();

        if (this.room.isSimpleSidesCounting){
            this.room.sizes.s3 = this.room.sizes.s1;
            this.room.sizes.s4 = this.room.sizes.s2;
        }

        this.updatePerimeterAndSquares();
    },
    mounted() {

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    },
}
</script>

<style scoped>
</style>
