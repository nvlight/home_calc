<template>
    <h3 class="text-center text-2xl font-semibold">Подсчет порогов</h3>

    <div>
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
            <div>Cумма: {{sum}} {{currency}}</div>

        </div>
    </div>

    <button @click="addCalcedDoorstep"
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
export default {
    name: "doorstep-calc.vue",
    props: {
        'room': {
            type: Object,
            required : true,
        }
    },
    data(){
        return {
            currency: "₽",
            price: 150,
            customPrice: 0,
            isCustomPrice: false,
            doorsCount: 0,
        }
    },
    methods:{
        addCalcedDoorstep(){
            this.$emit('addCalcedDoorstep', this.totalAmount)
        },
    },
    computed: {
        sum(){
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
    },
    mounted() {
        this.doorsCount = this.room.doors_count;
    }
}
</script>

<style scoped>

</style>
