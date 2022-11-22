<template>
    <div class="pt-4 pb-4 px-2">
        <div class="max-w-md max-h-72 overflow-y-scroll">
            <div class="font-semibold text-xl text-center">Добавленные материалы:</div>
            <!--        <div>storeRoomMaterials.length: {{roomMaterials.length}}</div>-->

            <template v-if="!filteredRoomMaterials.length">
                <div class="mt-2 text-center">Список пуст</div>
            </template>
            <template v-else>
                <div v-for="(room_material, index) in filteredRoomMaterials"
                     :key="room_material.id"
                     class=""
                >
                    <div class="flex mt-2 justify-between">
                        <div class="w-full">
                            <div>
                                <span>{{ room_material.id }}. {{ room_material.title }}</span>
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
        </div>

        <room-materials-sum></room-materials-sum>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import RoomMaterialsSum from "./RoomMaterialsSum.vue";

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
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),

        filteredRoomMaterials() {
            //console.log('function: sortedAndFilteredRoomMaterials');
            return this.roomMaterials.filter(t =>
                t.room_id === +this.room_id
            );
        },

        // эта штука не работает только с полями из строк, т.к. у них есть функция localoCompare
        sortedRoomMaterials() {
            //console.log('function: sortedRoomMaterials');
            return [...this.roomMaterials].sort(
                (t1, t2) => t1['title']?.localeCompare( t2['title'] )
            );
        },
    },

    mounted() {
        //console.log('mounted again!');
        //console.log(this.sortedRoomMaterials);
        //this.filterRoomMaterials();
    },

    watch: {
        roomMaterials: {
            handler(nv, ov) {
                //console.log('watch: roomMaterials changed');
                //this.filterRoomMaterials();
            },
            deep: true,
        }
    }
}
</script>

<style scoped>

</style>
