<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div class="border border-dashed border-2 p-3 rounded-xl">
        <h1 class="text-xl">Выбор типа потолка</h1>
        <div class="description hidden">
            <h3 class="text-xl">В наличии имеются несколько видов потолков:</h3>
            <ol class="">
                <li>Матовые</li>
                <li>Глянцевые</li>
                <li>Сатиновые</li>
                <li>Тканевые</li>
                <li>Двухуровневые</li>
                <li>Фотопечать</li>
                <li>Фактурные</li>
                <li>Звездное небо</li>
            </ol>
        </div>
        <select
            v-model="choosedCeiling.selected_id"
            name="ceiling_type" id="ceiling_type"
            multiple
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3 h-[265px]"
        >
            <option
                v-for="(pot,index) in prices"
                :value="pot.id">{{ pot.name }} - ({{ pot.price }} {{ currency }})
            </option>
        </select>

        <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400">
            Выбранный элемент select <strong>{{ choosedCeiling.selected_id }}</strong>
        </div>

        <div class="rounded-md shadow-sm flex mt-2">
            <div class="mr-2">
                <mg-input-labeled v-model="sizes.s1">Сторона 1</mg-input-labeled>
            </div>
            <div class="mr-2">
                <mg-input-labeled v-model="sizes.s2">Сторона 2</mg-input-labeled>
            </div>
            <div class="mr-2">
                <mg-input-labeled v-model="sizes.s3">Сторона 3</mg-input-labeled>
            </div>
            <div class="mr-2">
                <mg-input-labeled v-model="sizes.s4">Сторона 4</mg-input-labeled>
            </div>

            <div class="mr-2">
                <mg-input-labeled v-model="room.height">Высота</mg-input-labeled>
            </div>
        </div>
        <div>
            <mg-button @click="setDefaultRoomSizesHandler">установить размеры по умолчанию</mg-button>
        </div>
        <div class="rooms_calc mt-2">
            <div>Периметр: <span class="font-semibold">{{ perimeter }}</span> м.</div>
            <div>Площадь потолка: <span class="font-semibold">{{ squareCeiling }} </span> кв.м.</div>
        </div>

        <hr class="mt-3">

        <div class="flex justify-between mt-5">
            <span>Натяжной потолок + установка</span>
            <span>
                <strong>{{ ceilingPrice }}</strong> {{ currency }}
            </span>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3">Багет (м.)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="baget.count" placeholder="0">
            <strong class="w-1/3 text-right">{{ bagetSumm }} {{ currency }}</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3">Подлюстренники (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="chandeliers.count" placeholder="0">
            <strong class="w-1/3 text-right">{{ chandeliersSumm }} {{ currency }}</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3">Светильники (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="luminaire.count" placeholder="0">
            <strong class="w-1/3 text-right">{{ luminaireSumm }} {{ currency }}</strong>
        </div>
        <div class="flex justify-between items-center mt-3">
            <span class="w-1/3">Трубы (шт)</span>
            <input
                class="w-1/3 text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                           rounded-b-md rounded-t-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" v-model="pipes.count" placeholder="0">
            <strong class="w-1/3 text-right">{{ pipesSumm }} {{ currency }}</strong>
        </div>

        <div class="flex justify-between mt-3">
            Доставка <strong>{{ deliveryPrice }} {{ currency }}</strong>
        </div>

        <hr class="mt-3">
        <div class="flex justify-between mt-3">
            Итоговая сумма <strong>{{ totalAmount.price }} {{ currency }}</strong>
        </div>

        <mg-grid-icon-button @click="addCalcedCeil">Добавить всю сумму</mg-grid-icon-button>

        <label class="block mt-2">
            <input type="checkbox"
                   :value="this.showFastenersStep"
                   @change="this.showFastenersStep = !this.showFastenersStep"
            >
            <span class="pl-1">Показать шаги крепежей</span>
        </label>
        <div class="mt-2" v-if="showFastenersStep">
<!--            <div>fasteners: {{ fasteners }}</div>-->
            <div class="font-semibold">Установка шага для крепежей</div>
            <div v-for="(fastener,i) in fasteners">
                <mg-input-labeled v-model="fasteners[i].step">{{ fastener.title }}</mg-input-labeled>
            </div>
        </div>

        <materials-for-buy-block
            :materials="materials"
            :room="room"
        ></materials-for-buy-block>

        <mg-button @click="">Добавить рекомендованные материалы</mg-button>

        <room-material-form :room_id="room.id"></room-material-form>

    </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
import MaterialsForBuyBlock from "../additional/MaterialsForBuyBlock.vue";
import RoomMaterialForm from "../material/RoomMaterialForm.vue";

export default {
    name: 'CeilingCalc',
    props: ['room'],
    components: { MaterialsForBuyBlock, RoomMaterialForm},
    data() {
        return {
            title: 'Натяжной потолок',

            currentPickedJob: 0,

            sizes: {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            height: 2.3,

            choosedCeiling: {
                selected_id: [1],
                price: 0,
            },
            baget: {
                count: 0,
                price: 100,
                summ: 0,
            },
            chandeliers: {
                count: 1,
                price: 200,
                summ: 0,
            },
            luminaire: {
                count: 0,
                price: 100,
                summ: 0,
            },
            pipes: {
                count: 0,
                price: 100,
                summ: 0,
            },
            deliveryPrice: 1000,
            prices: [
                {
                    id: 1,
                    name: 'Матовый белый до 3.2м',
                    slug: 'mat_white_3.2',
                    price: 400,
                },
                {
                    id: 2,
                    name: 'Матовый белый до 4м., 5м.',
                    slug: 'mat_white_4',
                    price: 450,
                },
                {
                    id: 3,
                    name: 'Глянцевый белый до 3.2м',
                    slug: 'glossy_white_3.2',
                    price: 450,
                },
                {
                    id: 4,
                    name: 'Глянцевый белый до 4м., 5м',
                    slug: 'glossy_white_4',
                    price: 500,
                },
                {
                    id: 5,
                    name: 'Матовый цветной до 3.2м',
                    slug: 'mat_color_3.2',
                    price: 450,
                },
                {
                    id: 6,
                    name: 'Матовый цветной до 4м., 5м.',
                    slug: 'mat_color_4',
                    price: 500,
                },
                {
                    id: 7,
                    name: 'Глянцевый цветной до 3.2м',
                    slug: 'glossy_color_3.2',
                    price: 550,
                },
                {
                    id: 8,
                    name: 'Глянцевый цветной до 4м., 5м',
                    slug: 'glossy_color_4',
                    price: 600,
                },
                {
                    id: 9,
                    name: 'Фактурные до 3.2м',
                    slug: 'textured_3.2',
                    price: 850,
                },
                {
                    id: 10,
                    name: 'Искры (эффект) до 3.2м',
                    slug: 'sparks_effect_3.2',
                    price: 1000,
                },
                {
                    id: 11,
                    name: 'Облака до 3.2м',
                    slug: 'the_clouds_3.2',
                    price: 1000,
                },
                {
                    id: 12,
                    name: 'Фотопечать до 3.2м',
                    slug: 'photo_printing',
                    price: 3500,
                },
            ],

            fastenersCals: null,
            pickedFasteners: [],
            fastenersCustomUnitSet: [],
            fastenersModel: {},

            fasteners: [
                {
                    id: 8,
                    title: 'Дюбель-гвозди грибовидные Ecoplast, 6x40 мм, полипропилен, 100 шт.',
                    value: 0,
                    step: 0.19,
                },
                {
                    id: 7,
                    title: 'Саморезы для дерева Standers фосфатированные 3.5x45 на вес (около 455 шт./кг); 288 ₽/шт.',
                    value: 0,
                    step: 0.21,
                },
                {
                    id: 53,
                    title: 'Саморезы для металла STANDERS фосфатированные 3.5x35, на вес (около 510 шт./кг); 280 ₽ /шт.',
                    value: 0,
                    step: 0.11,
                },
            ],

            showFastenersStep: false,
        }
    },
    methods: {
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        getDefaultPerimeter() {
            return +this.room.sizes.s1 +
                +this.room.sizes.s2 +
                +this.room.sizes.s3 +
                +this.room.sizes.s4
        },
        setDefaultRoomSizesHandler() {
            this.setDefaultRoomSizes();
        },
        setDefaultRoomSizes() {
            this.sizes = Object.assign({}, this.room.sizes);
            this.baget.count = this.getDefaultPerimeter();
        },

        addCalcedCeil() {
            if (!this.choosedCeiling.selected_id.length) {
                alert('Сначала выберите потолок!')
                return;
            }
            this.addCalced(this.totalAmount)
        },

        createJob() {
            const job = {}
            const currentJobId = this.$store.getters['room/getSelectedJob'](this.room.id)[0]?.jobId;
            job.title = `${this.title} (id=${currentJobId})`;
            job.room_id = this.room.id;
            job.job_id = currentJobId;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            job.seiling_selected_id = this.totalAmount.seiling_selected_id; // unigue for seiling
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

        perimeter() {
            return (+this.sizes.s1 +
                +this.sizes.s2 +
                +this.sizes.s3 +
                +this.sizes.s4).toFixed(2)
        },
        squareCeiling() {
            return (Math.max(+this.sizes.s1, +this.sizes.s3) *
                Math.max(+this.sizes.s2, +this.sizes.s4)).toFixed(2)
        },
        squareFloor() {
            return this.squareCeiling;
        },
        squareWalls() {
            return this.perimeter * this.height;
        },

        bagetSumm() {
            //return this.baget.count * this.baget.price;
            // бизнес-требование, периметр багетов всегда должен быть округлен вверх!
            return Math.ceil(this.baget.count) * this.baget.price;
        },
        chandeliersSumm() {
            return this.chandeliers.count * this.chandeliers.price;
        },
        luminaireSumm() {
            return this.luminaire.count * this.luminaire.price;
        },
        pipesSumm() {
            return this.pipes.count * this.pipes.price;
        },

        ceilingPrice() {
            let ceiling_select_id = this.choosedCeiling.selected_id;
            if (ceiling_select_id.length) {
                const index = ceiling_select_id[0];

                for (let price in this.prices) {
                    const item = this.prices[price];
                    if (item.id === index) {
                        // бизнес требование - квадратура потолка всегда округляется наверх!
                        return Math.ceil(this.squareCeiling) * item.price;
                    }
                }
            }

            return 0;
        },

        totalAmount() {
            const sum = this.ceilingPrice
                + this.bagetSumm
                + this.chandeliersSumm
                + this.luminaireSumm
                + this.deliveryPrice;

            let adding_job_info_string = `Сам потолок + установка: ${this.ceilingPrice} ${this.currency}
                (${Math.ceil(this.squareCeiling)} кв.м.); `;
            adding_job_info_string += `багеты: ${this.bagetSumm} ${this.currency}; `;

            if (this.chandeliers.count) {
                adding_job_info_string += `Подлюстренники: ${this.chandeliersSumm} ${this.currency}; `;
            }
            if (this.luminaire.count) {
                adding_job_info_string += `Светильники: ${this.luminaireSumm} ${this.currency}; `;
            }
            if (this.pipes.count) {
                adding_job_info_string += `Трубы: ${this.pipesSumm} ${this.currency}; `;
            }

            return {
                seiling_selected_id: this.choosedCeiling.selected_id,
                price: sum,
                adding_job_info_string,
            }
        },

        getFasteners(){
            //console.log('fasteners change');
            const db4sm      = this.fasteners.filter(t=>t.id===8);
            const samorm35sm = this.fasteners.filter(t=>t.id===7);
            const samord35sm = this.fasteners.filter(t=>t.id===53);

            // дюбели и саморезы по 4-3.5 см.
            // let pn1 = (this.perimeter / 0.19); // db4sm
            // let pn2 = (this.perimeter / 0.21); // samorm35sm
            // let pn3 = (this.perimeter / 0.11); // samord35sm// дюбели и саморезы по 4-3.5 см.
            let pn1 = (this.perimeter / db4sm[0].step); // db4sm
            let pn2 = (this.perimeter / samorm35sm[0].step); // samorm35sm
            let pn3 = (this.perimeter / samord35sm[0].step); // samord35sm
            //console.log(pn1, pn2, pn3);

            db4sm[0].value      = +Math.ceil( pn1.toFixed(2) );
            samorm35sm[0].value = +Math.ceil( pn2.toFixed(2) );
            samord35sm[0].value = +Math.ceil( pn3.toFixed(2) );

            return this.fasteners;
        },

        materials() {
            const arr = [];

            this.getFasteners.forEach(t => {
                arr.push( {title: t.title, amount: t.value, amount_add_info: t.value, unit_name: 'шт.',} )
            });
            // todo: материалы к натпоту человек сам не сможет купить, поэтому в список материалов его не добавляю!
            // arr.push({title: 'Багеты', amount: this.baget.count, unit_name: 'м.',});
            // if (this.chandeliers.count) {
            //     arr.push({title: 'Подлюстренники', amount: this.chandeliers.count, unit_name: 'шт.',});
            // }
            // if (this.luminaire.count) {
            //     arr.push({title: 'Светильники', amount: this.luminaire.count, unit_name: 'шт.',});
            // }
            // if (this.pipes.count) {
            //     arr.push({title: 'Трубы', amount: this.pipes.count, unit_name: 'шт.',});
            // }
            return arr;
        },
    },
    watch: {},
    beforeMount() {
    },
    mounted() {
        this.setDefaultRoomSizesHandler();

        if (sessionStorage.getItem('currentPickedJob')) {
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    }
}

</script>

<style>
</style>
