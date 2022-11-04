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

    <div class="mt-3 flex items-center">
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
    <mg-button @click="">Добавить материалы</mg-button>
</template>

<script>
import {mapState, mapActions} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";

export default {
    name: 'drywall-ceiling-calc',
    components: {
        MaterialsForBuyBlock,
    },
    props: {
        'room': {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            title: 'Гипсокартон, потолок',

            length: 0,
            width: 0,

            incSquareCount: 0,
            decSquareCount: 0,

            price: 200,

            profileStep: 0.4,
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
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
            addJob: 'addJob',
        }),

        setDefaultActionsHandler(){
            this.length = Math.max(this.room.sizes.s1, this.room.sizes.s3);
            this.width  = Math.max(this.room.sizes.s2, this.room.sizes.s4);
        },

        createJob(){
            const job = {}
            job.title = `${this.title} (id=${this.currentPickedJob})`;
            job.id = this.addedJobNum;
            job.room_id = this.room.id;
            job.job_id = this.currentPickedJob;
            job.sum = this.totalAmount.price;
            job.adding_job_info_string = this.totalAmount.adding_job_info_string;
            return job;
        },

        addCalced(){
            this.incrementAddedJobNum();

            const job = this.createJob();

            this.incValueToJobsResultingSum(job.sum);
            this.addJob(job);
        },
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            addedJobNum: state => state.addedJobNum,
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
                amount: this.driwallListCountCeiled + ' (' + this.driwallListCount + ')',
                unit_name: 'листов',
                description: 'Гипсокартон предназначен для внутренней отделки и декорирования отапливаемых помещений с сухим и нормальным влажностными режимами. Материал используется для облицовки стен, потолка и возведения перегородок в сухих помещениях, так же гипсокартон используют для создания декоративный элементов - встроенные ниши с полками, арки в помещениях. Это безопасный для здоровья материал, к преимуществам гипсокартона относится так же легкость возведения конструкции. Для крепления тяжёлых элементов на стену из гипсокартона следует использовать дополнительные армирующие элементы – профиль и дюбель для гипсокартона.',
            },
            {
                id: 18304521,
                title: 'Профиль направляющий (ПН-2) Standers 0.6 мм 50х40х3000 мм',
                amount: this.profileGuideUnits,
                unit_name: 'единиц',
                description: 'Профиль направляющий Standers ПН-2 ― деталь металлического каркаса для конструкций из гипсокартона. Используется в качестве основы-опоры для фиксации перемычек и стоек при создании перегородок и облицовок. Отличается простой П-образной формой. Устанавливается по периметру каркаса, куда затем монтируются другие элементы системы.\n' +
                    '\n' +
                    'Профиль изготавливается путем холодного проката металлических лент толщиной 0,6 мм через специальный профилегибочный станок. Материалом служит оцинкованная сталь с необработанным покрытием. Этот металл отличается:',
            },
            {
                id: 18304547,
                title: 'Профиль потолочный (ПП) Standers 0.6 мм 60х27х3000 мм',
                amount: this.profileCeilingUnits,
                unit_name: 'единиц',
                description: 'Профиль потолочный Standers ПП — несущий элемент металлического каркаса, который необходим при создании конструкций из гипсокартона. В первую очередь предназначен для монтажа подвесных потолков, но может использоваться также при обшивке стен, обустройстве ниш, коробов, фальшстен, полок. Крепится с помощью П-образных подвесов, фиксируемых на поверхности чернового потолка или стен. Именно к этому профилю прикручиваются гипсокартонные листы.\n' +
                    '\n' +
                    'Реализованные новаторские предложения по прокатке профиля позволили значительно повысить его жесткость и несущую способность за счет инновационной технологии изготовления. Рифленая поверхность профиля позволяет сократить время при монтаже за счет удобства крепления при использовании саморезов.\n' +
                    '\n' +
                    'Проведенные испытания профиля ПП 60х27 Стандерс показали, что его несущая способность находится на уровне профиля, изготовленного методом обычной прокатки из сырья толщиной 0,6 мм. В связи с этим, указанная на профиле толщина 0,6 мм информирует покупателя о том, что прочность /несущая способность данного профиль соответствует несущей способности профиля из металла толщиной 0,6 мм, но изготовленного из обычного гладкого металла.',
            },
            {
                id: 83865961,
                title: 'Прямой подвес профилей 275x30x0.4',
                amount: Math.ceil(this.directSuspension),
                unit_name: 'штук',
                description: 'Прямой подвес – высокотехнологичный строительный элемент, который используется для закрепления потолочных профилей на несущих конструкциях. Изготовлен из стальных полос оптимальной жесткости и прочности, что позволяет оборудовать надежный каркас для подвесных потолочных систем. Благодаря специальной форме, на установку каркасов любой сложности тратится минимальное количество времени. Совместим с различными крепежами: дюбелями, шурупами, анкерами.',
            },
            {
                id: 82506954,
                title: 'Саморезы для гипсокартона KNAUF фосфатированные 3.5x35',
                amount: this.getFasteners.samor35sm_metall,
                unit_name: 'штук',
                description: 'Саморезы гипсокартон-металл Кнауф с потайной головкой используются при производстве строительных работ и предназначены для крепления листов из гипсокартона к металлическим каркасам перегородок и потолков без предварительного сверления. Упакованы в картонные коробки. Количество изделий в упаковке — 1000 шт. Страна производства — Тайвань.\n' +
                    '\n' +
                    'Изготовлены из стали с черным фосфатированным покрытием. Длина — 25 мм, диаметр — 3,5 мм. Для заворачивания используются отвертки или биты PH',
            },
            {
                id: 82506954,
                title: 'Саморезы для дерева STANDERS фосфатированные 3.5x45',
                amount: this.getFasteners.samor45sm_wood,
                unit_name: 'штук',
                description: 'Саморез по дереву Standers используется при проведении строительных, отделочных и ремонтных работ внутри помещения — для скрепления деталей, фиксации листовых материалов к основанию. Благодаря острому концу можно вкручивать крепеж шуруповертом или отверткой без предварительного сверления.',
            },
            {
                id: 82716893,
                title: 'Дюбель-гвозди грибовидные Ecoplast, 6x40 мм, полипропилен',
                amount: this.getFasteners.dubel4sm,
                unit_name: 'штук',
                description: 'Дюбель-гвозди грибовидные Ecoplast предназначены для сквозного монтажа кронштейнов, дверных коробок, оконных рам, кабельных каналов, обрешетки, гипсокартонных листов (ГКЛ), гипсоволокнистых листов (ГКЛ) и т.д. Для установки необходимо предварительно просверлить отверстие. Прочность крепежа достигается расклиниванием дюбеля в отверстии гвоздем в момент удара молотком. С помощью крестообразного шлица на головке гвоздя можно легко ослабить или усилить крепеж, демонтировать его.',
            },
            {
                id: 85339222,
                title: 'Саморезы по металлу Tech-Krep фосфатированные 3.5x11 мм',
                amount: this.getFasteners.semechki,
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

        profileGuide(){ // профиль направляющий
            return (+this.width + +this.length) * 2;
        },
        profileGuideUnits(){
            return Math.ceil(this.profileGuide / 3);
        },
        profileCeiling(){ // профиль потолочный
            const additionalProfile = 1;
            const p1 = (Math.ceil(+this.length / +this.profileStep) - additionalProfile) * +this.width;
            const sum = Math.ceil(p1);
            return sum;
        },
        profileCeilingUnits(){
            return Math.ceil(this.profileCeiling / 3);
        },
        directSuspension(){ // профиль прямой
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
            this.fasteners.dubel4sm += Math.ceil(this.directSuspension * 2);
            this.fasteners.samor45sm_wood += Math.ceil(this.directSuspension * 4);

            // гипсокартон, саморезы по металлу 3.5 см
            const drywallPerimeter = 2.5 * 2 + 1.2 * 2;
            this.fasteners.samor35sm_metall = Math.ceil(this.profileCeiling / 0.2 + drywallPerimeter / 0.2);

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

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}
</script>

<style scoped>

</style>
