<template>
    <div class="resultingSumm p-3">
        <h1 class="text-2xl font-semibold">Общая стоимость работ: {{jobsResultingSum}} {{ currency }}</h1>
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
            jobsResultingSum: state => state.roomJob.jobsResultingSum,
            currency: state => state.currency,
            addedJobs: state => state.roomJob.addedJobs,
        }),
    },
    watch:{
        // addedJobs(v1, v2){
        //     const sum = addedJobs.reduce( (previousValue, currentValue) =>
        //         previousValue + currentValue.sum, 0 );
        //
        //     this.$store.dispatch('roomJob/setJobsResultingSum', sum);
        // },
    }
}
</script>

<style scoped>

</style>
