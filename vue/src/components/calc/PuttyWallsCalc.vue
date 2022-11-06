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
        <div class="mr-2">
            <mg-input-labeled v-model="height"   :placeholder="'кв.м.'">Высота</mg-input-labeled>
        </div>
    </div>

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div class="mt-3">
                <div>Периметр: <span class="font-semibold">{{perimeter}} м.</span></div>
                <div>Площадь стен: <span class="font-semibold">{{squareWalls}} кв.м.</span></div>
            </div>
        </div>
        <div class="w-5/12">
            <div class="">
                <mg-input-labeled :modelValue="incSquareCount" @input="incSquareCount = $event.target.value"
                                  :placeholder="'кв.м.'">Прибавить кв.м.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount" :placeholder="'кв.м.'">Убавить кв.м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div v-if="this.$store.state.debug" class="mt-3 border-dotted border-2 p-3 border-red-400">
        <div>{{ windows }}</div>
        <div>{{ doors }}</div>
        <div>windowsSquare: {{ windowsSquare }}</div>
        <div>doorsSquare:   {{ doorsSquare }}</div>
        <div>fullSquareWalls: {{ fullSquareWalls }}</div>
    </div>

    <div class="mt-2">Площадь с учетом дверей и окон:</div>
    <div><span class="font-semibold">{{ ceiledFullSquareWalls }} кв.м. ({{ fullSquareWalls }}) кв.м.</span></div>

    <div class="mt-3 w-4/12">
        <div class="mt-2">
            <mg-input-labeled v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2 ">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

    <mg-button @click="addCalced">Добавить сумму</mg-button>

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>

</template>

<script>
import {mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";

export default {
    name: 'putty-walls-calc',
    components: {MaterialsForBuyBlock},
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            title: 'Шпатлевка, стены',
            currentPickedJob: 0,

            sizes: {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            height: 0,

            incSquareCount: 0,
            decSquareCount: 0,

            price: 200,
            doors: [],
            windows: [],
        }
    },
    methods:{
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
            this.height = this.room.height;
        },

        createJob() {
            const job = {}
            job.title = `${this.title} (id=${this.currentPickedJob})`;
            job.id = this.addedJobNum;
            job.room_id = this.room.id;
            job.job_id = this.currentPickedJob;
            job.sum = this.totalAmount.price;
            job.adding_job_info_string = this.totalAmount.adding_job_info_string;
            return job;
        },
        addCalced() {
            this.incrementAddedJobNum();

            const job = this.createJob();

            this.incValueToJobsResultingSum(job.sum);
            this.addJob(job);
        },
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            addedJobNum: state => state.addedJobNum,
        }),

        perimeter(){
            return +(this.sizes.s1) +
                +(this.sizes.s2) +
                +(this.sizes.s3) +
                +(this.sizes.s4);
        },
        perimeterCeil(){
            return Math.ceil(this.perimeter);
        },
        squareCeiling(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        squareFloor(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        squareWalls(){
            // бизнес-требование, площадь стен нужно округлять вверх!
            return Math.ceil(+this.perimeter * +this.height)
                + +this.incSquareCount
                - +this.decSquareCount
        },
        fullSquareWalls(){
            return (+ this.squareWalls
                    + this.squareToInc + this.squareToDec
            ).toFixed(2)
        },
        ceiledFullSquareWalls(){
            return Math.ceil( this.fullSquareWalls );
        },

        sum(){
            return this.ceiledFullSquareWalls * this.price;
        },

        materials(){
            const arr = [];
            arr.push({title: 'Шпатлевка "SATENTEK" 25 кг.', amount: 0, unit_name: 'мешков.',});
            return arr;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Квадратура: ${this.squareWalls} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },

        windowsSquare(){
            let s1 = 0;
            let s2 = 0;
            let SInc = 0;
            let SDec = 0;
            this.windows.forEach(t => {
                s1 = t.width * t.height * 2;
                s2 = t.width * t.length;
                SInc = s1 + s2;
                SDec = t.height * t.length;
            });
            return {SInc, SDec};
        },
        doorsSquare(){
            let s1 = 0;
            let s2 = 0;
            let SInc = 0;
            let SDec = 0;
            this.doors.forEach(t => {
                s1 = t.width * t.height * 2;
                s2 = t.width * t.length;
                SInc = s1 + s2;
                SDec = t.height * t.length;
            });
            return {SInc, SDec};
        },
        squareToInc(){
            return +this.windowsSquare.SInc +this.doorsSquare.SInc
        },
        squareToDec(){
            return -(+this.windowsSquare.SDec) + (-+this.doorsSquare.SDec);
        },

    },
    mounted() {
        this.setDefaultRoomSizesHandler();

        this.doors   = Object.assign([], this.room.doors);
        this.windows = Object.assign([], this.room.windows);

        if (sessionStorage.getItem('currentPickedJob')) {
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>

</style>
