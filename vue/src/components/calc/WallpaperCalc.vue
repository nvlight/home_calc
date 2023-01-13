<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

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
        <div class="mr-2">
            <mg-input-labeled v-model="height"   :placeholder="'кв.м.'">Высота</mg-input-labeled>
        </div>
    </div>

    <div class="mt-3">
        <div>Периметр: <span class="font-semibold">{{perimeter}} </span> м.</div>
        <div>Площадь потолка: <span class="font-semibold">{{squareCeiling}} </span> кв.м.</div>
        <div>Площадь пола: <span class="font-semibold">{{squareFloor}} </span> кв.м.</div>
        <div>Площадь стен: <span class="font-semibold">{{squareWalls}} </span> кв.м.</div>
    </div>

    <div class="mt-2 flex justify-between">
        <mg-input-labeled :modelValue="incSquareCount" @input="incSquareCount = $event.target.value"
                          :placeholder="'кв.м.'">Прибавить кв.м.</mg-input-labeled>
        <mg-input-labeled v-model="decSquareCount" :placeholder="'кв.м.'">Убавить кв.м.</mg-input-labeled>
    </div>

    <div class="mt-3">
        <div>Площадь стен общая: <strong>{{resultWallsSquare}}</strong> кв.м.</div>
        <div class="mt-2">
            <mg-input-labeled v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

    <mg-button @click="addCalced">Добавить сумму</mg-button>

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

    <materials-for-buy-block :materials="materials" :room="room"/>
    <room-material-form></room-material-form>
</template>

<script>
import {mapState, mapActions, mapGetters,} from 'vuex'
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";
import RoomMaterialList from "../roomMaterial/RoomMaterialList.vue";

export default {
    name: "wallpaper-calc",
    components: {
        RoomMaterialForm, MaterialsForBuyBlock, RoomMaterialList
    },
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            title: "Обои, стены",

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
            rapport: 0.64,
            oneRollMeters: 10,
        }
    },

    methods:{
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
            createRoomMaterial: 'roomMaterial/createRoomMaterial',
        }),

        setDefaultRoomSizesHandler(){
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes(){
            this.sizes = Object.assign({}, this.room.sizes);
            this.height = this.room.height;
        },

        createJob() {
            const job = {}
            const currentJobId = this.$store.getters['room/getSelectedJob'](this.room.id)[0]?.jobId;
            job.title = `${this.title} (id=${currentJobId})`;
            job.room_id = this.room.id;
            job.job_id = currentJobId;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            return job;
        },
        addCalced() {
            this.addJob(this.createJob());
        },

    },
    computed:{
        // todo - тут можно примерить обои!
        // https://oboi-store.ru/

        ...mapState({
            currency: state => state.currency,
        }),
        ...mapGetters({
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
            arr.push(
                {
                    title: 'Обои флизелиновые Артекс Эмили серые 1.0 м 10408-06',
                    amount: Math.ceil(this.rolls),
                    amount_add_info: this.rolls.toFixed(2),
                    unit_name: 'рулонов',
                },
                {
                    title: this.glue.name,
                    amount: Math.ceil(this.glue.count),
                    amount_add_info: this.glue.count.toFixed(2),
                    unit_name: 'коробок',
                },
            )
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
            return +(+this.height + +this.rapport).toFixed(2);
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
        this.setDefaultRoomSizesHandler();
    },


}
</script>

<style scoped>
</style>
