<template>
    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">

            <h1 class="font-light text-xl text-center">Шаг 1. Введите размеры комнаты</h1>

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

    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">
            <h1 class="font-light text-xl text-center">Шаг 2. Добавьте виды работ</h1>

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
                >{{wt.id}}.  {{wt.title}} - от {{wt.cost}}&nbsp;<span class="font-semibold">₽</span></option>
            </select>
            <div>
                currentPickedJob:
                {{(currentPickedJob)}}
                {{Boolean(currentPickedJob)}}
            </div>
            <div v-if="currentPickedJob == 1" class="ceiling_calc_wrapper">
                <CeilingCalc
                    @addCalcedCeiling="addCalcedCeilingHandler"
                    :square="room.square.ceiling"
                    :perimeter="room.perimeter"
                    :roomSizes="room.sizes"
                >
                </CeilingCalc>
            </div>
            <div v-else-if="Boolean(currentPickedJob) !== false">
                <button @click="addCalcedJob"
                        class="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"/>
                        </svg>
                      </span>
                    Добавить
                </button>
            </div>

        </div>
    </div>

    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">
            <h2 class="font-light text-xl text-center">Уже добавленные виды работ:</h2>

            <div v-if="!added_jobs?.length">
                <span class="block text-center">Пока еще нет добавленых работ</span>
            </div>
            <div v-else>
                <div v-for="(job,index) in added_jobs"
                    :key="index"
                     class="flex justify-between mt-2"
                >{{index+1}}. {{getJobTitleById(job.id)}}
                    <div class="flex self-center">
                        {{ job.summ }}
                        <span class="font-semibold">&nbsp;₽</span>
                        <button
                            @click="deleteAddedJob(job.iid)"
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
                <!-- jobsSumm -->
                <div class="mt-3">
                    <span class="text-2xl">Стоимость работ: {{jobsSumm}}&nbsp;₽</span>
                </div>
                <!--/ jobsSumm -->
            </div>

        </div>
    </div>

    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">
            <h2 class="font-light text-xl text-center">Уже добавленные строительные материалы:</h2>

            <div v-if="!addedMaterials?.length">
                <span class="block text-center">Пока еще нет добавленных сроительных материалов</span>
            </div>
            <div v-else>
                <div v-for="(material,index) in addedMaterials"
                     :key="index"
                     class="flex justify-between mt-2"
                >{{index+1}}.&nbsp;
                    <div class="flex self-center">
                        <span>{{ material.name }}, вес/количество: <strong>{{ material.weight }}</strong>
                            [{{material.itemId}}] id: {{material.id}}
                        </span>
                        <span class="font-semibold">{{ material.price }} <strong>₽</strong></span>
                        <button type="button"
                            @click="deleteAddedMaterial(material.id)"
                            class="h-6 w-6 ml-2 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500
                                focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="h-5 w-5 -mt-1 inline-block self-end"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- MaterialSumm -->
                <div class="mt-3">
                    <span class="text-2xl">Стоимость строительных материалов: {{materialsSumm}}&nbsp;₽</span>
                </div>
                <!--/ MaterialSumm -->
            </div>

        </div>
    </div>
</template>

<script >
import CeilingCalc from "../components/CeilingCalc.vue";
import {mapState} from "vuex";

export default {
    name: "RoomSize",
    components: { CeilingCalc },
    emits: ['addCalcedCeiling'],
    data(){
        return {
            added_jobs_i : 0, // index
            currentPickedJob: 1,
            room: {
                sizes : {
                    s1: "5.8",
                    s2: "5.1",
                    s3: "5.8",
                    s4: "5.1",
                },
                height: "3",
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
                    title: "Карнизы - установка",
                    description: '',
                    cost: 75,
                },
                {
                    id: 3,
                    title: "Карнизы - покраска",
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
                    title: "Шпатлевка под обои (все стены)",
                    description: '',
                    cost: 200,
                },
                {
                    id: 6,
                    title: "Обои поклейка (потолок)",
                    description: '',
                    cost: 250,
                },
                {
                    id: 7,
                    title: "Обои поклейка (все стены)",
                    description: '',
                    cost: 200,
                },


                {
                    id: 27,
                    title: "Натяжная стена",
                    description: '',
                    cost: 400,
                },
            ],
            added_jobs:[],
            added_materials: [],
        }
    },
    methods: {
        updatePerimeter() {
            this.room.perimeter =
                Math.ceil(
                    +(this.room.sizes.s1) +
                    +(this.room.sizes.s2) +
                    +(this.room.sizes.s3) +
                    +(this.room.sizes.s4)
                );
        },
        updateCeilingSquare(){
            this.room.square.ceiling =
                +(this.room.sizes.s1) *
                +(this.room.sizes.s2)

            this.room.square.floor = this.room.square.ceiling
        },
        updateStenaSquare(){
            this.room.square.sten = this.room.perimeter * +(this.room.height)
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
            let find = 0;
            for (let i in this.work_types){
                if (this.work_types[i].id === (id)){
                    find = this.work_types[i].cost;

                    switch (id){
                        case 2: find *= this.room.perimeter; break;
                        case 3: find *= this.room.perimeter; break;
                        case 4: find *= this.room.square.ceiling; break;
                        case 5: find *= this.room.square.sten; break;
                        case 6: find *= this.room.square.ceiling; break;
                        case 7: find *= this.room.square.sten; break;
                        case 8: find *= this.room.square.ceiling; break;
                        case 9: find *= this.room.square.sten; break;
                        case 27: find *= this.room.square.ceiling; break;
                    }

                    break;
                }
            }
            return find;
        },
        jobTypeChanged(ev){
            //console.log(ev)
        },

        addCalcedJob(){
            //console.log('addCalcedJob');
            let jobCost = this.getJobCostById(this.currentPickedJob);

            this.added_jobs_i++;

            let tmp_job = {}
            tmp_job.id = this.currentPickedJob; // choosed id
            tmp_job.summ = jobCost;
            tmp_job.iid = this.added_jobs_i;
            this.added_jobs.push(tmp_job);
        },
        addCalcedCeilingHandler(res){
            console.log(res);
            this.added_jobs_i++;

            let tmp_job = {}
            tmp_job.id = 1; // nat pot
            tmp_job.selected_id = res.selected_id;
            tmp_job.summ = res.price;
            tmp_job.iid = this.added_jobs_i;
            this.added_jobs.push(tmp_job);
        },
        deleteAddedJob(del_id){
            //console.log(del_id)
            this.added_jobs = this.added_jobs.filter(
                t => t.iid != del_id
            )
        },
        deleteAddedMaterial(material_id){
            this.$store.commit('deleteMaterial', material_id);
        }
    },
    computed:{
        jobsSumm(){
            return this.added_jobs.reduce(
                (previousValue, currentValue) => previousValue + currentValue.summ,
                0
            );
        },

        materialsSumm(){
            return this.$store.state.materialsForBuy.reduce(
                (previousValue, currentValue) => previousValue + +currentValue.price,
                0
            );
        },

        addedMaterials(){
            return this.$store.state.materialsForBuy;
        },
    },
    created() {
        this.updatePerimeterAndSquares();
        this.added_jobs_i++;
    },
}
</script>

<style scoped>
</style>
