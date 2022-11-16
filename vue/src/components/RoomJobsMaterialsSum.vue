<template>
    <div class="mt-3 mb-3 text-xl text-center">
        <span>Сумма материалов и работ: </span>
        <span class="font-semibold ">{{ sum }}&nbsp;{{ currency }}</span>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'room-jobs-materials-sum',
    props: {
        room_id: {
            type: Number,
            required: true,
        },
    },

    data(){
        return {
            roomJobsSum: 0,
            roomMaterialsSum: 0,
        }
    },

    methods: {
        ...mapActions({
        }),
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            roomJobs: state => state.roomJob.addedJobs,
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),

        sum(){
            return this.roomJobsSum + this.roomMaterialsSum;
        }
    },
    watch:{
        roomMaterials: {
            handler(nv, ov){
                this.roomMaterialsSum = 0;
                this.roomMaterials.forEach( t => {
                    if (t.room_id === this.room_id){
                        this.roomMaterialsSum += t.sum;
                    }
                });
            },
            deep: true,
        },

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
    },
}
</script>

<style scoped>

</style>
