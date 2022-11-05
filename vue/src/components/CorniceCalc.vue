<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaultSizes">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="flex justify-between mt-2">
        <div class="self-center">
            <mg-input-labeled class="" v-model="perimeter" :placeholder="'кв.м.'">Периметр</mg-input-labeled>
        </div>

        <div class="">
            <div>
                <mg-input-labeled :modelValue="incPerimeterCount" @input="incPerimeterCount = $event.target.value"
                              :placeholder="'кв.м.'">Прибавить м.</mg-input-labeled>
            </div>
            <div>
                <mg-input-labeled v-model="decPerimeterCount" :placeholder="'кв.м.'">Убавить м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div>Результирующий периметр: <span class="font-semibold">{{changedPerimeter}}</span> м.</div>

    <div class="mt-3 flex justify-between">
        <div class="w-5/12">
            <mg-input-labeled v-model="priceInstallation" :placeholder="'кв.м.'">Установка, сумма за 1 м.</mg-input-labeled>
        </div>
        <div class="w-5/12">
            <mg-input-labeled v-model="pricePainting" :placeholder="'кв.м.'">Покраска, сумма за 1 м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2">
        <mg-checkbox v-model="select" :options="options"></mg-checkbox>
    </div>

    <div class="mt-2 ">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

    <mg-button @click="addCalcedCornices">Добавить сумму</mg-button>

</template>

<script>
import {mapState, mapActions} from "vuex";
import MgCheckbox from "./UI/MgCheckbox.vue";

export default {
    name: 'cornice-calc',
    components: {MgCheckbox},

    props: {
        'room':{
            type: [Object],
            required: true,
        },
    },
    data(){
        return {
            title: 'Карнизы',

            incPerimeterCount: 0,
            decPerimeterCount: 0,

            priceInstallation: 70,
            pricePainting: 80,
            currentPickedJob: 0,

            toggle:[],
            isInstallation: true,
            isPainting: true,
            options: [
                { value: 1, name: 'установка', },
                { value: 2, name: 'покраска',  selected: true,  },
            ],
            select: [],
        }
    },
    methods: {
        ...mapActions({
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
            addJob: 'addJob',
        }),

        addCalcedCornices(){
            this.incrementAddedJobNum();

            let tmp_job = {}
            tmp_job.title = `${this.title} (id=${this.currentPickedJob})`;
            tmp_job.id = this.addedJobNum;
            tmp_job.room_id = this.room.id;
            tmp_job.job_id = this.currentPickedJob;
            tmp_job.sum = this.totalAmount.price;
            tmp_job.adding_job_info_string = this.totalAmount.adding_job_info_string;

            this.incValueToJobsResultingSum(tmp_job.sum);
            this.addJob(tmp_job);
        },

        setDefaultSizes(){

        },
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            addedJobNum: state => state.addedJobNum,
        }),

        perimeter(){
            return +this.room.sizes.s1 +
                +this.room.sizes.s2 +
                +this.room.sizes.s3 +
                +this.room.sizes.s4
        },

        changedPerimeter(){
            return +this.perimeter + +this.incPerimeterCount + (- +this.decPerimeterCount);
        },

        sumPriceInstallation(){
            return +this.changedPerimeter * this.priceInstallation;
        },
        sumPricePainting(){
            return +this.changedPerimeter * this.pricePainting;
        },

        sum(){
            let s = 0;

            if (this.select.includes(1)){
                s += this.sumPriceInstallation;
            }
            if (this.select.includes(2)){
                s += this.sumPricePainting;
            }

            return s;
        },

        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Периметр: ${this.changedPerimeter} м.,
                    установка, цена за 1 м.: ${this.priceInstallation} ${this.currency}
                     покраска, цена за 1 м.: ${this.pricePainting} ${this.currency}`,
            };
        },
    },
    mounted() {
        this.setDefaultSizes();

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    },

}
</script>

<style scoped>
</style>
