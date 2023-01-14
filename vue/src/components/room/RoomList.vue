<template>
    <div v-for="(room) in rooms" class="max-w-md px-2 py-3">
        <div class="border-4 border-dashed border-gray-200 rounded-lg" >
            <room-item :room="room">
            </room-item>
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
            loadRoomJobs: 'roomJob/getRoomJobs',
            loadMaterials: 'material/loadMaterials',
            loadRoomMaterials: 'roomMaterial/loadRoomMaterials',
            clearRooms: 'room/clearRooms',
        }),

    },
    computed:{
        ...mapState({
            rooms: state => state.room.rooms,
            //roomLoading: state => state.room.loading,
        }),
    },
    watch:{
    },
    mounted() {
        this.loadRooms();
        this.loadRoomJobs();
        this.loadMaterials();
        this.loadRoomMaterials();
    }
}
</script>

<style scoped>

</style>
