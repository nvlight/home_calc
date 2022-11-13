<template>
    <div>
        <div class="mt-2 font-semibold">Уже добавленные материалы</div>

        <div v-for="room_material in room_materials"
             :key="room_material.id"
        >
            <div class="flex justify-between items-center">
                <div>
                    <div>
                      <span class="ml-1">room_id: </span> <span class="font-semibold ml-1">{{room_material.id}},</span>
                    </div>
                    <div>
                      <span class="ml-1">material_id: </span> <span class="font-semibold ml-1">{{room_material.material_id}},</span>
                    </div>
                    <div>
                        <span>title - его нет, т.е. ничего не понятно будет!</span>
                    </div>
                    <div>
                      <span class="ml-1">amount: </span> <span class="font-semibold ml-1">{{room_material.amount}},</span>
                    </div>
                    <div>
                      <span class="ml-1">sum: </span> <span class="font-semibold ml-1">{{room_material.sum}} {{currency}}</span>
                    </div>
                </div>

                <div>
                    <mg-trash-icon-button @click="delRoomMaterial(room_material.id)"></mg-trash-icon-button>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'room-material-list',
    props: {
        room_materials: {
            type: Array,
            required: true,
        }
    },
    methods:{
        ...mapActions({
            delRoomMaterial: 'roomMaterial/delRoomMaterial',
        }),
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
        }),
    },
}
</script>

<style scoped>

</style>
