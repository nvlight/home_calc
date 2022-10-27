<template>
    <h3 class="text-center text-2xl font-semibold">Подсчет порогов</h3>

    <div class="mt-2 flex justify-between">
        <label class="">
            <span>Количество дверей</span>
            <input
                type="text"
                v-model="doorsCount"
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                       rounded-b-md rounded-t-md
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="количество дверей">
        </label>
        <label class="">
            <span>Цена</span>
            <input
                type="text"
                v-model="price"
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                       rounded-b-md rounded-t-md
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="цена">
        </label>
    </div>

    <div class="mt-2">
        <div>Cумма: {{ sum }} {{ currency }}</div>
    </div>
    <mg-button @click="addCalcedDoorstep">Добавить сумму</mg-button>

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>
    <mg-button @click="addMaterials">Добавить материалы</mg-button>

</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "./additional/MaterialsForBuyBlock.vue";

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
        'currentPickedJob':{
            type: Number,
            required: true,
        }
    },
    emits: [],
    data() {
        return {
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
        addCalcedDoorstep(){
            this.incrementAddedJobNum();

            let tmp_job = {}
            tmp_job.title = "Пороги" + ` (id=${this.currentPickedJob})`;
            tmp_job.id = this.addedJobNum;
            tmp_job.room_id = this.room.id;
            tmp_job.job_id = this.currentPickedJob;
            tmp_job.sum = this.totalAmount.price;
            tmp_job.adding_job_info_string = this.totalAmount['adding_job_info_string'];

            this.incValueToJobsResultingSum(tmp_job.sum);
            this.addJob(tmp_job);
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
            return [
                {
                    title: 'Пороги',
                    description: this.doorsCount + ' ед.',
                },
            ];
        }
    },
    mounted() {
        this.doorsCount = this.room.doors.length;
        this.doorstepToBuyCount = this.doorsCount;
    }
}
</script>

<style scoped>

</style>
