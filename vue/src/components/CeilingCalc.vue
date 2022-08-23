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
                :value="pot.id">{{pot.name}} - ({{ pot.price }} ₽)
            </option>
        </select>
        <div v-if="choosedCeiling.selected_id.length">
            Выбранный элемент select
            <strong>{{choosedCeiling.selected_id}}</strong>
            <br>

        </div>
        <div v-else>
            <strong>Натяжной потолок не выбран!</strong>
        </div>

        <div>
            Потолок - {{square}} кв.м.
        </div>
        <div v-if="isCustomSizes">
            <button
                @click="toggleCustomSizes"
                class="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Запретить кастомные размеры потолка</button>
        </div>
        <div v-else>
            <button
                @click="toggleCustomSizes"
                class="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Установить кастомные размеры потолка</button>
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

            <div v-if="customPerimeter" class="pt-3">
                Периметр: <span >{{customPerimeter}} м.</span>
            </div>
            <div v-if="customSquare" class="pt-3">
                Площадь потолка: <span >{{customSquare}} кв.м.</span>
            </div>

        </div>

        <hr class="mt-3">
        <div class="flex justify-between mt-5">
            Натяжной потолок + установка
            <span>
                <strong>{{choosedCeiling.price}}</strong> ₽
            </span>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3">Багет (м.)</span>
             <input
                 class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="text" v-model="baget.count" placeholder="0">
            <strong class="w-1/3 text-right">{{bagetSumm}} ₽</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3" >Подлюстренники (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="chandeliers.count" placeholder="0">
            <strong class="w-1/3 text-right">{{chandeliersSumm}} ₽</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3" >Светильники (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="luminaire.count" placeholder="0">
            <strong class="w-1/3 text-right">{{luminaireSumm}} ₽</strong>
        </div>

        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3" >Трубы (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="pipes.count" placeholder="0">
            <strong class="w-1/3 text-right">{{pipesSumm}} ₽</strong>
        </div>

        <div class="flex justify-between mt-3">
            Доставка  <strong>{{ deliveryPrice }} ₽</strong>
        </div>

        <hr class="mt-3">
        <div class="flex justify-between mt-3">
            Итоговая сумма  <strong>{{ totalAmount.price }} ₽</strong>
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
            Добавить
        </button>
    </div>
</template>

<script>
export default {
    name: 'CeilingCalc',
    props: ['square', 'perimeter'],
    data(){
        return{
            isCustomSizes: false,
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
            //square: 0,
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
        }
    },
    methods:{
        updatePerimeter() {
            this.customPerimeter = +(this.customSizes.s1) +
                +(this.customSizes.s2) +
                +(this.customSizes.s3) +
                +(this.customSizes.s4);
        },
        updateCeilingSquare(){
            this.customSquare =
                +(this.customSizes.s1) *
                +(this.customSizes.s2)
        },
        updatePerimeterAndSquares(){
            this.updatePerimeter();
            this.updateCeilingSquare();
            this.calcCeil();
            this.updateCustomPerimeter();
        },
        updateCustomPerimeter(){
            this.baget.count = this.calcCustomPerimeter();
        },
        calcCustomPerimeter(){
            let per = this.perimeter;

            if (this.isCustomSizes){
                per = (+this.customSizes.s1 + +this.customSizes.s2) * 2;
            }

            return per;
        },
        toggleCustomSizes(){
            this.isCustomSizes = this.isCustomSizes ? false : true;

            this.updateCustomPerimeter();
            this.calcCeil();
        },
        addCalcedCeil(){
            if (!this.choosedCeiling.selected_id.length){
                alert('Сначала выберите потолок!')
                return;
            }

            this.$emit('addCalcedCeiling', this.totalAmount)
        },
        calcCeil(){
            let realSquare = this.square;
            if (this.isCustomSizes){
                realSquare = this.customSquare;
            }

            let seil_select_id = this.choosedCeiling.selected_id;
            if (seil_select_id.length){
                let index = seil_select_id[0];
                let summ  = 0;

                for ( let price in this.prices){
                    //console.log(price)
                    let iteam = this.prices[price];
                    if (iteam.id === index){
                        this.choosedCeiling.price = realSquare * iteam.price;
                    }
                }
                //console.log('summ: '+summ);
            }
        }
    },
    computed:{
        bagetSumm() {
            return this.baget.count * this.baget.price;
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
          let summ = this.choosedCeiling.price
            + this.bagetSumm
            + this.chandeliersSumm
            + this.luminaireSumm
            + this.deliveryPrice;
          return {
              selected_id: this.choosedCeiling.selected_id,
              price: summ,
          }
        },
    },
    created(){
        console.log('created: ');
        this.baget.count = this.perimeter;
        //console.log(this.perimeter);
    },
    beforeMount() {
        console.log('beforeMount: ');
        //console.log(this.perimeter);
    },
    mounted() {
        console.log('mounted: ');
        //console.log(this.perimeter);
    }
}

</script>

<style>
</style>
