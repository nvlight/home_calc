<template>
    <div class="mt-3 text-xl text-center">
        <span>Стоимость работ: </span>
        <span class="font-semibold ">{{ sumByRoomId(room_id) }}&nbsp;{{ currency }} </span>
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
        }
    },
    methods:{
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),
        ...mapGetters({
            sumByRoomId: 'roomJob/sumByRoomId',
        }),

    },
    mounted() {
    },
    watch:{

    }
}
</script>

<style scoped>
</style>
