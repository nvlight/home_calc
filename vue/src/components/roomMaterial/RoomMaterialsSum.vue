<template>
    <div v-if="sum" class="mt-3 text-xl text-center">
        <span>Стоимость материалов: </span>
        <span class="font-semibold ">{{ sum }} {{ currency }}</span>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex"

export default {
    name: "room-materials-sum",
    props: {
    },
    inject:['room_id'],
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
        }),
        sum(){
            return this.$store.getters['roomMaterial/sumByRoomId'](this.room_id);
        },
    },
    mounted() {
    },
    watch:{
    },
}
</script>

<style scoped>
</style>
