<template>
    <h1 class="font-light text-xl text-center">Шаг 1. Введите размеры комнаты</h1>
    <div class="min-h-full flex items-center justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">

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

                <div class="mr-2">
                    <label for="room_height" class="">Высота</label>
                    <input @change="updatePerimeterAndSquares" id="room_height" name="room_height" v-model="room.height" type="text" autocomplete="current-password" required
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-md focus:outline-none
                           focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="Высота">
                </div>
            </div>
            <div>
                <div v-if="room.perimeter" class="pt-3">
                    Периметр: <span >{{room.perimeter}} м.</span>
                </div>
                <div v-if="room.square.ceiling" class="pt-3">
                    Площадь потолка: <span >{{room.square.ceiling}} кв.м.</span>
                    <br>
                    Площадь пола: <span >{{room.square.floor}} кв.м.</span>
                </div>
                <div v-if="room.square.sten" class="pt-3">
                    Площадь стен: <span >{{room.square.sten}} кв.м.</span>
                </div>
            </div>

        </div>
    </div>

    <h1 class="font-light text-xl text-center">Шаг 2. Добавьте виды работ</h1>
    <div class="min-h-full flex items-center justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="col-span-9 sm:col-span-3 w-5/12" style="">
            <label for="job_type" class="block text-sm font-medium text-gray-700">Наименование работы</label>
            <select v-model="currentPickedJob" @change="jobTypeChanged" v-if="work_types?.length" id="job_type" name="job_type" autocomplete="job name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3"
            >
                <option :value="null" selected>Выберите вид работы</option>
                <option v-for="(wt,index) in work_types"
                    :key="index"
                    :value="wt.id"
                    class="text-1xl"
                >{{wt.title}} - от {{wt.cost}}&nbsp;<span class="font-semibold">₽</span></option>
            </select>
            <div>
<!--                {{currentPickedJob}}-->
            </div>
            <div v-if="currentPickedJob == 1" class="ceiling_calc_wrapper">
                <CeilingCalc :square="room.square.ceiling">
                </CeilingCalc>
            </div>

        </div>
    </div>
    <div class="min-h-full flex items-center justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="col-span-9 sm:col-span-3 w-5/12" style="">
            <h2 class="font-light text-xl text-center">Уже добавленные виды работ:</h2>
            <div v-if="!added_jobs?.length">
                <span class="block text-center">Пока еще нет добавленых работ</span>
            </div>
            <div v-else>
                <div>
                    <div v-for="(job,index) in added_jobs"
                        :key="index"
                         class="flex justify-between mt-2"
                    >{{index+1}}. {{getJobTitleById(job.id)}}
                        <div class="flex self-center">
                            {{ getJobCostById(job.id) }}&nbsp;<span class="font-semibold"> ₽</span>
                            <button
                                type="button"
                                class="h-6 w-6 ml-2
                            flex items-center justify-center
                            rounded-full
                            border border-transparent
                            text-sm text-red-500
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-red-500
                        ">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="h-5 w-5 -mt-1 inline-block
                                    self-end"
                                     fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>

    <h1 class="font-normal text-2xl text-center">Стоимость работ</h1>
    <div class="min-h-full flex items-center justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <h3>IM here</h3>
    </div>
</template>

<script >
import CeilingCalc from "../components/CeilingCalc.vue";

export default {
    name: "RoomSize",
    components: { CeilingCalc },
    data(){
        return {
            currentPickedJob: null,
            room: {
                sizes : {
                    s1: "4",
                    s2: "3.5",
                    s3: "4",
                    s4: "3.5",
                },
                height: "2.6",
                perimeter: "",
                square: {
                    ceiling: 0,
                    floor: 0,
                    sten: 0,
                },
            },
            work_types: [
                {
                    id: 1,
                    title: "Натяжной потолок",
                    description: '',
                    cost: 500,
                },
                {
                    id: 7,
                    title: "Натяжная стена",
                    description: '',
                    cost: 500,
                },
                {
                    id: 3,
                    title: "Шпатлевка под обои (все стены)",
                    description: '',
                    cost: 200,
                },
                {
                    id: 4,
                    title: "Шпатлевка под обои (потолок)",
                    description: '',
                    cost: 250,
                },
                {
                    id: 5,
                    title: "Гипсокартон (все стены потолок)",
                    description: '',
                    cost: 200,
                },
                {
                    id: 6,
                    title: "Гипсокартон (потолок)",
                    description: '',
                    cost: 250,
                },
            ],
            added_jobs:[
                {
                    id: 1,
                },
                {
                    id: 3,
                },
                {
                    id: 4,
                },
            ],
        }
    },
    methods: {
        updatePerimeter() {
            this.room.perimeter = +(this.room.sizes.s1) +
                +(this.room.sizes.s2) +
                +(this.room.sizes.s3) +
                +(this.room.sizes.s4);
        },
        updateCeilingSquare(){
            this.room.square.ceiling =
                +(this.room.sizes.s1) +
                +(this.room.sizes.s2)

            this.room.square.floor = this.room.square.ceiling
        },
        updateStenaSquare(){
            this.room.square.sten = this.room.perimeter * +(this.room.height)
        },
        updateSquaresHanlder(){
            this.updateCeilingSquare();
            this.updateStenaSquare();
        },
        updatePerimeterAndSquares(){
            this.updatePerimeter();
            this.updateCeilingSquare();
            this.updateStenaSquare();
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
            let find = "";
            for (let i in this.work_types){
                if (this.work_types[i].id === (id)){
                    find = this.work_types[i].cost;

                    switch (id){
                        case 1: find *= this.room.square.ceiling; break;
                        case 2: find *= this.room.square.sten; break;
                        case 3: find *= this.room.square.sten; break;
                        case 4: find *= this.room.square.ceiling; break;
                    }

                    break;
                }
            }
            return find;
        },
        jobTypeChanged(ev){
            //console.log(ev)
        }
    },
    created() {
        this.updatePerimeterAndSquares();
    },
}
</script>

<style scoped>
</style>
