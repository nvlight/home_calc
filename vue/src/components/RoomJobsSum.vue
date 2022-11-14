<template>
    <div v-if="roomJobsSum" class="mt-3 text-xl text-center">
        <span>Стоимость работ: </span>
        <span class="font-semibold ">{{ roomJobsSum }}&nbsp;{{ currency }}</span>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
    name: "room-jobs-sum",
    data(){
        return {
            roomJobsSum: 0,
        }
    },
    props: {
        room_id: {
            type: Number,
            required: true,
        },
    },
    methods: {
        ...mapActions({
        }),
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            addedJobs: state => state.roomJob.addedJobs,
        }),
    },
    watch:{
        addedJobs: {
            handler(nv, ov){
                this.roomJobsSum = 0;
                this.addedJobs.forEach( t => {
                    if (t.room_id === this.room_id){
                        this.roomJobsSum += t.sum;
                    }
                });
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
</style>
