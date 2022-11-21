<template>
    <div class="mt-3 text-xl text-center">
        <span>Стоимость работ: </span>
        <span class="font-semibold ">{{ $store.getters['roomJob/sumByRoomId'](room_id) }} {{ $store.state.currency }}</span>
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
        }),
        ...mapGetters({
            //sumByRoomId: 'roomJob/sumByRoomId',
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
