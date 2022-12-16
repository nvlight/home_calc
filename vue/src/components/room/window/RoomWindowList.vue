<template>
    <div v-if="room.windows.length">
        <div v-for="(window, index) in room.windows">
            <room-window-item :window="window" :num="index" @del="del"></room-window-item>
        </div>
    </div>
    <div v-else="">
        <span class="font-light">Нет дверей</span>
    </div>
</template>

<script>
import RoomWindowItem from "./RoomWindowItem.vue";

export default {
    name: 'room-door-list',
    components: {RoomWindowItem},
    emits: ['del'],
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    methods:{
        del(id){
            this.$emit('del', id)
        },
    },
}
</script>

<style scoped>

</style>
