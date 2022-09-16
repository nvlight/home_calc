<template>
    <h3 class="text-center text-2xl font-semibold">Laminate Calc</h3>
<!--    <pre>{{room}}</pre>-->
    <div>
        isCustomSizes: {{isCustomSizes}}
    </div>
<!--    <pre>room.sizes: {{room.sizes}}</pre>-->
<!--    <pre>customSizes: {{customSizes}}</pre>-->
    <pre>getActualSizes: {{getActualSizes()}}</pre>
    <pre>getActualPerimeter: {{getActualPerimeter()}}</pre>
    <div>getActualSquares: <pre>{{getActualSquares()}}</pre></div>
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


        <div class="pt-3">
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


</template>

<script>
export default {
    name: "LaminateCalc",
    props: ['room'],
    data(){
        return {
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
            this.perimeter = Math.ceil(
                +(this.getActualSizes().s1) +
                +(this.getActualSizes().s2) +
                +(this.getActualSizes().s3) +
                +(this.getActualSizes().s4)
            );
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
    },
    computed: {
    },
    watch:{
    },
    created() {
    }
}
</script>

<style scoped>
</style>
