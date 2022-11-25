<template>
    <div class="doors_wrapper border-b border-gray-500 pb-1"
         v-if="is_doors_showing">
        <div class="flex">
            <mg-input-labeled v-model="doors_add.length" class="mr-2">Длина</mg-input-labeled>
            <mg-input-labeled v-model="doors_add.height" class="mr-2">Высота</mg-input-labeled>
            <mg-input-labeled v-model="doors_add.width" class="mr-2">Ширина (проем)</mg-input-labeled>
        </div>

        <room-door-list :room="room" @del="del"></room-door-list>

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
            doors_add:{
                length: 0.8,
                height: 2.1,
                width: 0.3,
            },
            door_count: 0,
        }
    },
    methods: {
        add(){
            if (!this.doors_add.height || !this.doors_add.length || !this.doors_add.width){
                alert('Параметры дверы не должны быть пустыми!');
                return;
            }
            this.door_count++;
            this.doors_add.id = this.door_count;
            console.log(this.doors_add.id);

            const newDoor =  {
                doors_add: this.doors_add,
                room_id: this.room_id,
            };

            const cloneDoor = Object.assign({}, newDoor);
            this.room.doors.push(cloneDoor);
        },
        del(del_id){
            const res = {
                del_id: del_id,
                room_id: this.room_id,
            };
            this.room.doors = this.room.doors.filter(
                t => t.id != res.del_id
            );
            this.door_count--;
        },
    },

    mounted() {
        this.door_count = this.room.doors.length;
    }
}
</script>

<style scoped>

</style>
