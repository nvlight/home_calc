<template>
    <h3 class="text-center text-2xl font-semibold">Подсчет плинтусов</h3>

    <mg-button @click="setDefaultPerimeter">Установить периметр по умолчанию</mg-button>

    <div class="mt-2 flex justify-between">
        <mg-input-labeled v-model="perimeter">Периметр</mg-input-labeled>
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

    <mg-button @click="addCalcedBaseboards">Добавить сумму</mg-button>

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
        'currentPickedJob':{
            type: Number,
            required: true,
        }
    },
    components: {
        MaterialsForBuyBlock,
    },
    emits: [],
    data(){
        return{
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
            addJob: 'addJob',
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
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

        addCalcedBaseboards(){
            this.incrementAddedJobNum();

            let tmp_job = {}
            tmp_job.title = "Плинтуса, установка" + ` (id=${this.currentPickedJob})`;
            tmp_job.id = this.addedJobNum;
            tmp_job.room_id = this.room.id;
            tmp_job.job_id = this.currentPickedJob;
            tmp_job.sum = this.totalAmount.price;
            tmp_job.adding_job_info_string = this.totalAmount['adding_job_info_string'];

            this.incValueToJobsResultingSum(tmp_job.sum);
            this.addJob(tmp_job);
        },

        addMaterials(){
        },


    },
    computed:{
        ...mapState({
            addedJobNum: state => state.addedJobNum,
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
    }
}
</script>

<style scoped>

</style>
