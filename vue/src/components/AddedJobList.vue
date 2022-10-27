<template>
    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">
            <h2 class="font-semibold text-xl text-center">1. Виды работ:</h2>

            <div v-if="!addedJobs?.length">
                <span class="block text-center">Список пуст</span>
            </div>
            <div v-else>
                <div v-for="(job,index) in addedJobs"
                     :key="index">
                    <div class="flex justify-between mt-2">
                        <div> {{index+1}}. {{ job.title }} </div>
                        <div class="flex self-center">
                            <span class="flex">&nbsp;{{ job.sum }}
                                <span class="font-semibold">&nbsp;{{ currency }}</span>
                            </span>

                            <mg-trash-icon-button @click="deleteJob(job.id)">
                            </mg-trash-icon-button>
                        </div>
                    </div>
                    <div v-if="job.adding_job_info_string">
                        [{{ job.adding_job_info_string }}]
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: 'added-job-list',
    props: {
    },
    methods:{
        ...mapActions({
            deleteJob: 'deleteJobHandler',
        }),
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            addedJobs: state => state.addedJobs,
        }),
        ...mapGetters({
            jobsSum: 'jobsSum',
        }),
    },
    mounted() {
    }
}
</script>

<style scoped>
</style>
