<template>
    <h3 class="text-center text-xl font-semibold">{{ title }}</h3>

    <div>
        <mg-button @click="setDefaultPerimeter">установить размеры комнаты по умолчанию</mg-button>
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

    <div class="mt-2 ">
        <span class="font-normal">Общая сумма: </span>
        <span class="font-semibold">{{sum}} {{currency}}</span>
    </div>

</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: 'cornice-calc',
    props: {
        'defaultPerimeter': {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            title: 'Карнизы',

            perimeter: 0,

            incPerimeterCount: 0,
            decPerimeterCount: 0,

            priceInstallation: 70,
            pricePainting: 80,
        }
    },
    methods: {
        ...mapActions({
            incrementAddedJobNum: 'incrementAddedJobNum',
            incValueToJobsResultingSum: 'incValueToJobsResultingSum',
            addJob: 'addJob',
        }),

        setDefaultPerimeter(){
            this.perimeter = this.defaultPerimeter;
        }
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            addedJobNum: state => state.addedJobNum,
            currentPickedJob: state => state.currentPickedJob,
        }),

        changedPerimeter(){
            return +this.perimeter + +this.incPerimeterCount + (- +this.decPerimeterCount);
        },

        sumPriceInstallation(){
            return +this.changedPerimeter * this.priceInstallation;
        },
        sumPricePainting(){
            return +this.changedPerimeter * this.pricePainting;
        },

        sum(){
            return this.sumPriceInstallation + this.sumPricePainting;
        },
    },
    mounted() {
        this.setDefaultPerimeter();
    }
}
</script>

<style scoped>

</style>
