<template>
    <div class="pt-4 pb-4 px-2">
        <div class="max-w-md">
            <div class="font-semibold text-xl text-center">Добавленные материалы:</div>
            <!--        <div>storeRoomMaterials.length: {{roomMaterials.length}}</div>-->

            <template v-if="!room_materials.length">
                <div class="mt-2 text-center">Список материалов пуст</div>
            </template>
            <template v-else>
                <div v-for="(room_material, index) in room_materials"
                     :key="room_material.id"
                >
                    <div class="flex mt-2 justify-between">
                        <div class="w-full">
                            <div>
                                <span>{{ index + 1 }}. {{ room_material.title }}</span>
                            </div>
                            <div class="flex justify-between">
                                <div>
                                    <span class="">Количество: </span> <span
                                    class="font-semibold ml-1">{{ room_material.amount }}</span>
                                </div>
                                <div class="flex">
                                    <span class="">Сумма: </span> <span
                                    class="font-semibold ml-1">{{ room_material.sum }} {{ currency }}</span>
                                    <mg-trash-icon-button class="self-center justify-self-center"
                                                          @click="delRoomMaterial(room_material.id)"></mg-trash-icon-button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </template>

            <room-materials-sum :room_id="room_id"></room-materials-sum>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import RoomMaterialsSum from "../RoomMaterialsSum.vue";

export default {
    name: 'room-material-list',
    components: {RoomMaterialsSum},
    props: {
        room_id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            room_materials: [],
        }
    },
    methods: {
        ...mapActions({
            delRoomMaterial: 'roomMaterial/delRoomMaterial',
        }),

        filterRoomMaterials() {
            //console.log('function: filterRoomMaterials');
            this.room_materials = this.roomMaterials
                .filter(t => t.room_id === +this.room_id)
        }
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),
    },

    mounted() {
        //console.log('mounted again!');
        this.filterRoomMaterials();
    },

    watch: {
        roomMaterials: {
            handler(nv, ov) {
                //console.log('watch: roomMaterials changed');
                this.filterRoomMaterials();
            },
            deep: true,
        }
    }
}
</script>

<style scoped>

</style>
