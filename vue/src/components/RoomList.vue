<template>
    <div v-for="(room) in rooms" class="max-w-2xl px-2 py-3">
        <div class="border-4 border-dashed border-gray-200 rounded-lg" >
            <div class="px-2 py-2">
                <room-item :number="room.id" :room="room" :key="room.id"
                    @addWindow="addWindowHandler"
                    @deleteWindow="deleteWindowHandler"
                    @addDoor="addDoorHandler"
                    @deleteDoor="deleteDoorHandler"></room-item>
            </div>
        </div>
    </div>
</template>

<script>
import roomItem from "./RoomItem.vue";
import {mapState, mapActions} from "vuex";

export default {
    name: "room-list",
    components: {
        roomItem,
    },
    data(){
        return {
        }
    },
    methods:{
        ...mapActions({
            loadRooms: 'room/getRooms',
        }),

        // интересно, но окна добавляются для всех комнат
        addWindowHandler(res){
            const room = this.rooms.filter(
                t => t.id == res.room_id
            );

            res.windows_add.id = room[0].windows.length + 1;

            const newWindow = res.windows_add;

            const cloneWindow = Object.assign({}, newWindow);
            room[0].windows.push(cloneWindow);
        },
        addDoorHandler(res) {
            const room = this.rooms.filter(
                t => t.id == res.room_id
            );

            res.doors_add.id = room[0].doors.length + 1;

            const newDoor = res.doors_add;

            const cloneDoor = Object.assign({}, newDoor);
            room[0].doors.push(cloneDoor);
        },

        deleteWindowHandler(res) {
            const room = this.rooms.filter(
                t => t.id == res.room_id
            );

            room[0].windows = room[0].windows.filter(
                t => t.id != res.del_id
            );
        },
        deleteDoorHandler(res){
            const room = this.rooms.filter(
                t => t.id == res.room_id
            );

            room[0].doors = room[0].doors.filter(
                t => t.id != res.del_id
            );
        },
    },
    computed:{
        ...mapState({
            rooms: state => state.room.rooms,
        }),
    },
    mounted() {
        this.loadRooms();
    }
}
</script>

<style scoped>

</style>
