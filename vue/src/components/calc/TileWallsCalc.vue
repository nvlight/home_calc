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

        <div class="ml-2">
            <mg-input-labeled v-model="height">Высота</mg-input-labeled>
        </div>
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
    <div v-if="$store.state.debug" class="mt-3 border-dotted border-2 p-3 border-red-400">
        <div>selected_id: {{selected_id}}</div>
        <div>selectedPrice: {{selectedPrice}}</div>
    </div>

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div class="mt-3">
                <div>Периметр: <span class="font-semibold">{{perimeter}} м.</span></div>
                <div>Площадь стен: <span class="font-semibold">{{squareWalls}} кв.м.</span></div>
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
    <mg-button @click="addSum">Добавить сумму</mg-button>

    <div class="mt-3" >
        <mg-input-labeled v-model="thicknessLayer" :placeholder="'кв.м.'">Толщина клея (мм)</mg-input-labeled>
    </div>
    <div class="">Расход на 1 м.кв. = <span class="font-semibold">{{glueKg}}</span> кг</div>

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
    name: "tile-walls-calc",
    components: {MaterialsForBuyBlock, },

    props:{
        room: {
            type: Object,
            required: true,
        },
    },
    emits: [],
    data(){
        return {
            price: 0,
            title: 'Плитка, стены',

            sizes : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            height: 0,
            incSquareCount: 0,
            decSquareCount: 0,

            prices: [
                // http://proplitki.ru/vybor/razmeryi-i-tolshhina-napolnoy-plitki.html
                {
                    id : 1,
                    name: 'Плитка 40х40 см',
                    slug: 'tile40x40',
                    price: 800,
                },
                {
                    id : 2,
                    name: 'Плитка 60х60 см',
                    slug: 'tile60x60',
                    price: 900,
                },
            ],

            selected_id: 1,
            laminateToBuy: 0,

            currentPickedJob: 0,

            // толщина слоя клея, пусть будет 3 мм, чтобы считать легче
            thicknessLayer: 3, // Расход клея при толщине слоя в 1 мм составляет 3.5 кг/м².
        }
    },
    methods: {
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        addSum(){
            if (this.selected_id === 0){
                alert('Выберите размеры ламината!');
                return;
            }
            this.addCalced(this.totalAmount);
        },

        addMaterials(){

        },

        setDefaults(){
            this.setDefaultRoomSizes();
        },

        setDefaultRoomSizes() {
            this.sizes = Object.assign({}, this.room.sizes);
            this.height = this.room.height;
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
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
        }),

        perimeter(){
            return  +(this.sizes.s1) +
                    +(this.sizes.s2) +
                    +(this.sizes.s3) +
                    +(this.sizes.s4);
        },
        perimeterCeil(){
            return Math.ceil(this.perimeter);
        },

        squareWalls(){
            // бизнес-требование, площадь стен нужно округлять вверх!
            return Math.ceil(+this.perimeter * +this.height)
                + +this.incSquareCount
                - +this.decSquareCount
        },
        fullSquareWalls(){
            return (+ this.squareWalls
                + this.squareToInc + this.squareToDec
            ).toFixed(2)
        },
        ceiledFullSquareWalls(){
            return Math.ceil( this.fullSquareWalls );
        },

        selectedPrice(){
            return this.prices.filter( t => t.id === this.selected_id )[0].price;
        },

        sum(){
            const s = ( this.price * this.squareWalls).toFixed(2);
            return +s;
        },

        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Площадь пола: ${this.squareWalls} м.кв.,
                    цена за 1 м.кв.: ${this.price} ${this.currency}`,
            };
        },

        materials() {
            const arr = [];
            arr.push({title: 'Плитка',   amount: this.squareWalls, unit_name: 'м.кв.',});
            // https://leroymerlin.ru/product/kley-dlya-plitki-bolars-bazovyy-12832285/
            // Расход клея при толщине слоя в 1 мм составляет 3.5 кг/м².
            // 3mm - 12кг/м2, значит 1 мешок на 2 м2.
            arr.push({title: 'Клей для плитки Боларс Базовый, 25 кг',
                amount: this.glueBugCeiled + ` (${this.glueBug}-${this.glueConsumption} кг)`,
                unit_name: 'м.',});
            return arr;
        },

        oneBugKg(){
            return 25;
        },
        glueKg(){
            return this.thicknessLayer * 4; // per 1 m.kv
        },
        glueConsumption(){
            return Math.ceil(this.squareWalls * this.glueKg);
        },
        glueBug(){
            return (this.glueConsumption / this.oneBugKg);
        },
        glueBugCeiled(){
            return Math.ceil(this.glueBug);
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

        this.price = this.prices[0].price;

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>
</style>
