<template>
    <div v-if="roomJobsSum" class="mt-3">
        <span class="text-2xl">Стоимость работ: {{ roomJobsSum }}&nbsp;{{ currency }}</span>
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
            addedJobs: state => state.addedJobs,
        }),
        jobsSum(){
           //return this.$store.getters.getRoomJobsSum(this.room_id);
           //return this.$store.getters.getRoomStaticValue;
        }
    },
    watch:{
        addedJobs: {
            handler(newValue, oldValue){
                //console.log('newValue:', newValue);
                //console.log('oldValue:', oldValue);

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
