<template>
    <div class="resultingSumm">
        <div class="">
<!--            <span>Общая сумма материалов и работ всех комнат: </span>-->
            <div class="fixed border border-red-400 border-dotted rounded-full flex justify-center items-center"
                 style="top: 7px; right: 7px; height: 55px; width: 111px; margin-top: 0;
                 background-color: #fff; padding: 10px;
                ">
                <div class="fixed text-2xl font-semibold">{{ sum }} {{ currency }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'rooms-jobs-materials-sum',
    props: {

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
        calcMaterialsSum(){
            this.roomMaterialsSum = 0;
            this.roomMaterials.forEach( t => {
                this.roomMaterialsSum += t.sum;
            });
        },
        calcJobsSum(){
            this.roomJobsSum = 0;
            this.roomJobs.forEach( t => {
                this.roomJobsSum += t.sum;
            });
        },
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
    mounted() {
        this.calcJobsSum();
        this.calcMaterialsSum();
    },
    watch:{
        roomMaterials: {
            handler(nv, ov){
                this.calcMaterialsSum();
            },
            deep: true,
        },

        roomJobs: {
            handler(nv, ov){
                this.calcJobsSum();
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
</style>
