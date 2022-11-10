<template>
    <h3 class="text-center text-2xl font-semibold">{{ title }}</h3>

    <mg-button @click="setDefaultPerimeter">Установить периметр по умолчанию</mg-button>

    <div class="mt-2 flex justify-between">
        <mg-input-labeled v-model="perimeter">Периметр</mg-input-labeled>
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
    name: "baseboards-calc",
    props:{
        room: {
            type: Object,
            required: true,
        },
    },
    components: {
        MaterialsForBuyBlock,
    },
    emits: [],
    data(){
        return{
            title: 'Плинтуса',
            currentPickedJob: 0,

            perimeter: 0,
            price: 70,

            internalCorners: 0,
            outerCorners: 0,
            connectors: 0,
            stubs: 0,
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
            job.title = `${this.title} (id=${this.currentPickedJob})`;
            job.room_id = this.room.id;
            job.job_id = this.currentPickedJob;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            return job;
        },

        addCalced(){
            this.addJob(this.createJob());
        },

        addMaterials(){
        },
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),

        sum(){
            return this.perimeter * this.price;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Периметр: ${this.perimeter} метров,
                    цена за 1 метр: ${this.price} ${this.currency}`,
            };
        },
        materials(){
            const arr = [];
            arr.push({
                title: 'Плинтуса',
                amount: this.perimeter,
                unit_name: 'м.',
            },)
            const ar = [
                {var_name: 'internalCorners', title: 'Внутренние углы', unit_name: 'шт.',},
                {var_name: 'outerCorners', title: 'Внешние углы', unit_name: 'шт.',},
                {var_name: 'connectors', title: 'Соединители', unit_name: 'шт.',},
                {var_name: 'stubs', title: 'Заглушки', unit_name: 'пар, левая и правая',},
            ];

            for(let i=0; i<ar.length; i++){
                if (this[ar[i].var_name]){
                    arr.push({
                        title: ar[i].title,
                        amount: this[ar[i].var_name],
                        unit_name: ar[i].unit_name,
                    });
                }
            }
            return arr;
        }
    },
    mounted() {
        this.setDefaults();

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>

</style>
