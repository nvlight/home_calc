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
    </div>

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div>Длина: {{length}}</div>
            <div>Ширина: {{width}}</div>
            <div>Площадь: <span class="font-semibold">{{fullSquare}}</span> м.кв.</div>
        </div>
        <div class="w-5/12">
            <div class="mt-2">
                <mg-input-labeled v-model="incSquareCount" :placeholder="'кв.м.'">Прибавить кв.м.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount" :placeholder="'кв.м.'">Убавить кв.м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <div class="mt-2 w-4/12">
            <mg-input-labeled v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2">Сумма: <span class="font-semibold">{{sum}} {{currency}}</span></div>

    <mg-button @click="addCalced">Добавить сумму</mg-button>

    <div class="flex justify-between">
        <div class="mt-3">
            <mg-input-labeled v-model="layerThickness">Толщина слоя шпатлевки (мм)</mg-input-labeled>
        </div>
        <div class="mt-3">
            <mg-input-labeled v-model="oneBagKg">В одном мешке кг.</mg-input-labeled>
        </div>
    </div>

    <materials-for-buy-block
        :materials="materials"
        :room="room"
    ></materials-for-buy-block>

    <mg-button @click="">Добавить рекомендованные материалы</mg-button>
    <room-material-form :room_id="room.id"></room-material-form>

</template>

<script>
import {mapState, mapActions} from "vuex";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";

export default {
    name: 'putty-ceiling-calc',
    components: { RoomMaterialForm, MaterialsForBuyBlock, },
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            title: 'Шпатлевка, потолок',

            sizes: {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },

            incSquareCount: 0,
            decSquareCount: 0,

            price: 250,

            layerThickness: 2,
            oneBagKg: 20,
        }
    },
    methods: {
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        setDefaultRoomSizesHandler(){
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes(){
            this.sizes = Object.assign({}, this.room.sizes);
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
    computed: {
        ...mapState({
            currency: state => state.currency,
        }),

        length(){
            return Math.max(+this.sizes.s1, +this.sizes.s3)
        },
        width(){
            return Math.max(+this.sizes.s2, +this.sizes.s4)
        },
        square(){
            return this.length * this.width;
        },
        fullSquare(){
            return +(this.square
                + +this.incSquareCount
                - +this.decSquareCount).toFixed(2);
        },
        fullSquareСeiled(){
            return Math.ceil(this.fullSquare);
        },
        sum(){
            // бизнесс-требование,
            return +this.price * this.fullSquareСeiled;
        },

        needKg(){
            //- расход: 1 кг/м2 при толщине слоя 1 мм;
            //- количество воды на 10 кг шпаклевки: 6,5-7 л;
            return this.fullSquareСeiled * this.layerThickness;
        },
        needBag(){
            return +(this.needKg / this.oneBagKg).toFixed(2);
            //const oneBagKg = this.oneBagKg;
        },
        needBagCeiled(){
            return Math.ceil(this.needBag);
        },

        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Квадратура: ${this.square} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },

        materials() {
            const arr = [];
            arr.push(
                {
                    title: 'Шпаклевка гипсовая LAFARGE Satentek 20 кг',
                    amount: this.needBagCeiled,
                    amount_add_info: this.needBag,
                    unit_name: 'мешок',
                },
            )
            return arr;
        },
    },
    mounted() {
        this.setDefaultRoomSizesHandler();
    }
}
</script>

<style scoped>

</style>
