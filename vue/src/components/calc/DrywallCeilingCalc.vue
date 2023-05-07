<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaultActionsHandler">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="rounded-md shadow-sm flex mt-2 justify-between">
        <div class="mr-2">
            <mg-input-labeled v-model="length" :placeholder="'кв.м.'">Длина</mg-input-labeled>
        </div>
        <div class="mr-2">
            <mg-input-labeled v-model="width" :placeholder="'кв.м.'">Ширина</mg-input-labeled>
        </div>
    </div>

    <div class="mt-3 flex flex-wrap items-center">
        <div class="w-7/12">
            <div class="mt-3">
                <div>Периметр: <span class="font-semibold">{{perimeter}} м.</span></div>
                <div>Площадь потолка: <span class="font-semibold">{{ceiledfullSquareCeiling}} кв.м. ({{fullSquareCeiling}})</span></div>
            </div>
        </div>
        <div class="w-5/12">
            <div class="">
                <mg-input-labeled :modelValue="incSquareCount" @input="incSquareCount = $event.target.value"
                                  :placeholder="'кв.м.'">Прибавить кв.м.</mg-input-labeled>
                <mg-input-labeled v-model="decSquareCount" :placeholder="'кв.м.'">Убавить кв.м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div class="mt-3 w-4/12">
        <div class="mt-2">
            <mg-input-labeled v-model="price" :placeholder="'кв.м.'">сумма за 1 кв.м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2 ">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

    <mg-button @click="addCalced">Добавить сумму</mg-button>

    <div class="w-full flex flex-wrap justify-between">
        <div class="mt-2 w-5/12">
            <mg-input-labeled v-model="profileStep">шаг установки профиля</mg-input-labeled>
        </div>
        <div class="mt-2 w-5/12">
            <mg-input-labeled v-model="suspensionStep">шаг установки подвеса</mg-input-labeled>
        </div>
    </div>

    <materials-for-buy-block :materials="materials" :room="room"/>
    <room-material-form></room-material-form>
</template>

<script>
import {mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";

export default {
    name: 'drywall-ceiling-calc',
    components: {
        MaterialsForBuyBlock, RoomMaterialForm,
    },
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            vshow: false,
            title: 'Гипсокартон, потолок',

            length: 0,
            width: 0,

            incSquareCount: 0,
            decSquareCount: 0,

            price: 250,

            profileStep: 0.4,
            suspensionStep: 0.5,

            fasteners: {
                dubel4sm: 0,
                samor45sm_wood: 0,
                semechki: 0,
                samor35sm_metall: 0,
            },
        }
    },
    methods:{
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        setDefaultActionsHandler(){
            this.length = Math.max(this.room.sizes.s1, this.room.sizes.s3);
            this.width  = Math.max(this.room.sizes.s2, this.room.sizes.s4);
        },

        createJob(){
            const job = {}
            const currentJobId = this.$store.getters['room/getSelectedJob'](this.room.id)[0]?.jobId;
            job.title = `${this.title} (id=${currentJobId})`;
            job.room_id = this.room.id;
            job.job_id = currentJobId;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            return job;
        },

        addCalced(){
            //this.$store.dispatch('roomJob/addJobToStore', this.createJob());
            this.addJob(this.createJob());
        },
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),

        perimeter(){
            return (+(this.width) + +(this.length)) * 2;
        },
        square(){
            return (+(this.width) *+ +(this.length));
        },
        perimeterCeil(){
            return Math.ceil(this.perimeter);
        },

        fullSquareCeiling(){
            return (+ this.square
                    + this.squareToInc + this.squareToDec
            ).toFixed(2)
        },
        ceiledfullSquareCeiling(){
            return Math.ceil( this.fullSquareCeiling );
        },

        sum(){
            return this.ceiledfullSquareCeiling * this.price;
        },

        materials(){
            // https://gipsokarton-blog.ru/raboty/rasstoyanie-mezhdu-podvesami.html
            const arr = [];
            arr.push(
            {
                id: 12593034,
                title: 'Гипсокартон 9.5 мм 2500х1200 3 м²',
                amount: this.driwallListCountCeiled,
                amount_add_info: this.driwallListCount,
                unit_name: 'листов',
            },
            {
                id: 18304521,
                title: 'Профиль направляющий (ПН-2) Standers 0.6 мм 50х40х3000 мм',
                amount: this.profileGuideUnitsCeiled,
                amount_add_info: this.profileGuideUnits,
                unit_name: 'единиц',
            },
            {
                id: 18304547,
                title: 'Профиль потолочный (ПП) Standers 0.6 мм 60х27х3000 мм',
                amount: this.profileCeilingUnitsCeiled,
                amount_add_info: this.profileCeilingUnits,
                unit_name: 'единиц',
            },
            {
                id: 83865961,
                title: 'Прямой подвес профилей 275x30x0.4',
                amount: Math.ceil(this.directSuspension),
                amount_add_info: (this.directSuspension),
                unit_name: 'штук',
            },
            {
                id: 82506954,
                title: 'Саморезы для гипсокартона KNAUF фосфатированные 3.5x35',
                amount: this.getFasteners.samor35sm_metall,
                amount_add_info: this.getFasteners.samor35sm_metall,
                unit_name: 'штук',
            },
            {
                id: 82506954,
                title: 'Саморезы для дерева STANDERS фосфатированные 3.5x45',
                amount: this.getFasteners.samor45sm_wood,
                amount_add_info: this.getFasteners.samor45sm_wood,
                unit_name: 'штук',
                description: 'Саморез по дереву Standers используется при проведении строительных, отделочных и ремонтных работ внутри помещения — для скрепления деталей, фиксации листовых материалов к основанию. Благодаря острому концу можно вкручивать крепеж шуруповертом или отверткой без предварительного сверления.',
            },
            {
                id: 82716893,
                title: 'Дюбель-гвозди грибовидные Ecoplast, 6x40 мм, полипропилен',
                amount: this.getFasteners.dubel4sm,
                amount_add_info: this.getFasteners.dubel4sm,
                unit_name: 'штук',
                description: 'Дюбель-гвозди грибовидные Ecoplast предназначены для сквозного монтажа кронштейнов, дверных коробок, оконных рам, кабельных каналов, обрешетки, гипсокартонных листов (ГКЛ), гипсоволокнистых листов (ГКЛ) и т.д. Для установки необходимо предварительно просверлить отверстие. Прочность крепежа достигается расклиниванием дюбеля в отверстии гвоздем в момент удара молотком. С помощью крестообразного шлица на головке гвоздя можно легко ослабить или усилить крепеж, демонтировать его.',
            },
            {
                id: 85339222,
                title: 'Саморезы по металлу Tech-Krep фосфатированные 3.5x11 мм',
                amount: this.getFasteners.semechki,
                amount_add_info: this.getFasteners.semechki,
                unit_name: 'штук',
                description: 'Саморезы Tech-Krep сделаны из углеродистой стали. Имеют фосфатированное покрытие, устойчивое к коррозии и деформациям. Предназначены для крепления металлических конструкций. Имеют полуцилиндрическую форму головки.',
            },

            )
            return arr;
        },
        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Квадратура: ${this.fullSquareCeiling} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },

        squareToInc(){
            return +this.incSquareCount
        },
        squareToDec(){
            return -(+this.decSquareCount);
        },

        profileGuideUnits(){ // профиль направляющий, узнаем количество метров
            return (this.perimeter / 3);
        },
        profileGuideUnitsCeiled(){
            return Math.ceil(this.profileGuideUnits);
        },

        profileCeiling(){ // профиль потолочный, узнаем количество метров
            const additionalProfile = 1;
            const p1 = (Math.ceil(+this.length / +this.profileStep) - additionalProfile) * +this.width;
            const sum = Math.ceil(p1);
            return sum;
        },
        profileCeilingUnits(){
            return +(this.profileCeiling / 3).toFixed(2);
        },
        profileCeilingUnitsCeiled(){
            return Math.ceil(this.profileCeilingUnits);
        },

        // знаю количество подвесов, исходя из шага подвеса
        directSuspension(){ // подвес прямой
            const sum = Math.ceil(this.profileCeiling / this.suspensionStep);
            return sum;
        },
        getFasteners(){
            // профиль напрявлающий, дюбели и саморезы по 4 см.
            let pn = Math.ceil(this.perimeter / 0.3) + 1;
            this.fasteners.dubel4sm = pn;
            this.fasteners.samor45sm_wood = pn;

            // профиль потолочный, дюбели и саморезы по 4 см, семечки 0.5 см
            this.fasteners.semechki = this.profileCeilingUnitsCeiled * 4;
            this.fasteners.semechki += Math.ceil(this.directSuspension * 4);
            this.fasteners.dubel4sm += Math.ceil(this.directSuspension * 3);
            this.fasteners.samor45sm_wood += Math.ceil(this.directSuspension * 4);

            // гипсокартон, саморезы по металлу 3.5 см
            this.fasteners.samor35sm_metall = Math.ceil(this.profileCeiling / 0.18 + this.perimeter / 0.18);

            return this.fasteners;
        },

        driwallListCount(){
            const additionalListCount = 0;
            // ! экономить не будем да, целый лист чтобы иметь резерв!
            return ((this.fullSquareCeiling / 3) + additionalListCount).toFixed(2);
        },
        driwallListCountCeiled(){
            const additionalListCount = 0;
            // ! экономить не будем да, целый лист чтобы иметь резерв!
            return Math.ceil(this.fullSquareCeiling / 3) + additionalListCount;
        },
    },
    mounted() {
        this.setDefaultActionsHandler();
    }
}
</script>

<style scoped>

</style>
