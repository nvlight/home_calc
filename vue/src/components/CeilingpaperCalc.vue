<template>
    <h3 class="text-center text-xl font-semibold">Подсчет обоев, потолок</h3>

    <div>
        <mg-button @click="setDefaultRoomSizesHandler">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="rounded-md shadow-sm flex mt-2">
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s1" :placeholder="'кв.м.'">Сторона 1</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s2" :placeholder="'кв.м.'">Сторона 2</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s3" :placeholder="'кв.м.'">Сторона 3</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="sizes.s4" :placeholder="'кв.м.'">Сторона 4</mg-input-labeled>
        </div>
    </div>

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div>Длина: <span>{{perimeter}} м.</span></div>
            <div>Ширина: <span>{{height}} м.</span></div>
            <div>Площадь: <span>{{squareCeiling}} кв.м.</span></div>
            <div class="mt-2" v-if="squareCeiling !== resulCeilingSquare">Площадь (общая): {{ resulCeilingSquare }} кв.м.
                <br>с учетом +/-
            </div>
        </div>
        <div class="w-5/12">
            <div class="mt-2">
                <mg-input-labeled :modelValue="incSquareCount" @input="incSquareCount = $event.target.value"
                                  :placeholder="'кв.м.'">Прибавить кв.м.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount" :placeholder="'кв.м.'">Убавить кв.м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <div class="mt-2">
            <mg-input-labeled v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
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

    <materials-for-buy-block :materials="materials" :room="room"></materials-for-buy-block>

    <div class="mt-2 flex justify-between">
        <span>Обоев (рулонов) к покупке:</span>
        <div>
            <span class="font-semibold">{{ ceilingRolls }}</span>
            <template v-if="rolls !== ceilingRolls">
                (<span class="font-semibold">{{ rolls }}</span>)
            </template>
        </div>
    </div>
    <div class="flex justify-between">
        <span>{{glue.name}}:</span> <span class="font-semibold">{{glue.count}} коробок</span>
    </div>

    <mg-button @click="">Добавить материалы</mg-button>

</template>

<script>
import {mapState, mapActions,} from 'vuex'
import MaterialsForBuyBlock from "./additional/MaterialsForBuyBlock.vue";

export default {
    name: "ceilingpaper-calc",
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

            incSquareCount: 0,
            decSquareCount: 0,

            price: 250,
            rapport: 0,
            oneRollMeters: 30,
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
        },

        addCalcedWallpapers(){
            this.incrementAddedJobNum();

            let tmp_job = {}
            tmp_job.title = "Обои, наклейка, потолок" + ` (id=${this.currentPickedJob})`;
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
            return Math.max(+(this.sizes.s1), +(this.sizes.s3));
        },
        perimeterCeil(){
            return Math.ceil(this.perimeter);
        },
        height(){
            return Math.max(+(this.sizes.s2), +(this.sizes.s4));
        },
        squareCeiling(){
            return +(this.sizes.s1) * +(this.sizes.s2);
        },
        resulCeilingSquare(){
            return this.squareCeiling
                + +this.incSquareCount
                - +this.decSquareCount
        },
        sum(){
            return this.resulCeilingSquare * this.price;
        },

        materials(){
            const arr = [];
            arr.push(
                //{title: 'Обои', description: this.squareCeiling + ' кв.м.'},
            )
            return arr;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Квадратура: ${this.squareCeiling} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },
        heightRapport(){
            return (+this.height + +this.rapport);
        },

        rolls(){
            return (this.perimeterCeil * this.heightRapport) / this.oneRollMeters ;
        },
        ceilingRolls(){
            return Math.ceil(this.rolls);
        },

        glue(){
            const name = 'Спец Флизелин (франция), 300 г., 40 м.кв.';
            const count = Math.ceil(this.rolls * 2);
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
