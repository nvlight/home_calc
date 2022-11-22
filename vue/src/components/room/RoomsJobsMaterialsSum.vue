<template>
    <div class="resultingSumm">
        <div class="fixed border border-red-400 border-dotted rounded-full flex justify-center items-center"
             style="top: 7px; right: 7px; height: 55px; width: 111px; margin-top: 0;
             background-color: #fff; padding: 10px;
            ">
            <div class="fixed text-2xl font-semibold">{{ sum }} {{ currency }}</div>
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
