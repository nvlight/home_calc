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
        }
    },
    emits: [
        'addCalcedDoorstep',
    ],
    data() {
        return {
            currency: "₽",
            price: 150,
            customPrice: 0,
            isCustomPrice: false,
            doorsCount: 0,
            doorstepToBuyCount: 0,
        }
    },
    methods: {
        addCalcedDoorstep() {
            this.$emit('addCalcedDoorstep', this.totalAmount)
        },
        addMaterials(){

        },
    },
    computed: {
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
