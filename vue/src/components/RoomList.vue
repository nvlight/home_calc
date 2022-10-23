<template>
    <div
        v-for="(room,key) in rooms"
        class="max-w-2xl px-2 py-3"
    >
        <div class="border-4 border-dashed border-gray-200 rounded-lg" >
            <div class="px-2 py-2">
                <room-item
                    :number="key"
                    :room="room"
                    :key="room.id"
                    @addWindow="addWindowHandler"
                    @deleteWindow="deleteWindowHandler"
                    @addDoor="addDoorHandler"
                    @deleteDoor="deleteDoorHandler"
                >
                </room-item>
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
            //console.log('addWindowHandler', res);

            const filtered = rooms.filter(
                t => t.id == res.room_id
            );
            //console.log('filtered:',filtered);

            filtered[0].windows_count++;
            const new_window_id = filtered[0].windows_count;
            //const new_window_id = 2;
            //console.log('new_window_id: ', new_window_id);
            res.windows_add.id = new_window_id;
            const new_windowadd = res.windows_add;

            const clone_new_windowadd = Object.assign({}, new_windowadd);
            //console.log('new_windowadd:', clone_new_windowadd);
            filtered[0].windows.push(clone_new_windowadd);

        },
        deleteWindowHandler(res) {
            console.log(res)
            const filtered = this.rooms.filter(
                t => t.id == res.room_id
            );
            return;
            //console.log('filtered:',filtered);
            //console.log('del_id:',res.del_id);

            filtered[0].windows = filtered[0].windows.filter(
                t => t.id != res.del_id
            );
        },

        addDoorHandler(res) {
            console.log(res);
            return;
            const filtered = this.rooms.filter(
                t => t.id == res.room_id
            );

            filtered[0].doors_count++;
            const new_door_id = filtered[0].doors_count;

            res.doors_add.id = new_door_id;
            const new_door_add = res.doors_add;

            const clone_new_new_door_add = Object.assign({}, new_door_add);
            filtered[0].doors.push(clone_new_new_door_add);
        },
        deleteDoorHandler(res){
            const filtered = this.rooms.filter(
                t => t.id == res.room_id
            );

            filtered[0].doors = filtered[0].doors.filter(
                t => t.id != res.del_id
            );
        },
    },
    mounted() {
        this.rooms = [
            {
                id: 1,
                isSimpleSidesCounting: true,
                sizes : {
                    s1: 3.8,
                    s2: 3.8,
                    s3: 0,
                    s4: 0,
                },
                height: 2.3,
                perimeter: 0,
                square: {
                    ceiling: 0,
                    floor: 0,
                    walls: 0,
                },
                doorstep_count: 0, // пороги

                windows_count: 3,
                windows: [
                    {
                        id: 1,
                        width: 0.4, // оконный проем
                        height: 0.9,
                        length: 0.8,
                    },
                    {
                        id: 2,
                        width: 0.4, // оконный проем
                        height: 0.9,
                        length: 1.2,
                    },
                    {
                        id: 3,
                        width: 0.4, // оконный проем
                        height: 0.9,
                        length: 1,
                    },
                ],
                is_windows_showing: false,

                doors_count: 3,
                doors: [
                    {
                        id: 1,
                        width: 0.3,
                        height: 2.2,
                        length: 0.8,
                    },
                    {
                        id: 2,
                        width: 0.3,
                        height: 2,
                        length: 0.8,
                    },
                    {
                        id: 3,
                        width: 0.3, // дверной проем
                        height: 2.1,
                        length: 0.9,
                    },
                ],
                is_doors_showing: false,
            },
            // {
            //     id: 2,
            //     isSimpleSidesCounting: true,
            //     sizes : {
            //         s1: 3.8,
            //         s2: 3.1,
            //         s3: 0,
            //         s4: 0,
            //     },
            //     height: 2.3,
            //     perimeter: 0,
            //     square: {
            //         ceiling: 0,
            //         floor: 0,
            //         walls: 0,
            //     },
            //     doorstep_count: 0, // пороги
            // },
            // {
            //     id: 3,
            //     isSimpleSidesCounting: true,
            //     sizes : {
            //         s1: 3.8,
            //         s2: 3,
            //         s3: 0,
            //         s4: 0,
            //     },
            //     height: 2.3,
            //     perimeter: 0,
            //     square: {
            //         ceiling: 0,
            //         floor: 0,
            //         walls: 0,
            //     },
            //     doorstep_count: 0, // пороги
            // },
            // {
            //     id: 4,
            //     isSimpleSidesCounting: true,
            //     sizes : {
            //         s1: 3.9,
            //         s2: 2.5,
            //         s3: 0,
            //         s4: 0,
            //     },
            //     height: 2.3,
            //     perimeter: 0,
            //     square: {
            //         ceiling: 0,
            //         floor: 0,
            //         walls: 0,
            //     },
            //     doorstep_count: 0, // пороги
            // },
        ];
    }
}
</script>

<style scoped>

</style>
