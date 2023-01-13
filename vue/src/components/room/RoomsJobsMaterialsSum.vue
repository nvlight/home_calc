<template>
    <div v-if="sum > 0" class="resultingSumm flex items-center">
        <h3 class="text-xl">Общая сумма</h3>
        <div class="rounded-md px-2 py-0.5 w-fit h-fit bg-gray-600 ml-2
            text-white cursor-pointer hover:bg-gray-700"
             style="bottom: 10px; right: 10px;
             block-size: fit-content;
            ">
                <div class="font-semibold">{{ sum }} {{ currency }}</div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'rooms-jobs-materials-sum',
    props: {

    },

    data(){
        return {
        }
    },

    methods: {
        ...mapActions({
        }),
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
        }),

        ...mapGetters({
            allJobsSum: 'roomJob/sum',
            allMaterialsSum: 'roomMaterial/sum',
        }),
        sum(){
            return this.allJobsSum + this.allMaterialsSum
        }
    },
    mounted() {
    },
    watch:{

    },
}
</script>

<style scoped>
</style>
