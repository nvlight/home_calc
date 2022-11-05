<template>
    <div v-for="(room,key) in rooms" class="max-w-2xl px-2 py-3">
        <div class="border-4 border-dashed border-gray-200 rounded-lg" >
            <div class="px-2 py-2">
                <room-item :number="key" :room="room" :key="room.id"
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
export default {
    name: "room-list",
    components: {
        roomItem,
    },
    data(){
        return {
            rooms: [],
        }
    },
    methods:{
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
    mounted() {
        this.rooms = [
            {
                id: 1,
                sizes : {
                    s1: 4,
                    s2: 5,
                    s3: 4,
                    s4: 5,
                },
                height: 2.4,

                windows: [
                    {
                        id: 1,
                        width: 0.4, // оконный проем
                        height: 0.9,
                        length: 0.8,
                    },
                ],
                is_windows_showing: false,

                doors: [
                    {
                        id: 1,
                        width: 0.3,
                        height: 2.2,
                        length: 0.8,
                    },
                ],
                is_doors_showing: false,

                internalCorners: 4,
                outerCorners: 2,
                connectors: 7, // соединение
                stubs: 2, // заглушка
            },
            {
                id: 2,
                sizes : {
                    s1: 5,
                    s2: 4,
                    s3: 0,
                    s4: 0,
                },
                height: 2.3,

                windows: [
                    {
                        id: 1,
                        width: 0.4, // оконный проем
                        height: 0.9,
                        length: 0.8,
                    },
                ],
                is_windows_showing: false,

                doors: [
                    {
                        id: 1,
                        width: 0.3,
                        height: 2.2,
                        length: 0.8,
                    },
                ],
                is_doors_showing: false,

                internalCorners: 4,
                outerCorners: 2,
                connectors: 7, // соединение
                stubs: 2, // заглушка
            },
        ];
    }
}
</script>

<style scoped>

</style>
