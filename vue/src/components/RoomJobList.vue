<template>
    <div class="pt-4 pb-4 px-2">
        <div class="max-w-md">
            <div class="font-semibold text-xl text-center">Добавленные работы:</div>

            <div v-if="!addedJobsClone?.length">
                <span class="block text-center">Список пуст</span>
            </div>
            <div v-else>
                <div v-for="(job,index) in addedJobsClone"
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
                    <div v-if="job.main_info">
                        [{{ job.main_info }}]
                    </div>
                </div>
            </div>

            <room-jobs-sum :room_id="room_id"></room-jobs-sum>
        </div>
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
            roomJobs: state => state.roomJob.addedJobs,
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
