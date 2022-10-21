<template>
    <h3 class="text-center text-2xl font-semibold">Подсчет ламината</h3>
<!--    <pre>{{room}}</pre>-->
<!--    <div>-->
<!--        isCustomSizes: {{isCustomSizes}}-->
<!--    </div>-->
<!--    <pre>room.sizes: {{room.sizes}}</pre>-->
<!--    <pre>customSizes: {{customSizes}}</pre>-->
<!--    <pre>getActualSizes: {{getActualSizes()}}</pre>-->
<!--    <pre>getActualPerimeter: {{getActualPerimeter()}}</pre>-->
<!--    <div>getActualSquares: <pre>{{getActualSquares()}}</pre></div>-->

    <div>
        <fieldset>
            <div class="mt-4 space-y-4">
                <div class="flex items-start">
                    <div class="flex h-5 items-center">
                        <input id="comments" name="comments" type="checkbox"
                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                                   focus:outline-none focus:ring-offset-2 focus:ring-indigo-500"
                               @click="toggleCustomSizes"
                               :checked="!toggleCustomSizes"
                        >
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700">Установить кастомные размеры пола</label>
                    </div>
                </div>

            </div>
        </fieldset>
    </div>

    <div
        v-if="isCustomSizes"
        class="flex"
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

        <div class="pt-3 hidden">
            <div>
                Периметр: <span><strong>{{perimeter}}</strong> м.</span>
            </div>
            <div>
                <span>Площадь потолка: </span>
                <span><strong>{{square.ceiling}}</strong> кв.м.</span>
            </div>
            <div>
                <span>Площадь пола: </span>
                <span><strong>{{square.floor}}</strong> кв.м.</span>
            </div>
            <div>
                <span>Площадь стен: </span>
                <span><strong>{{square.walls}}</strong> кв.м.</span>
            </div>
        </div>

    </div>

    <div class="mt-3">
        <span>Площадь пола: </span>
        <span><strong>{{square.floor}}</strong> кв.м.</span>
    </div>

    <select
        @change="calcFloor()"
        v-model="selected_id"
        name="floor_type" id="floor_type"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm mb-3"
    >
        <option value="0">выберите ширину ламината</option>
        <option
            v-for="(pot,index) in prices"
            :value="pot.id">{{pot.name}} - ({{ pot.price }} {{ currency }})
        </option>
    </select>

    <div class="laminatePriceByOneMesure">
        <div class="mt-2 flex items-center">
            <label for="price" class="">Цена за 1 кв.м.</label>
            <input
                id="price" name="price" v-model="price" type="text" autocomplete="s1" required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                       rounded-b-md rounded-t-md
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
                       w-1/6 ml-2
                        "
                placeholder="Цена ламината">
        </div>
    </div>

    <div class="laminateFullPrice mt-2">
        <p>
            <span>Цена укладки:</span>
            <span class="ml-1 font-semibold">{{fullPrice}} {{currency}}</span>
        </p>

    </div>

    <button @click="addCalcedLaminate"
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
    name: "LaminateCalc",
    props: ['room'],
    emits: ['addCalcedLaminate'],
    data(){
        return {
            currency: "₽",
            price: 200,
            isCustomSizes: false,
            customSizes : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            square: {
                ceiling: 0,
                floor: 0,
                walls: 0,
            },
            perimeter: 0,
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
            selected_id: 0,
        }
    },
    methods: {
        toggleCustomSizes(){
            this.isCustomSizes = !(this.isCustomSizes);
        },
        getActualSizes(){
            if (this.isCustomSizes){
                return this.customSizes;
            }
            return this.room.sizes;
        },
        updatePerimeter() {
            if (!this.isCustomSizes){
                this.perimeter =
                    +(this.room.sizes.s1) +
                    +(this.room.sizes.s2) +
                    +(this.room.sizes.s3) +
                    +(this.room.sizes.s4);
            }else{
                this.perimeter =
                    +(this.customSizes.s1) +
                    +(this.customSizes.s2) +
                    +(this.customSizes.s3) +
                    +(this.customSizes.s4);
            }
        },
        updateSquare(){
            this.square.ceiling = Math.ceil(
                +(this.getActualSizes().s1) *
                +(this.getActualSizes().s2)
            );
            this.square.floor = this.square.ceiling;
            this.square.walls = this.getActualPerimeter() * Math.ceil(this.room.height);
        },
        updatePerimeterAndSquares(){
            //this.updatePerimeter();
            this.updateSquare();
        },
        getActualPerimeter(){
            this.updatePerimeter();
            return this.perimeter;
        },
        getActualSquares(){
            this.updateSquare();
            return this.square;
        },
        addCalcedLaminate(){
            if (this.selected_id === 0){
                alert('Выберите ширину ламината!');
                return;
            }
            this.$emit('addCalcedLaminate', this.totalAmount)
        },
        calcFloor(){
            const changedPrice = this.prices.filter( t => t.id === this.selected_id )[0].price;
            //console.log(changedPrice);
            this.price = changedPrice;
        },
    },
    computed: {
        fullPrice(){
            return this.price * this.getActualSquares().floor;
        },
        totalAmount() {
            return {
                price: this.fullPrice,
                adding_job_info_string:
                    `Площадь пола: ${this.getActualSquares().floor} м.кв.,
                    цена за 1 м.кв.: ${this.price} ${this.currency}`,
            };
        },
    },
    watch:{
    },
    created() {
    }
}
</script>

<style scoped>
</style>
