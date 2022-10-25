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

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>



    <button @click="addCalcedBaseboards"
            class="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"/>
            </svg>
          </span>Добавить
    </button>

</template>

<script>
import MaterialsForBuyBlock from "./additional/MaterialsForBuyBlock.vue";
export default {
    name: "baseboards-calc",
    props:{
        room: {
            type: Object,
        },

    },
    components: {
        MaterialsForBuyBlock,
    },
    emits: [
        'addCalcedBaseboards',
    ],
    data(){
        return{
            currency: "₽",
            perimeter: 0,
            price: 70,
        }
    },
    methods:{
        addCalcedBaseboards(){
            this.$emit('addCalcedBaseboards', this.totalAmount);
        }
    },
    computed:{
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
