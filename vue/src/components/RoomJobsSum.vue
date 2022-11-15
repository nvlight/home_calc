<template>
    <div v-if="roomJobsSum" class="mt-3 text-xl text-center">
        <span>Стоимость работ: </span>
        <span class="font-semibold ">{{ roomJobsSum }}&nbsp;{{ currency }}</span>
    </div>
</template>

<script>
import {mapState,mapGetters} from "vuex";

export default {
    name: 'room-jobs-sum',

    props: {
        room_id: {
            type: Number,
            required: true,
        },
    },

    data(){
        return{
            roomJobsSum: 0,
        }
    },

    methods:{
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
                this.roomJobsSum = 0;
                this.roomJobs.forEach( t => {
                    if (t.room_id === this.room_id){
                        this.roomJobsSum += t.sum;
                    }
                });
            },
            deep: true,
        },
    }
}
</script>

<style scoped>
</style>
