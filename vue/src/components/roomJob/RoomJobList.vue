<template>
    <div v-if="addedJobsClone?.length" class="pt-4 pb-4 px-2">
        <div class="w-full max-h-72 overflow-y-scroll">
            <div class="font-semibold text-xl text-center">Добавленные работы:</div>

            <div v-for="(job,index) in addedJobsClone"
                 :key="job.id">
                <div class="flex flex-wrap justify-between  mt-2">
                    <div> {{job.id}}. {{ job.title }} </div>
                    <div class="flex self-center">
                        <span class="flex">&nbsp;{{ job.sum }}
                            <span class="font-semibold">&nbsp;{{ currency }}</span>
                        </span>

                        <mg-trash-icon-button @click="deleteJob(job.id)">
                        </mg-trash-icon-button>
                    </div>
                </div>
                <div v-if="job.main_info">
                    [{{ job.main_info }}]
                </div>
            </div>
        </div>

        <room-jobs-sum></room-jobs-sum>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import RoomJobsSum from "./RoomJobsSum.vue";

export default {
    name: 'added-job-list',
    props: {
        room_id: {
            type: Number,
        }
    },
    components: { RoomJobsSum, },
    data(){
        return {
            addedJobsClone: [],
        }
    },
    methods:{
        ...mapActions({
            deleteJob: 'roomJob/deleteJobHandler',
        }),
        filterRoomJobs(){
            const tmp = this.roomJobs
                .filter(t => t.room_id === this.room_id )
            this.addedJobsClone = Object.assign(tmp, {});
        }
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            roomJobs: state => state.roomJob.roomJobs,
        }),
        ...mapGetters({
            //jobsSum: 'roomJob/jobsSum',
        }),
    },
    watch:{
        roomJobs: {
            handler(nv, ov){
                this.filterRoomJobs();
            },
            deep: true,
        },
    },
    mounted() {
        this.filterRoomJobs();
    },
}
</script>

<style scoped>
</style>
