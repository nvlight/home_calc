<template>
    <div class="doors_wrapper border-b border-gray-500 pb-1"
         v-if="is_doors_showing">
        <div class="flex">
            <mg-input-labeled v-model="door_tmp.length" class="mr-2">Длина</mg-input-labeled>
            <mg-input-labeled v-model="door_tmp.height" class="mr-2">Высота</mg-input-labeled>
            <mg-input-labeled v-model="door_tmp.width" class="mr-2">Ширина (проем)</mg-input-labeled>
        </div>

        <room-door-list :room="room" @del="del" class="mt-3"></room-door-list>

        <mg-button @click="add" class="mt-3">Добавить дверь</mg-button>
    </div>
</template>

<script>
import RoomDoorList from "./RoomDoorList.vue";

export default {
    name: 'room-door',
    components: { RoomDoorList },

    props: {
        is_doors_showing: {
            type: Boolean,
            default: false,
        },
        room: {
            type: Object,
            required: true,
        },
    },
    emits:['del'],
    inject: ['room_id'],
    data(){
        return {
            door_tmp:{
                length: 0.8,
                height: 2.1,
                width: 0.3,
            },
            door_count: 0,
        }
    },
    methods: {
        add(){
            if (!this.door_tmp.height || !this.door_tmp.length || !this.door_tmp.width){
                alert('Параметры дверы не должны быть пустыми!');
                return;
            }
            this.door_tmp.id = ++this.door_count;

            const cloneDoor = Object.assign({}, this.door_tmp);
            this.room.doors.push(cloneDoor);
        },
        del(del_id){
            this.room.doors = this.room.doors.filter(
                t => t.id != del_id
            );
            //this.door_count--;
        },
    },

    mounted() {
        this.door_count = this.room.doors.length;
    }
}
</script>

<style scoped>

</style>
