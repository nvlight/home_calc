<template>
    <h3 class="text-center text-2xl font-semibold">{{ title }}</h3>

    <mg-button @click="setDefaultPerimeter">Установить периметр по умолчанию</mg-button>

    <div class="mt-2 flex justify-between">
        <mg-input-labeled v-model="perimeterCeiled">Периметр ({{perimeter}})</mg-input-labeled>
        <mg-input-labeled v-model="price">Цена</mg-input-labeled>
    </div>
    <div class="mt-2">
        <div>Cумма: {{sum}} {{currency}}</div>
    </div>

    <h3 class="font-semibold mt-3">Ввод углов комнаты для подсчета уголков</h3>
    <mg-button @click="setDefaultsBaseboardAccessories">Установить количество принадлежностей по умолчанию</mg-button>

    <div class="Baseboards_consumables">
        <div class="mt-2 flex justify-between">
            <mg-input-labeled v-model="internalCorners">Внутренние углы</mg-input-labeled>
            <mg-input-labeled v-model="outerCorners">Внешние углы</mg-input-labeled>
        </div>
        <div class="mt-2 flex justify-between items-center">
            <mg-input-labeled v-model="connectors">Соединители</mg-input-labeled>
            <mg-input-labeled v-model="stubs">Заглушки <br>(пара, правая и левая)</mg-input-labeled>
        </div>
    </div>

    <mg-button @click="addCalced">Добавить сумму</mg-button>

    <div>
        <mg-input-labeled class="block mt-1" v-model="baseboardLength">Длина плинтуса (м.)</mg-input-labeled>
    </div>

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>

    <mg-button @click="">Добавить рекомендованные материалы</mg-button>
    <room-material-form></room-material-form>

</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";

export default {
    name: "baseboards-calc",
    props:{
        room: {
            type: Object,
            required: true,
        },
    },
    components: {
        MaterialsForBuyBlock, RoomMaterialForm,
    },
    emits: [],
    data(){
        return{
            title: 'Плинтуса',

            perimeter: 0,
            perimeterCeiled: 0,
            price: 70,

            internalCorners: 4,
            outerCorners: 0,
            connectors: 7,
            stubs: 0,

            baseboardLength: 2.5,
        }
    },
    methods:{
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        getDefaultPerimeter(){
            return  +this.room.sizes.s1 +
                    +this.room.sizes.s2 +
                    +this.room.sizes.s3 +
                    +this.room.sizes.s4
        },
        setDefaultPerimeter(){
            this.perimeter = this.getDefaultPerimeter();
            this.perimeterCeiled = Math.ceil(this.perimeter);
        },

        setDefaultsBaseboardAccessories(){
            this.internalCorners = this.room.internalCorners;
            this.outerCorners = this.room.outerCorners;
            this.connectors = this.room.connectors;
            this.stubs = this.room.stubs;
        },

        setDefaults(){
            this.setDefaultPerimeter();
            this.setDefaultsBaseboardAccessories();
        },

        createJob(){
            const job = {}
            const currentJobId = this.$store.getters['room/getSelectedJob'](this.room.id)[0]?.jobId;
            job.title = `${this.title} (id=${currentJobId})`;
            job.room_id = this.room.id;
            job.job_id = currentJobId;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            return job;
        },

        addCalced(){
            this.addJob(this.createJob());
        },

    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),

        sum(){
            return this.perimeterCeiled * this.price;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Периметр: ${this.perimeterCeiled} метров,
                    цена за 1 метр: ${this.price} ${this.currency}`,
            };
        },
        materials(){
            const arr = [];
            arr.push({
                title: 'Плинтус напольный «Дуб Небраска» 5.2 см 2.5 м',
                amount: this.baseboardsForBuyCeiled,
                amount_add_info: this.baseboardsForBuy,
                unit_name: 'шт.',
            },)
            const ar = [
                {var_name: 'internalCorners', title: 'Внутренние углы', unit_name: 'шт.', },
                {var_name: 'outerCorners', title: 'Внешние углы', unit_name: 'шт.', },
                {var_name: 'connectors', title: 'Соединители', unit_name: 'шт.', },
                {var_name: 'stubs', title: 'Заглушки', unit_name: 'пар(а), левая и правая', },
            ];

            for(let i=0; i<ar.length; i++){
                if (this[ar[i].var_name]){
                    arr.push({
                        title: ar[i].title,
                        amount: this[ar[i].var_name],
                        unit_name: ar[i].unit_name,
                        amount_add_info: this[ar[i].var_name],
                    });
                }
            }
            return arr;
        },

        baseboardsForBuy(){
            return +( this.perimeterCeiled / this.baseboardLength ).toFixed(2);
        },
        baseboardsForBuyCeiled(){
            return Math.ceil(this.baseboardsForBuy);
        },
    },
    mounted() {
        this.setDefaults();
    }
}
</script>

<style scoped>

</style>
