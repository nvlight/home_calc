<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaultRoomSizesHandler">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="flex mt-2">
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

    <div class="mt-3 flex items-center">
        <div class="w-7/12">
            <div class="mt-3">
                <div>Периметр: <span class="font-semibold">{{perimeter}} м.</span></div>
                <div>Площадь стен: <span class="font-semibold">{{squareWalls}} кв.м.</span></div>
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

<!--    <div v-if="this.$store.state.debug" class="mt-3 border-dotted border-2 p-3 border-red-400">-->
<!--        <div>{{ windows }}</div>-->
<!--        <div>{{ doors }}</div>-->
<!--        <div>windowsSquare: {{ windowsSquare }}</div>-->
<!--        <div>doorsSquare:   {{ doorsSquare }}</div>-->
<!--        <div>fullSquareWalls: {{ fullSquareWalls }}</div>-->
<!--    </div>-->

    <div class="mt-2">Площадь с учетом дверей и окон:</div>
    <div><span class="font-semibold">{{ ceiledFullSquareWalls }} кв.м. ({{ fullSquareWalls }}) кв.м.</span></div>

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

    <div class="w-full flex justify-between">
        <div class="mt-2 w-5/12">
            <mg-input-labeled v-model="profileStep">шаг установки профиля</mg-input-labeled>
        </div>
        <div class="mt-2 w-5/12">
            <mg-input-labeled v-model="suspensionStep">шаг установки подвеса</mg-input-labeled>
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
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";
import RoomMaterialList from "../roomMaterial/RoomMaterialList.vue";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";

export default {
    name: 'drywall-calc',
    components: {
        MaterialsForBuyBlock, RoomMaterialList, RoomMaterialForm,
    },
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            title: 'Гипсокартон, стены',

            sizes: {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            height: 0,

            incSquareCount: 0,
            decSquareCount: 0,

            price: 200,
            doors: [],
            windows: [],

            profileStep: 0.6,
            suspensionStep: 0.5,

            fasteners: {
                dubel4sm: 0,
                samor45sm_wood: 0,
                semechki: 0,
                samor35sm_metall: 0,
            },

            currentPickedJob: 0,
        }
    },
    methods:{
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        setDefaultRoomSizesHandler(){
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes(){
            this.sizes = Object.assign({}, this.room.sizes);
            this.height = this.room.height;
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
            this.addJob(this.createJob());
        },
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
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
            return Math.ceil(+this.perimeter * +this.height)
                + +this.incSquareCount
                - +this.decSquareCount
        },
        fullSquareWalls(){
            return (+ this.squareWalls
                    + this.squareToInc + this.squareToDec
            ).toFixed(2)
        },
        ceiledFullSquareWalls(){
            return Math.ceil( this.fullSquareWalls );
        },

        sum(){
            return this.ceiledFullSquareWalls * this.price;
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
                    `Квадратура: ${this.ceiledFullSquareWalls} м.кв.,
                    цена за 1 кв.м.: ${this.price} ${this.currency}`,
            };
        },

        windowsSquare(){
            let s1 = 0;
            let s2 = 0;
            let SInc = 0;
            let SDec = 0;
            this.windows.forEach(t => {
                s1 = t.width * t.height * 2;
                s2 = t.width * t.length;
                SInc = s1 + s2;
                SDec = t.height * t.length;
            });
            return {SInc, SDec};
        },
        doorsSquare(){
            let s1 = 0;
            let s2 = 0;
            let SInc = 0;
            let SDec = 0;
            this.doors.forEach(t => {
                s1 = t.width * t.height * 2;
                s2 = t.width * t.length;
                SInc = s1 + s2;
                SDec = t.height * t.length;
            });
            return {SInc, SDec};
        },
        squareToInc(){
            return +this.windowsSquare.SInc +this.doorsSquare.SInc
        },
        squareToDec(){
            return -(+this.windowsSquare.SDec) + (-+this.doorsSquare.SDec);
        },

        doorsProfiles(){
            let dpn=0; // профиль направляющий
            let dpp=0; // профиль потолочный
            this.doors.forEach(t => {
                dpp += +this.height * 2; // один потолочный на линию с высоту и один для его закрепления
                if (t.width != 0){
                    dpn += +t.width * 2; // учет проема
                    dpp += +t.height * 2 + +t.length; // обход самой двери потолочным напрявляющим
                }
            });
            return {dpn, dpp}
        },
        windowsProfiles(){
            let wpn=0; // профиль направляющий
            let wpp=0; // профиль потолочный
            this.doors.forEach(t => {
                wpp += +this.height + +t.length * 2;
            });
            return {wpn, wpp}
        },

        profileGuide(){ // профиль направляющий
            const p1 = (+this.sizes.s1 + +this.height) * 2;
            const p2 = (+this.sizes.s2 + +this.height) * 2;
            const p3 = (+this.sizes.s3 + +this.height) * 2;
            const p4 = (+this.sizes.s4 + +this.height) * 2;

            // нужно добавить направляющий профиль для дверей и окон
            let { dpn } = this.doorsProfiles;
            let { wpn } = this.windowsProfiles;
            //dpn = 0;
            //wpn = 0;

            const sum = Math.ceil(p1 + p2 + p3 + p4 + dpn + wpn);
            return sum;
        },
        profileGuideUnits(){
            return +(this.profileGuide / 3).toFixed(2);
        },
        profileGuideUnitsCeiled(){
            return Math.ceil(this.profileGuideUnits);
        },
        profileCeiling(){ // профиль потолочный
            const additionalProfile = 1;
            const p1 = (Math.ceil(+this.sizes.s1 / +this.profileStep) - additionalProfile) * +this.height;
            const p2 = (Math.ceil(+this.sizes.s2 / +this.profileStep) - additionalProfile) * +this.height;
            const p3 = (Math.ceil(+this.sizes.s3 / +this.profileStep) - additionalProfile) * +this.height;
            const p4 = (Math.ceil(+this.sizes.s4 / +this.profileStep) - additionalProfile) * +this.height;

            // нужно добавить поточный профиль для дверей и окон
            let { dpp } = this.doorsProfiles;
            let { wpp } = this.windowsProfiles;
            //dpp = 0;
            //wpp = 0;

            const sum = Math.ceil(p1 + p2 + p3 + p4 + dpp + wpp);
            return sum;
        },
        profileCeilingUnits(){
            return +(this.profileCeiling / 3).toFixed(2);
        },
        profileCeilingUnitsCeiled(){
            return Math.ceil(this.profileCeilingUnits);
        },

        directSuspension(){ // подвес прямой
            const sum = Math.ceil(this.profileCeiling / this.suspensionStep);
            return sum;
        },
        getFasteners(){
            // профиль напрявлающий, дюбели и саморезы по 4 см.
            let pn = Math.ceil(this.profileGuide * 0.3);
            this.fasteners.dubel4sm = pn;
            this.fasteners.samor45sm_wood = pn;

            // профиль потолочный, дюбели и саморезы по 4 см, семечки 0.5 см
            this.fasteners.semechki = this.profileCeilingUnits * 4;
            this.fasteners.semechki += Math.ceil(this.directSuspension * 4);
            this.fasteners.semechki = Math.ceil(+this.fasteners.semechki.toFixed(2));
            this.fasteners.dubel4sm += Math.ceil(this.directSuspension * 3);
            this.fasteners.samor45sm_wood += Math.ceil(this.directSuspension * 4);

            // гипсокартон, саморезы по металлу 3.5 см
            this.fasteners.samor35sm_metall = Math.ceil(this.profileCeiling / 0.18 + this.perimeter / 0.18);

            // нужно учесть еще дополнительные профили - направляющие и потолочные для окон и дверей
            // это целая история :smirk
            // в общем, для каждой двери нужно добавить 1 потолочный профиль размером с высоту комнаты
            // и еще 1 такой же для соединения его с рядом стоящими профилями и добавить подвесы
            // ... также нужно посчитать профили для дверного проема

            return this.fasteners;
        },

        driwallListCount(){
            const additionalListCount = 0;
            // ! экономить не будем да, целый лист чтобы иметь резерв!
            return ((this.fullSquareWalls / 3) + additionalListCount).toFixed(2);
        },
        driwallListCountCeiled(){
            //amount: Math.ceil(this.ceiledFullSquareWalls / 3) + 1, // ! экономить не будем да, целый лист чтобы иметь резерв!
            const additionalListCount = 0;
            return Math.ceil(this.fullSquareWalls / 3) + additionalListCount;
        },
    },
    mounted() {
        this.setDefaultRoomSizesHandler();
        this.doors   = Object.assign([], this.room.doors);
        this.windows = Object.assign([], this.room.windows);

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>

</style>
