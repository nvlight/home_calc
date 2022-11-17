<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaults">установить размеры комнаты по умолчанию</mg-button>
    </div>

    <div class="flex justify-between mt-2">
        <div class="self-center">
            <mg-input-labeled class="" v-model="perimeter" :placeholder="'кв.м.'">Периметр</mg-input-labeled>
        </div>

        <div class="">
            <div>
                <mg-input-labeled :modelValue="incPerimeterCount" @input="incPerimeterCount = $event.target.value"
                              :placeholder="'кв.м.'">Прибавить м.</mg-input-labeled>
            </div>
            <div>
                <mg-input-labeled v-model="decPerimeterCount" :placeholder="'кв.м.'">Убавить м.</mg-input-labeled>
            </div>
        </div>
    </div>

    <div>Результирующий периметр: <span class="font-semibold">{{changedPerimeter}}</span> м.</div>

    <div class="mt-3 flex justify-between">
        <div class="w-5/12">
            <mg-input-labeled v-model="priceInstallation" :placeholder="'кв.м.'">Установка, сумма за 1 м.</mg-input-labeled>
        </div>
        <div class="w-5/12">
            <mg-input-labeled v-model="pricePainting" :placeholder="'кв.м.'">Покраска, сумма за 1 м.</mg-input-labeled>
        </div>
    </div>

    <div class="mt-2">
        <mg-checkbox v-model="select" :options="options"></mg-checkbox>
    </div>

    <div class="mt-2 ">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

    <mg-button @click="addCalced">Добавить сумму</mg-button>

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
    name: 'cornice-calc',
    components: { RoomMaterialForm, MaterialsForBuyBlock},
    props: {
        'room':{
            type: [Object],
            required: true,
        },
    },
    data(){
        return {
            perimeter: 0,
            title: 'Карнизы',

            incPerimeterCount: 0,
            decPerimeterCount: 0,

            priceInstallation: 70,
            pricePainting: 80,
            currentPickedJob: 0,

            toggle:[],
            isInstallation: true,
            isPainting: true,
            options: [
                { value: 1, name: 'установка', },
                { value: 2, name: 'покраска',  selected: true,  },
            ],
            select: [],
        }
    },
    methods: {
        ...mapActions({
            addJob: 'roomJob/createRoomJob',
        }),

        createJob(){
            const job = {}
            job.title = `${this.title} (id=${this.currentPickedJob})`;
            job.room_id = this.room.id;
            job.job_id = this.currentPickedJob;
            job.sum = this.totalAmount.price;
            job.main_info = this.totalAmount.adding_job_info_string;
            return job;
        },

        addCalced(){
            this.addJob(this.createJob());
        },

        setDefaults(){
            this.perimeter = this.getDefaultPerimeter();
        },

        getDefaultPerimeter(){
            return  +this.room.sizes.s1 +
                    +this.room.sizes.s2 +
                    +this.room.sizes.s3 +
                    +this.room.sizes.s4
        },

    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),

        changedPerimeter(){
            let p = +this.perimeter + +this.incPerimeterCount + (- +this.decPerimeterCount)
            p = Math.ceil(p);
            // обычно по 2 метра плинтуса потолчные идут, нужно до четного вверху прибавить
            if (p % 2 != 0){
                p++;
            }

            return p;
        },
        corniceCount(){
            return (this.changedPerimeter / 2);
        },
        corniceCountCeiled(){
            return Math.ceil(this.corniceCount);
        },

        sumPriceInstallation(){
            return +this.changedPerimeter * this.priceInstallation;
        },
        sumPricePainting(){
            return +this.changedPerimeter * this.pricePainting;
        },

        sum(){
            let s = 0;

            if (this.select.includes(1)){
                s += this.sumPriceInstallation;
            }
            if (this.select.includes(2)){
                s += this.sumPricePainting;
            }

            return s;
        },

        materials(){
            // https://gipsokarton-blog.ru/raboty/rasstoyanie-mezhdu-podvesami.html
            const arr = [];
            arr.push(
                {
                    id: 12593034,
                    title: 'Плинтус потолочный пенополистирол Inspire LX-105 белый 68х80х2000 мм',
                    amount: this.corniceCountCeiled,
                    amount_add_info: this.corniceCount,
                    unit_name: 'шт',
                },
            )
            return arr;
        },

        totalAmount() {
            return {
                price: this.sum,
                adding_job_info_string:
                    `Периметр: ${this.changedPerimeter} м.,
                    установка, цена за 1 м.: ${this.priceInstallation} ${this.currency}
                     покраска, цена за 1 м.: ${this.pricePainting} ${this.currency}`,
            };
        },
    },
    mounted() {
        this.setDefaults();

        if (sessionStorage.getItem('currentPickedJob')){
            this.currentPickedJob = +sessionStorage.getItem('currentPickedJob');
        }
    },

}
</script>

<style scoped>
</style>
