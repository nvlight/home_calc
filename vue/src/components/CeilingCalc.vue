<template>
    <div class="border border-dashed border-2 p-3 rounded-xl" >
        <h1 class="text-xl">Выбор типа потолка</h1>
        <div class="description hidden">
            <h3 class="text-xl">В наличии имеются несколько видов потолков:</h3>
            <ol>
                <li>Матовые</li>
                <li>Глянцевые</li>
                <li>Сатиновые</li>
                <li>Тканевые</li>
                <li>Двухуровневые</li>
                <li>Фотопечать</li>
                <li>Фактурные</li>
                <li>Звездное небо</li>
            </ol>
        </div>
        <select
            @change="calcCeil()"
            v-model="choosedCeiling.selected_id"
            name="ceiling_type" id="ceiling_type"
            multiple
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3 h-[265px]"
            >
            <option
                v-for="(pot,index) in prices"
                :value="pot.id">{{pot.name}} - ({{ pot.price }} {{ currency }})
            </option>
        </select>

        <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400" >
            Выбранный элемент select <strong>{{choosedCeiling.selected_id}}</strong>
        </div>

        <div v-if="room.perimeter" class="pt-3">
            Периметр: <span >{{room.perimeter}} м.</span>
        </div>
        <div v-if="room.square.ceiling" class="pt-3">
            Площадь потолка: <span >{{room.square.ceiling}} кв.м.</span>
        </div>

        <div v-if="isCustomSizes">
            <fieldset>
                <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="comments" name="comments" type="checkbox"
                                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                   focus:border"
                                   @click="toggleCustomSizes"
                                   checked
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">Запретить кастомные размеры потолка</label>
                        </div>
                    </div>

                </div>
            </fieldset>
        </div>
        <div v-else>
            <fieldset>
                <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="comments" name="comments" type="checkbox"
                                   class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                   focus:border"
                                   @click="toggleCustomSizes"
                                   checked
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">Установить кастомные размеры потолка</label>
                        </div>
                    </div>

                </div>
            </fieldset>
        </div>
        <div
            v-if="isCustomSizes"
        >
            <div class="mr-2">
                <label for="a1" class="">Сторона 1</label>
                <input
                    @change="updatePerimeterAndSquares"
                    id="a1" name="a1" v-model="customSizes.s1" type="text" autocomplete="s1" required
                       class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Сторона 1">
            </div>
            <div class="mr-2">
                <label for="a2" class="">Сторона 2</label>
                <input
                    @change="updatePerimeterAndSquares"
                    id="a2" name="a2" v-model="customSizes.s2" type="text" autocomplete="s2" required
                       class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Сторона 2">
            </div>
            <div class="mr-2">
                <label for="a3" class="">Сторона 3</label>
                <input
                    @change="updatePerimeterAndSquares"
                    id="a3" name="a3" v-model="customSizes.s3" type="text" autocomplete="s3" required
                       class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Сторона 3">
            </div>
            <div class="mr-2">
                <label for="a4" class="">Сторона 4</label>
                <input
                    @change="updatePerimeterAndSquares"
                    id="a4" name="a4" v-model="customSizes.s4" type="text" autocomplete="current-password" required
                       class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                       placeholder="Сторона 4">
            </div>

            <div v-if="room.perimeter" class="pt-3">
                Периметр: <span >{{room.perimeter}} м.</span>
            </div>
            <div v-if="room.square.ceiling" class="pt-3">
                Площадь потолка: <span >{{room.square.ceiling}} кв.м.</span>
            </div>

        </div>

        <hr class="mt-3">
        <div class="flex justify-between mt-5">
            Натяжной потолок + установка
            <span>
                <strong>{{choosedCeilingPrice }}</strong> {{ currency }}
            </span>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3">Багет (м.)</span>
             <input
                 class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="text" v-model="baget.count" placeholder="0">
            <strong class="w-1/3 text-right">{{bagetSumm}} {{ currency }}</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3" >Подлюстренники (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="chandeliers.count" placeholder="0">
            <strong class="w-1/3 text-right">{{chandeliersSumm}} {{ currency }}</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3" >Светильники (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="luminaire.count" placeholder="0">
            <strong class="w-1/3 text-right">{{luminaireSumm}} {{ currency }}</strong>
        </div>

        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3" >Трубы (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="pipes.count" placeholder="0">
            <strong class="w-1/3 text-right">{{pipesSumm}} {{ currency }}</strong>
        </div>

        <div class="flex justify-between mt-3">
            Доставка  <strong>{{ deliveryPrice }} {{ currency }}</strong>
        </div>

        <hr class="mt-3">
        <div class="flex justify-between mt-3">
            Итоговая сумма  <strong>{{ totalAmount.price }} {{ currency }}</strong>
        </div>

        <button @click="addCalcedCeil"
            class="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"/>
                </svg>
              </span>
            Добавить всю сумму
        </button>

        <BuildingMaterial>
        </BuildingMaterial>

    </div>
</template>

<script>
import BuildingMaterial from "../components/BuildingMaterial.vue";
import store from "../store/index.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: 'CeilingCalc',
    props: ['square', 'perimeter', 'currentRoom', 'currentPickedJob', ],
    components: { BuildingMaterial },
    data(){
        return{
            currency: "₽",
            isCustomSizes: false,
            room: {},
            customSizes : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            customSquare: 0,
            customPerimeter: 0,

            choosedCeiling: {
                selected_id: [],
                price: 0,
            },
            baget: {
                count: 0,
                price: 100,
                summ: 0,
            },
            chandeliers: {
                count: 1,
                price: 200,
                summ: 0,
            },
            luminaire: {
                count: 0,
                price: 100,
                summ: 0,
            },
            pipes: {
                count: 0,
                price: 100,
                summ: 0,
            },
            deliveryPrice: 1000,
            //totalAmount: 0,
            //this.baget.summ + this.chandeliers.summ + this.luminaire.summ + this.deliveryPrice,
            prices: [
                {
                    id : 1,
                    name: 'Матовый белый до 3.2м',
                    slug: 'mat_white_3.2',
                    price: 400,
                },
                {
                    id : 2,
                    name: 'Матовый белый до 4м., 5м.',
                    slug: 'mat_white_4',
                    price: 450,
                },
                {
                    id : 3,
                    name: 'Глянцевый белый до 3.2м',
                    slug: 'glossy_white_3.2',
                    price: 450,
                },
                {
                    id : 4,
                    name: 'Глянцевый белый до 4м., 5м',
                    slug: 'glossy_white_4',
                    price: 500,
                },
                {
                    id : 5,
                    name: 'Матовый цветной до 3.2м',
                    slug: 'mat_color_3.2',
                    price: 450,
                },
                {
                    id : 6,
                    name: 'Матовый цветной до 4м., 5м.',
                    slug: 'mat_color_4',
                    price: 500,
                },
                {
                    id : 7,
                    name: 'Глянцевый цветной до 3.2м',
                    slug: 'glossy_color_3.2',
                    price: 550,
                },
                {
                    id : 8,
                    name: 'Глянцевый цветной до 4м., 5м',
                    slug: 'glossy_color_4',
                    price: 600,
                },
                {
                    id :9,
                    name: 'Фактурные до 3.2м',
                    slug: 'textured_3.2',
                    price: 850,
                },
                {
                    id :10,
                    name: 'Искры (эффект) до 3.2м',
                    slug: 'sparks_effect_3.2',
                    price: 1000,
                },
                {
                    id :11,
                    name: 'Облака до 3.2м',
                    slug: 'the_clouds_3.2',
                    price: 1000,
                },
                {
                    id :12,
                    name: 'Фотопечать до 3.2м',
                    slug: 'photo_printing',
                    price: 3500,
                },
            ],
            fastenersCals: null,
            pickedFasteners: [],
            fastenersCustomUnitSet: [],
            fastenersModel: {},
        }
    },
    methods:{
        updatePerimeter() {
            if (!this.isCustomSizes){
                this.room.perimeter =
                    +(this.room.sizes.s1) +
                    +(this.room.sizes.s2) +
                    +(this.room.sizes.s3) +
                    +(this.room.sizes.s4);
            }else{
                this.room.perimeter =
                +(this.customSizes.s1) +
                +(this.customSizes.s2) +
                +(this.customSizes.s3) +
                +(this.customSizes.s4);
            }
        },
        updateSquare(){
            if (!this.isCustomSizes){
                this.room.square.ceiling =
                    +(this.room.sizes.s1) *
                    +(this.room.sizes.s2);
                this.room.square.floor = this.room.square.ceiling;
            }else{
                this.room.square.ceiling =
                    +(this.customSizes.s1) *
                    +(this.customSizes.s2);
                this.room.square.floor = this.room.square.ceiling;
            }
        },
        calcCeil(){
            let ceiling_select_id = this.choosedCeiling.selected_id;
            if (ceiling_select_id.length){
                const index = ceiling_select_id[0];

                for ( let price in this.prices){
                    const item = this.prices[price];
                    if (item.id === index){
                        this.choosedCeiling.price = this.room.square.ceiling * item.price;
                    }
                }
            }
        },
        updatePerimeterAndSquares(){
            this.updatePerimeter();
            this.updateSquare();
            this.calcCeil();
        },

        toggleCustomSizes(){
            this.isCustomSizes = this.isCustomSizes ? false : true;

            if (this.isCustomSizes){
                this.setCustomSizesFromParent();
            }

            this.updatePerimeterAndSquares();
        },
        setCustomSizesFromParent(){
            this.customSizes = Object.assign({}, this.room.sizes);
        },
        addCalcedCeil(){
            if (!this.choosedCeiling.selected_id.length){
                alert('Сначала выберите потолок!')
                return;
            }
            //this.$emit('addCalcedCeiling', this.totalAmount)
            this.addCalcedCeilingHandler(this.totalAmount)
        },

        addCalcedCeilingHandler(res){
            this.incrementAddedJobNum();

            let tmp_job = {}
            tmp_job.id = this.addedJobNum;
            tmp_job.job_id = this.currentPickedJob;  // nat pot
            tmp_job.seiling_selected_id = res.seiling_selected_id;
            tmp_job.sum = res.price;
            tmp_job.adding_job_info_string = res['adding_job_info_string'];
            tmp_job.title = "Натяжной потолок" + ` (id=${this.currentPickedJob})`;

            this.$store.commit('incValueToJobsResultingSumm', tmp_job.sum);
            this.addJob(tmp_job);
        },

        ...mapActions({
            incrementAddedJobNum: 'incrementAddedJobNum',
            addJob: 'addJob',
        }),
    },
    computed:{
        ...mapState({
            addedJobNum: state => state.addedJobNum,
        }),

        bagetSumm() {
            return this.baget.count * this.baget.price;
            //return Math.ceil( this.baget.count * this.baget.price);
        },
        chandeliersSumm() {
            return this.chandeliers.count * this.chandeliers.price;
        },
        luminaireSumm() {
            return this.luminaire.count * this.luminaire.price;
        },
        pipesSumm() {
            return this.pipes.count * this.pipes.price;
        },
        totalAmount() {
          const sum = this.choosedCeiling.price
                    + this.bagetSumm
                    + this.chandeliersSumm
                    + this.luminaireSumm
                    + this.deliveryPrice;
          return {
              seiling_selected_id: this.choosedCeiling.selected_id,
              price: sum,
              adding_job_info_string:
                `Сам потолок + установка: ${this.choosedCeiling.price} ${this.currency},
                багеты: ${this.bagetSumm} ${this.currency},
                доставка: ${this.deliveryPrice} ${this.currency}`,
          }
        },
        choosedCeilingPrice(){
          return Math.ceil(this.choosedCeiling.price);
        },
    },
    watch:{
    },
    created(){
        this.room = Object.assign({}, this.currentRoom);
        this.baget.count = (this.room.perimeter);
    },
    beforeMount() {
    },
    mounted() {
    }
}

</script>

<style>
</style>
