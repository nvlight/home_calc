<template>
    <div class="resultingSumm p-3">
        <h1 class="text-2xl font-semibold">Общая стоимость работ: {{jobsSum}} {{ currency }}</h1>
<!--        <div>$store.getters['roomJob/jobsSum']: {{$store.getters['roomJob/jobsSum']}}</div>-->
<!--        <div>jobsSum: {{$store.state.roomJob.jobsSum}}</div>-->
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
            //jobsResultingSum: state => state.roomJob.jobsResultingSum,
            currency: state => state.currency,
            addedJobs: state => state.roomJob.addedJobs,
        }),
        ...mapGetters({
            jobsSum: 'roomJob/jobsSum',
        }),

    },
    watch:{
        addedJobs(v1, v2){
            //this.$store.dispatch('roomJob/updateJobsSum');
        },
    }
}
</script>

<style scoped>
</style>
