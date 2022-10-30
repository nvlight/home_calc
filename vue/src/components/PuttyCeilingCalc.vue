<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaultRoomSizesHandler">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="rounded-md shadow-sm flex mt-2">
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s1" :placeholder="'кв.м.'">Сторона 1</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s2" :placeholder="'кв.м.'">Сторона 2</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s3" :placeholder="'кв.м.'">Сторона 3</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s4" :placeholder="'кв.м.'">Сторона 4</mg-input-labeled>
        </div>
    </div>

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div>Длина: {{length}}</div>
            <div>Ширина: {{width}}</div>
            <div>Площадь: <span class="font-semibold">{{fullSquare}}</span> м.кв.</div>
        </div>
        <div class="w-5/12">
            <div class="mt-2">
                <mg-input-labeled v-model="incSquareCount" :placeholder="'кв.м.'">Прибавить кв.м.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount" :placeholder="'кв.м.'">Убавить кв.м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <div class="mt-2 w-4/12">
            <mg-input-labeled v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2">Сумма: <span class="font-semibold">{{sum}} {{currency}}</span></div>

    <mg-button @click="addCalcedPuttyCeiling">Добавить сумму</mg-button>

</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: 'putty-ceiling-calc',
    props: {
        'room': {
            type: Object,
            required: true,
        },
        'currentPickedJob':{
            type: Number,
            required: true,
        }
    },
    data(){
        return {
            title: 'Подсчет гипсокартона, потолок',

            sizes: {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },

            incSquareCount: 0,
            decSquareCount: 0,

            price: 250,
        }
    },
    methods: {
        ...mapActions({
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
            addJob: 'addJob',
        }),

        setDefaultRoomSizesHandler(){
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes(){
            this.sizes = Object.assign({}, this.room.sizes);
        },

        addCalcedPuttyCeiling(){
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
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            addedJobNum: state => state.addedJobNum,
        }),

        length(){
            return Math.max(+this.sizes.s1, +this.sizes.s3)
        },
        width(){
            return Math.max(+this.sizes.s2, +this.sizes.s4)
        },
        square(){
            return this.length * this.width;
        },
        fullSquare(){
            return (this.square
                + +this.incSquareCount
                - +this.decSquareCount).toFixed(2);
        },
        sum(){
            return +this.price * +this.fullSquare;
        },

        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Квадратура: ${this.square} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },
    },
    mounted() {
        this.setDefaultRoomSizesHandler();
    }
}
</script>

<style scoped>

</style>
