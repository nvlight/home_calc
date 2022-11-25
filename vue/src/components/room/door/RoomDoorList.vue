<template>
    <div v-if="room.doors.length" class="mt-3">
        <div v-for="(door, index) in room.doors"
             class="flex items-center justify-between">

            <room-door-item :door="room.doors" :num="index"></room-door-item>
            <div>
                <mg-trash-icon-button @click="$emit('del', door.id)"></mg-trash-icon-button>
            </div>
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
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>

</style>
