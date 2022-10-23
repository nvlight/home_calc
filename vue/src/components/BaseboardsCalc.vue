<template>
    <h3 class="text-center text-2xl font-semibold">Подсчет плинтусов</h3>

    <div>
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

            <materials-for-buy-block
                :materials="materials"
                :room="room"
            ></materials-for-buy-block>
        </div>

    </div>

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
        }
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
            return [
                {
                    title: 'Плинтуса',
                    description: this.perimeter + ' м.',
                },
            ];
        }
    },
    mounted() {
        this.perimeter = (this.room.perimeter);
    }
}
</script>

<style scoped>

</style>
