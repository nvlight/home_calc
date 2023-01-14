<template>
    <div v-if="sum" class="mt-3 mb-3 text-xl text-center border-t border-gray-100">
        <span>Сумма материалов и работ: </span>
        <span class="font-semibold">{{ sum }}&nbsp;{{ currency }}</span>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'room-jobs-materials-sum',
    components: {},

    props: {
    },
    inject: ['room_id'],
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
        }),
        ...mapGetters({
            jobsSum: 'roomJob/sumByRoomId',
            materialsSum: 'roomMaterial/sumByRoomId',
        }),

        sum(){
            return this.jobsSum(this.room_id) + this.materialsSum(this.room_id);
        }
    },
    mounted() {
    },
    watch:{
    },
}
</script>

<style scoped>

</style>
