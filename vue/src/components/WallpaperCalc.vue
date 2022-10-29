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
        <div>Периметр: <span>{{perimeter}} м.</span></div>
        <div>Площадь потолка: <span>{{squareCeiling}} кв.м.</span></div>
        <div>Площадь пола: <span>{{squareFloor}} кв.м.</span></div>
        <div>Площадь стен: <span>{{squareWalls}} кв.м.</span></div>
    </div>

    <div class="mt-2 flex justify-between">
<!--        v-model="incSquareCount"-->
        <mg-input-labeled
            :modelValue="incSquareCount"
            @input="incSquareCount = $event.target.value"
            :placeholder="'кв.м.'"
        >Прибавить кв.м.</mg-input-labeled>
        <mg-input-labeled
            v-model="decSquareCount"
            :placeholder="'кв.м.'"
        >Убавить кв.м.</mg-input-labeled>
    </div>

    <div class="mt-3">
        <div>Площадь стен общая: <strong>{{resultWallsSquare}}</strong> кв.м.</div>
        <div class="mt-2">
            <mg-input-labeled
                v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
        </div>

    </div>

    <div class="mt-2">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

    <mg-button @click="addCalcedWallpapers">Добавить сумму</mg-button>

    <div class="mt-2">
        <div>Длина рулона: 10.05 м.</div>
        <div>Ширина рулона: 1.06 м.</div>
    </div>
    <div class="flex justify-between mt-2">
        <mg-input-labeled v-model="rapport" :placeholder="'0.64 м. / 0.32 м. / 0 м. '">Раппорт</mg-input-labeled>
        <mg-input-labeled v-model="oneRollMeters" :placeholder="'10 м. '">Кол-во метров в 1-м рулоне</mg-input-labeled>
    </div>
    <div class="mt-2">Периметр:
        <span class="font-semibold">{{perimeter}} м.</span> (<span class="font-semibold">{{perimeterCeil}} м.</span>)
    </div>
    <div class="mt-2">Высота с учетом раппорта: <span class="font-semibold">{{heightRapport}} м.</span></div>

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>
    <div class="mt-2">Обоев (рулонов) к покупке:
        <span class="font-semibold">{{Math.ceil(rolls)}}</span>
        <template v-if="rolls !== Math.ceil(rolls)">
            (<span class="font-semibold">{{rolls}}</span>)
        </template>
    </div>
    <div class="">
        {{glue.name}} <span class="font-semibold">{{glue.count}} коробок</span>
    </div>

    <mg-button @click="">Добавить материалы</mg-button>

</template>

<script>
import {mapState, mapActions,} from 'vuex'
import MaterialsForBuyBlock from "./additional/MaterialsForBuyBlock.vue";

export default {
    name: "wallpaper-calc",
    components: { MaterialsForBuyBlock
    },
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
            height: 2.3,

            incSquareCount: 0,
            decSquareCount: 0,

            price: 200,
            rapport: 0,
            oneRollMeters: 10,
        }
    },

    methods:{
        ...mapActions({
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
            addJob: 'addJob',
        }),

        setDefaultRoomSizesHandler(){
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes(){
            this.sizes = Object.assign({}, this.room.sizes);
            this.height = this.room.height;
        },

        addCalcedWallpapers(){
            this.incrementAddedJobNum();

            let tmp_job = {}
            tmp_job.title = "Обои, наклейка" + ` (id=${this.currentPickedJob})`;
            tmp_job.id = this.addedJobNum;
            tmp_job.room_id = this.room.id;
            tmp_job.job_id = this.currentPickedJob;
            tmp_job.sum = this.totalAmount.price;
            tmp_job.adding_job_info_string = this.totalAmount.adding_job_info_string;

            this.incValueToJobsResultingSum(tmp_job.sum);
            this.addJob(tmp_job);
        },

    },
    computed:{
        // todo - тут можно примерить обои!
        // https://oboi-store.ru/

        ...mapState({
            currency: state => state.currency,
            addedJobNum: state => state.addedJobNum,
        }),
        perimeter(){
            return +(this.sizes.s1) +
                    +(this.sizes.s2) +
                    +(this.sizes.s3) +
                    +(this.sizes.s4);
        },
        perimeterCeil(){
            return Math.ceil(this.perimeter);
        },
        squareCeiling(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        squareFloor(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        squareWalls(){
            // бизнес-требование, площадь стен нужно округлять вверх!
            return Math.ceil(+this.perimeter * +this.height);
        },
        resultWallsSquare(){
            return this.squareWalls
                + +this.incSquareCount
                - +this.decSquareCount
        },
        sum(){
            return this.resultWallsSquare * this.price;
        },

        materials(){
            const arr = [];
            arr.push({
                title: 'Обои',
                description: this.resultWallsSquare + ' кв.м.',
            },)
            return arr;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Квадратура: ${this.resultWallsSquare} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },
        heightRapport(){
            return (+this.height + +this.rapport);
        },

        rolls(){
            return (this.perimeterCeil * this.heightRapport) / this.oneRollMeters ;
        },

        glue(){
            const name = 'Спец Флизелин (франция), 300 г., 40 м.кв.';
            const count = Math.ceil(this.rolls / 2);
            return {name, count}
        },
    },

    mounted() {
        this.currRoom = Object.assign({}, this.room);

        this.setDefaultRoomSizesHandler();
    },

}
</script>

<style scoped>

</style>
