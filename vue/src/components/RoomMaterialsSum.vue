<template>
    <div class="mt-3 text-xl text-center">
        <span>Стоимость материалов: </span>
        <span class="font-semibold ">{{ sumByRoomId(room_id) }}&nbsp;{{ currency }} </span>
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
            currency: state => state.currency,
        }),
        ...mapGetters({
            sumByRoomId: 'roomMaterial/sumByRoomId'
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
