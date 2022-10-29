<template>
    <div>
        <mg-button @click="setDefaultRoomSizesHandler">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="rounded-md shadow-sm flex">
        <div class="mr-2">
            <label>
                <span>Сторона 1</span>
                <input

                    v-model="sizes.s1" type="text" required
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                               rounded-b-md rounded-t-md
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Сторона 1">
            </label>
        </div>
        <div class="mr-2">
            <label>
                <span>Сторона 2</span>
                <input

                    v-model="sizes.s2" type="text" required
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                               rounded-b-md rounded-t-md
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Сторона 2">
            </label>
        </div>
        <div class="mr-2">
            <label>
                <span>Сторона 3</span>
                <input

                    v-model="sizes.s3" type="text" required
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                               rounded-b-md rounded-t-md
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Сторона 3">
            </label>
        </div>
        <div class="mr-2">
            <label>
                <span>Сторона 4</span>
                <input

                    v-model="sizes.s4" type="text" required
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                               rounded-b-md rounded-t-md
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Сторона 4">
            </label>
        </div>
        <div class="mr-2">
            <label>
                <span>Высота</span>
                <input

                    v-model="height" type="text" required
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                               rounded-b-md rounded-t-md
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Высота">
            </label>
        </div>
    </div>

    <div class="mt-3">
        <div>Периметр: <span>{{calcPerimeter}} м.</span></div>
        <div>Площадь потолка: <span>{{squareCeiling}} кв.м.</span></div>
        <div>Площадь пола: <span>{{squareFloor}} кв.м.</span></div>
        <div>Площадь стен: <span>{{squareWalls}} кв.м.</span></div>
    </div>

</template>

<script>
export default {
    name: "wallpaper-calc",
    components: {},

    props: {
        'room': {
            type: Object,
            required: true,
        },
        'currentPickedJob':{
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            currRoom: {},
            sizes: {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            perimeter: 0,
            square: {
                ceiling: 0,
                floor: 0,
                walls: 0,
            },
            height: 2.3,
        }
    },

    methods:{
        setDefaultRoomSizesHandler(){
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes(){
            this.sizes = Object.assign({}, this.room.sizes);
            this.height = this.room.height;
        },

    },
    computed:{
        calcPerimeter(){
            return +(this.sizes.s1) +
                    +(this.sizes.s2) +
                    +(this.sizes.s3) +
                    +(this.sizes.s4);
        },
        squareCeiling(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        squareFloor(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        squareWalls(){
            return +this.calcPerimeter * +this.height;
        },
    },

    mounted() {
        this.currRoom = Object.assign({}, this.room);

        this.setDefaultRoomSizesHandler();
        //console.log(this.currRoom.sizes);
    },

}
</script>

<style scoped>

</style>
