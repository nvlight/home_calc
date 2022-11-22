<template>
    <div v-if="sum" class="mt-3 text-xl text-center">
        <span>Стоимость работ: </span>
        <span class="font-semibold ">{{ sum }} {{ currency }}</span>
    </div>
</template>

<script>
import {mapState,mapGetters} from "vuex";

export default {
    name: 'room-jobs-sum',
    props: {
    },
    inject: ['room_id'],
    data(){
        return{
        }
    },
    methods:{
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),
        ...mapGetters({
        }),
        sum(){
            return this.$store.getters['roomJob/sumByRoomId'](this.room_id)
        }
    },
    mounted() {
    },
    watch:{
    }
}
</script>

<style scoped>
</style>
