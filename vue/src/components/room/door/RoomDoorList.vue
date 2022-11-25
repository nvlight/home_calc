<template>
    <div v-if="room.doors.length">
        <div v-for="(door, index) in room.doors">
            <room-door-item :door="door" :num="index" @del="del"></room-door-item>
        </div>
    </div>
    <div v-else="">
        <span class="font-light">Нет дверей</span>
    </div>
</template>

<script>
import RoomDoorItem from "./RoomDoorItem.vue";

export default {
    name: 'room-door-list',
    components: {RoomDoorItem},
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
