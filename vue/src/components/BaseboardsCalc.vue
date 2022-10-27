<template>
    <h3 class="text-center text-2xl font-semibold">Подсчет плинтусов</h3>

    <div class="mt-2 flex justify-between">
        <label class="">
            <span>Периметр</span>
            <input
                type="text"
                v-model="perimeter"
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
        <div>Cумма: {{sum}} {{currency}}</div>
    </div>

    <h3 class="font-semibold mt-3">Ввод углов комнаты для подсчета уголков</h3>
    <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400">
        <div>room.internalCorners: {{room.internalCorners}}</div>
        <div>room.outerCorners: {{room.outerCorners}}</div>
        <div>room.connectors: {{room.connectors}}</div>
        <div>room.stubs: {{room.stubs}}</div>
    </div>
    <div class="Baseboards_consumables">
        <div class="mt-2 flex justify-between">
            <label class="">
                <span>Внутренние углы</span>
                <input
                    type="text"
                    v-model="room.internalCorners"
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                   rounded-b-md rounded-t-md
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="4">
            </label>
            <label class="">
                <span>Внешние углы</span>
                <input
                    type="text"
                    v-model="room.outerCorners"
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                   rounded-b-md rounded-t-md
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="4">
            </label>
        </div>
        <div class="mt-2 flex justify-between">
            <label class="">
                <span>Соединители <br>&nbsp;</span>
                <input
                    type="text"
                    v-model="room.connectors"
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                   rounded-b-md rounded-t-md
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="11">
            </label>
            <label class="">
                <span>Заглушки <br>(пара, правая и левая)</span>
                <input
                    type="text"
                    v-model="room.stubs"
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                   rounded-b-md rounded-t-md
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="1">
            </label>
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
import MaterialsForBuyBlock from "./additional/MaterialsForBuyBlock.vue";

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
        }
    },
    methods:{
        ...mapActions({
            addJob: 'addJob',
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
        }),

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
                description: this.perimeter + ' м.',
            },)
            const index_for_check = [
                {title: 'internalCorners', descripiton: 'Внутренние углы',},
                {title: 'outerCorners', descripiton: 'Внешние углы',},
                {title: 'connectors', descripiton: 'Соединители',},
                {title: 'stubs', descripiton: 'Заглушки',},
            ];
            for(let i=0; i<index_for_check.length; i++){
                if (this.room[index_for_check[i].title]){
                    arr.push({
                        title: index_for_check[i].descripiton,
                        description: this.room[index_for_check[i].title],
                    });
                }
            }
            return arr;
        }
    },
    mounted() {
        this.perimeter = (this.room.perimeter);
    }
}
</script>

<style scoped>

</style>
