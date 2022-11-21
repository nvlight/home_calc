<template>
    <h3 class="text-center text-2xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaultsDoorsCount">установить количество дверей по умолчанию</mg-button>
    </div>

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

    <mg-button @click="">Добавить рекомендованные материалы</mg-button>
    <room-material-form :room_id="room.id"></room-material-form>

</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";

export default {
    name: "doorstep-calc.vue",
    components: {
        MaterialsForBuyBlock, RoomMaterialForm,
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
            title: 'Пороги',
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
            addJob: 'roomJob/createRoomJob',
        }),

        setDefaults(){
            this.setDefaultsDoorsCount();
        },
        setDefaultsDoorsCount(){
            this.doorsCount = this.room.doors.length;
        },

        createJob() {
            const job = {}
            const currentJobId = this.$store.getters['room/getSelectedJob'](this.room.id)[0]?.jobId;
            job.title = `${this.title} (id=${currentJobId})`;
            job.room_id = this.room.id;
            job.job_id = currentJobId;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            return job;
        },
        addCalced() {
            this.addJob(this.createJob());
        },
    },
    computed: {
        ...mapState({
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
            arr.push(
                {
                    title: 'Пороги',
                    amount: this.doorsCount,
                    amount_add_info: this.doorsCount,
                    unit_name: 'ед.',
                }
            );
            return arr;
        }
    },
    mounted() {
        this.setDefaults();

        if (sessionStorage.getItem('currentPickedJob')) {
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>

</style>
