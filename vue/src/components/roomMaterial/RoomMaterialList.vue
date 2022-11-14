<template>
    <div>
        <div class="font-semibold text-xl text-center">Добавленные материалы:</div>

        <template v-if="room_materials.length">

            <div v-for="(room_material, index) in room_materials"
                 :key="room_material.id"
            >
                <div class="relative flex border-b-2 mt-2">
                    <div class="w-11/12 ">
    <!--                    <div>-->
    <!--                      <span class="ml-1">room_id: </span> <span class="font-semibold ml-1">{{room_material.id}},</span>-->
    <!--                    </div>-->
    <!--                    <div>-->
    <!--                      <span class="ml-1">material_id: </span> <span class="font-semibold ml-1">{{room_material.material_id}},</span>-->
    <!--                    </div>-->
                        <div>
                            <span>{{ index+1 }}. {{room_material.title}}</span>
                        </div>
                        <div class="flex justify-between">
                            <div>
                              <span class="">Количество: </span> <span class="font-semibold ml-1">{{room_material.amount}}</span>
                            </div>
                            <div>
                              <span class="">Сумма: </span> <span class="font-semibold ml-1">{{room_material.sum}} {{currency}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="w-1/12 flex justify-center">
                        <div class="flex ">
                            <mg-trash-icon-button class="self-center justify-self-center" @click="delRoomMaterial(room_material.id)"></mg-trash-icon-button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="mt-2">Список материалов пуст!</div>
        </template>

        <room-materials-sum :room_id="room_id"></room-materials-sum>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import RoomMaterialsSum from "../RoomMaterialsSum.vue";

export default {
    name: 'room-material-list',
    components: {RoomMaterialsSum},
    props: {
        room_materials: {
            type: Array,
            required: true,
        },
        room_id: {
            type: Number,
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
