<template>
    <h3 class="text-center text-2xl font-semibold">{{ title }}</h3>

    <div class="mt-2 flex justify-between">
        <mg-input-labeled v-model="doorsCount">Количество дверей</mg-input-labeled>
        <mg-input-labeled v-model="price">Цена</mg-input-labeled>
    </div>

    <div class="mt-2">
        <div>Cумма: {{ sum }} {{ currency }}</div>
    </div>
    <mg-button @click="addCalced">Добавить сумму</mg-button>

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>
    <mg-button @click="addMaterials">Добавить материалы</mg-button>

</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";

export default {
    name: "doorstep-calc.vue",
    components: {
        MaterialsForBuyBlock,
    },
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    emits: [],
    data() {
        return {
            title: 'Подсчет порогов',
            currentPickedJob: 0,

            price: 150,
            customPrice: 0,
            isCustomPrice: false,
            doorsCount: 0,
            doorstepToBuyCount: 0,
        }
    },
    methods: {
        ...mapActions({
            addJob: 'addJob',
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
        }),

        addMaterials(){

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
    computed: {
        ...mapState({
            addedJobNum: state => state.addedJobNum,
            currency: state => state.currency,
        }),

        sum() {
            return this.price * this.doorsCount;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Количество дверей: ${this.doorsCount} единиц,
                    цена за 1 единицу: ${this.price} ${this.currency}`,
            };
        },
        materials() {
            const arr = [];
            arr.push({title: 'Пороги', amount: this.doorsCount, unit_name: 'ед.',});
            return arr;
        }
    },
    mounted() {
        this.doorsCount = this.room.doors.length;

        if (sessionStorage.getItem('currentPickedJob')) {
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>

</style>
