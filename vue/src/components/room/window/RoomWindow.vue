<template>
    <div class="windows_wrapper">
        <label>
            <input type="checkbox"
                   :value="is_showing"
                   @change="is_showing = !is_showing"
            >
            <span class="pl-1">Показать окна</span>
        </label>

        <div v-if="is_showing">
            <div class="flex">
                <mg-input-labeled v-model="windows_tmp.length" class="mr-2">Длина</mg-input-labeled>
                <mg-input-labeled v-model="windows_tmp.height" class="mr-2">Высота</mg-input-labeled>
                <mg-input-labeled v-model="windows_tmp.width" class="mr-2">Ширина (проем)</mg-input-labeled>
            </div>

            <room-window-list :room="room" @del="del" class="mt-3"></room-window-list>

            <mg-button @click="add" class="mt-3">Добавить окно</mg-button>
        </div>
    </div>
</template>

<script>
import RoomWindowList from "./RoomWindowList.vue";

export default {
    name: 'room-window',
    components: { RoomWindowList },

    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    emits:['del'],
    inject: ['room_id'],
    data(){
        return {
            windows_tmp:{
                length: 0.8,
                height: 2.1,
                width: 0.3,
            },
            windows_count: 0,

            is_showing: false,
        }
    },
    methods: {
        add(){
            if (!this.windows_tmp.height || !this.windows_tmp.length || !this.windows_tmp.width){
                alert('Параметры окна не должны быть пустыми!');
                return;
            }
            this.windows_tmp.id = ++this.windows_count;

            const cloneDoor = Object.assign({}, this.windows_tmp);
            this.room.windows.push(cloneDoor);
        },
        del(del_id){
            this.room.windows = this.room.windows.filter(
                t => t.id != del_id
            );
        },
    },

    mounted() {
        this.windows_count = this.room.windows.length;
    }
}
</script>

<style scoped>

</style>
