<template>
    <h3 class="text-center text-2xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaults">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="flex mt-2 justify-between">
        <mg-input-labeled class="pr-1" v-model="sizes.s1" :placeholder="'кв.м.'">Сторона 1</mg-input-labeled>
        <mg-input-labeled class="pl-1 pr-1" v-model="sizes.s2" :placeholder="'кв.м.'">Сторона 2</mg-input-labeled>
        <mg-input-labeled class="pl-1 pr-1" v-model="sizes.s3" :placeholder="'кв.м.'">Сторона 3</mg-input-labeled>
        <mg-input-labeled class="pl-1" v-model="sizes.s4" :placeholder="'кв.м.'">Сторона 4</mg-input-labeled>
    </div>

    <select v-model="selected_id"
        class="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm mb-3">
        <option value="0">выберите ширину ламината</option>
        <option
            v-for="(pot,index) in prices"
            :value="pot.id">{{pot.name}} - ({{ pot.price }} {{ currency }})
        </option>
    </select>

<!--    <div v-if="$store.state.debug" class="mt-3 border-dotted border-2 p-3 border-red-400">-->
<!--        <div>selected_id: {{selected_id}}</div>-->
<!--        <div>selectedPrice: {{selectedPrice}}</div>-->
<!--    </div>-->

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div class="mt-3">
                <div>Периметр: <span class="font-semibold">{{perimeterCeiled}} ({{ perimeter }}) м.</span></div>
                <div>Площадь пола: <span class="font-semibold">{{square}} м.</span></div>
            </div>
        </div>
        <div class="w-5/12">
            <div class="">
                <mg-input-labeled v-model="incSquareCount">Прибавить м.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount">Убавить м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <mg-input-labeled v-model="price">Цена за 1 кв.м.</mg-input-labeled>
    <div class="mt-2">Цена укладки: <span class="font-semibold">{{sum}} {{currency}}</span></div>
    <mg-button @click="addCalcedLaminate">Добавить сумму</mg-button>

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
    name: "LaminateCalc",
    components: {MaterialsForBuyBlock, RoomMaterialForm},

    props:{
        room: {
            type: Object,
            required: true,
        },
    },
    emits: [],
    data(){
        return {
            price: 200,
            title: 'Ламинат',

            sizes : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            incSquareCount: 0,
            decSquareCount: 0,

            prices: [
                {
                    id : 1,
                    name: 'Ширина 160 мм',
                    slug: 'w160',
                    price: 200,
                },
                {
                    id : 2,
                    name: 'Ширина 200 мм',
                    slug: 'w200',
                    price: 150,
                },
                {
                    id : 3,
                    name: 'Ширина 400 мм',
                    slug: 'w400',
                    price: 250,
                },
            ],

            selected_id: 1,
            laminateToBuy: 0,
        }
    },
    methods: {
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        addCalcedLaminate(){
            if (this.selected_id === 0){
                alert('Выберите ширину ламината!');
                return;
            }
            this.addCalced(this.totalAmount);
        },

        setDefaults(){
            this.setDefaultRoomSizes();
        },

        setDefaultRoomSizes() {
            this.sizes = Object.assign({}, this.room.sizes);
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
    computed: {
        ...mapState({
            currency: state => state.currency,
        }),

        perimeter(){
            return +(+(this.sizes.s1) +
                     +(this.sizes.s2) +
                     +(this.sizes.s3) +
                     +(this.sizes.s4)).toFixed(2)
        },
        perimeterCeiled(){
            return Math.ceil(+this.perimeter);
        },

        square(){
            let sq = Math.max(+this.sizes.s1, +this.sizes.s3) * Math.max(+this.sizes.s2, +this.sizes.s4);
            sq += +this.incSquareCount - +this.decSquareCount;
            return sq;
        },

        squareCeiled(){
            return Math.ceil(this.square);
        },

        selectedPrice(){
            return this.prices.filter( t => t.id === this.selected_id )[0].price;
        },

        sum(){
            const s = ( this.price * this.squareCeiled).toFixed(2);
            //console.log(typeof s);
            return +s;
        },

        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Площадь пола: ${this.squareCeiled} м.кв.,
                    цена за 1 м.кв.: ${this.price} ${this.currency}`,
            };
        },

        materials() {
            const arr = [];
            arr.push(
                {
                    title: 'Ламинат Artens «Сосна Верона» 33 класс толщина 10 мм с фаской 2.131 м²',
                    amount: this.squareCeiled,
                    amount_add_info: this.squareCeiled,
                    unit_name: 'м.кв.',
                },
                {
                    title: 'Подложка СОЛИД Листовая, 3мм, серая, 1,05х0,5м/уп.5,25кв.м.',
                    amount: this.squareCeiled,
                    amount_add_info: this.squareCeiled,
                    unit_name: 'м.кв.',
                },
            )
            return arr;
        },
    },
    watch:{
        selectedPrice(newValue){
            this.price = +newValue;
        },
    },
    created() {
    },
    mounted() {
        this.setDefaults();
    }
}
</script>

<style scoped>
</style>
