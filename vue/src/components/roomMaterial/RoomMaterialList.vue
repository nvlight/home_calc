<template>
    <div class="max-w-md">
        <div class="font-semibold text-xl text-center">Добавленные материалы:</div>
        <div>storeRoomMaterials.length: {{roomMaterials.length}}</div>

        <template v-if="!room_materials.length">
            <div class="mt-2 text-center">Список материалов пуст</div>
        </template>
        <template v-else>
            <div v-for="(room_material, index) in room_materials"
                 :key="room_material.id"
            >
                <div class="relative flex mt-2">
                    <div class="w-11/12 ">
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
        room_id: {
            type: Number,
            required: true,
        }
    },
    data(){
        return {
            room_materials: [],
        }
    },
    methods:{
        ...mapActions({
            delRoomMaterial: 'roomMaterial/delRoomMaterial',
        }),

        updateRoomMaterials(){
            //console.log('function: updateRoomMaterials');
            this.room_materials = this.roomMaterials
                .filter( t => t.room_id === +this.room_id )
        }
    },
    computed:{
        ...mapState({
            currency: state => state.currency,
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),
    },

    mounted() {
        //console.log('mounted again!');
        this.updateRoomMaterials();
    },

    watch:{
        roomMaterials:{
            handler(nv, ov){
                //console.log('watch: roomMaterials changed');
                this.updateRoomMaterials();
            },
            deep: true,
        }
    }
}
</script>

<style scoped>

</style>
