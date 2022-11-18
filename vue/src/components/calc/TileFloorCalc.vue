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

    <label class="block mt-2">Выберите размеры плитки
    <select v-model="selected_id"
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm mb-3">
        <option value="0">выберите ширину ламината</option>
        <option
            v-for="(pot,index) in prices"
            :value="pot.id">{{pot.name}} - ({{ pot.price }} {{ currency }})
        </option>
    </select>
    </label>
<!--    <div v-if="$store.state.debug" class="mt-3 border-dotted border-2 p-3 border-red-400">-->
<!--        <div>selected_id: {{selected_id}}</div>-->
<!--        <div>selectedPrice: {{selectedPrice}}</div>-->
<!--    </div>-->

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div class="mt-3">
                <div>Периметр: <span class="font-semibold">{{perimeterCeil}} ({{ perimeter }}) м.</span></div>
                <div>Площадь пола: <span class="font-semibold">{{squareCeiled}} ({{ square }}) м.кв.</span></div>
            </div>
        </div>
        <div class="w-5/12">
            <div class="">
                <mg-input-labeled v-model="incSquareCount">Прибавить м.кв.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount">Убавить м.кв.</mg-input-labeled>
            </div>
        </div>
    </div>

    <mg-input-labeled v-model="price">Цена за 1 кв.м.</mg-input-labeled>
    <div class="mt-2">Цена укладки: <span class="font-semibold">{{sum}} {{currency}}</span></div>
    <mg-button @click="addSum">Добавить сумму</mg-button>

    <div class="mt-3 flex justify-between">
        <mg-input-labeled class="block mx-1" v-model="thicknessLayer" :placeholder="'кв.м.'">Толщина клея (мм)</mg-input-labeled>
        <div>
            <mg-input-labeled class="block mx-1" v-model="oneTileSVPCount" :placeholder="'кв.м.'">Расход СВП (шт)</mg-input-labeled>
            <div class="text-sm text-gray-600">на 1 плитку</div>
        </div>

        <div>
            <mg-input-labeled class="block mx-1" v-model="oneBugKg">Кг. клея</mg-input-labeled>
            <div class="text-sm text-gray-600">в 1 мешке</div>
        </div>

    </div>

    <div>
        <div class="">Расход клея на 1 м.кв.: <span class="font-semibold">{{glueKg}}</span> кг</div>
        <div class="">Расход клея: <span class="font-semibold">{{this.glueConsumption}}</span> кг</div>
        <div class="">Расход плиток: <span class="font-semibold">{{this.tileCount}}</span> штук</div>
    </div>

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
    name: "tile-floor-calc",
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
            title: 'Плитка, пол',

            sizes : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            incSquareCount: 0,
            decSquareCount: 0,

            prices: [
                // http://proplitki.ru/vybor/razmeryi-i-tolshhina-napolnoy-plitki.html
                {
                    id : 1,
                    name: 'Плитка 40х40 см',
                    slug: 'tile40x40',
                    price: 800,
                    square: 0.16,
                },
                {
                    id : 2,
                    name: 'Плитка 60х60 см',
                    slug: 'tile60x60',
                    price: 900,
                    square: 0.36,
                },
            ],

            selected_id: 1,
            laminateToBuy: 0,

            currentPickedJob: 0,

            // толщина слоя клея, пусть будет 3 мм, чтобы считать легче
            thicknessLayer: 3, // Расход клея при толщине слоя в 1 мм составляет 3.5 кг/м².

            oneTileSVPCount: 4,
            oneBugKg: 25,
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

        setDefaults(){
            this.setDefaultRoomSizes();
        },

        setDefaultRoomSizes() {
            this.sizes = Object.assign({}, this.room.sizes);
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

        square(){
            const mx1 = +Math.max(this.room.sizes.s1, this.room.sizes.s3);
            const mx2 = +Math.max(this.room.sizes.s2, this.room.sizes.s4);
            let sq = mx1 * mx2
            sq += +(+this.incSquareCount - +this.decSquareCount).toFixed(2)

            return sq;
        },

        squareCeiled(){
            return Math.ceil(this.square)
        },

        selectedPrice(){
            return this.prices.filter( t => t.id === this.selected_id )[0].price;
        },

        tileCount(){
            const oneTileSquare = this.prices.filter( t => t.id === this.selected_id )[0].square;
            return Math.ceil( this.square / oneTileSquare );
        },

        svpCount(){
            return Math.ceil( this.tileCount * this.oneTileSVPCount );
        },

        sum(){
            const s = ( this.price * this.square).toFixed(2);
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
                    title: 'Керамогранит Softmarble 60x60 см 1.44 м² цвет белый',
                    amount: this.squareCeiled,
                    amount_add_info: this.square,
                    unit_name: 'м.кв.',
                },
                {
                    title: 'Клей для плитки Боларс Базовый, 25 кг',
                    amount: this.glueBugCeiled,
                    amount_add_info: this.glueBug,
                    unit_name: 'мешок.',
                },

                // https://leroymerlin.ru/product/kley-dlya-plitki-bolars-bazovyy-12832285/
                // Расход клея при толщине слоя в 1 мм составляет 3.5 кг/м².
                // 3mm - 12кг/м2, значит 1 мешок на 2 м2.
                {
                    title: 'Система выравнивания плитки Dexter зажим 1.5 мм 100 шт.',
                    amount: this.svpCount,
                    amount_add_info: this.svpCount,
                    unit_name: 'шт.',
                },
                {
                    title: 'Система выравнивания плитки Dexter клин 100 шт',
                    amount: this.svpCount,
                    amount_add_info: this.svpCount,
                    unit_name: 'шт.',
                },
            );
            return arr;
        },

        glueKg(){
            return this.thicknessLayer * 4; // per 1 m.kv
        },
        glueConsumption(){
            return Math.ceil(this.squareCeiled * this.glueKg);
        },
        glueBug(){
            return +(this.glueConsumption / +this.oneBugKg).toFixed(2);
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
