<template>
    <div class="resultingSumm">
        <div class="">
            <div class="fixed border border-red-400 border-dotted rounded-full flex justify-center items-center"
                 style="top: 7px; right: 7px; height: 55px; width: 111px; margin-top: 0;
                 background-color: #fff; padding: 10px;
                ">
                <div class="fixed text-2xl font-semibold">{{jobsSum}} {{ currency }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters} from "vuex";

export default {
    name: 'job-resulting-sum',

    methods:{
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),
        ...mapGetters({
            jobsSum: 'roomJob/jobsSum',
        }),

    },
    watch:{
    }
}
</script>

<style scoped>
</style>
