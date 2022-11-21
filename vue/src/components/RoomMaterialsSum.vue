<template>
    <div class="mt-3 text-xl text-center">
        <span>Стоимость материалов: </span>
        <span class="font-semibold ">{{ $store.getters['roomMaterial/sumByRoomId'](room_id) }} {{$store.state.currency}}</span>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex"

export default {
    name: "room-materials-sum",
    props: {
        room_id: {
            type: Number,
            required: true,
        },
    },
    data(){
        return {
        }
    },
    methods: {
        ...mapActions({
        }),
    },
    computed: {
        ...mapState({
        }),
        ...mapGetters({
            //sumByRoomId: 'roomMaterial/sumByRoomId'
        }),
    },
    mounted() {
    },
    watch:{
    },
}
</script>

<style scoped>
</style>
