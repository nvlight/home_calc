<template>
    <div class="resultingSumm p-3">
        <h1 class="text-2xl font-semibold">Общая стоимость работ: {{jobsSum}} {{ currency }}</h1>
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
