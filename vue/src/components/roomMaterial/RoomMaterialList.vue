<template>
    <div>
        <div class="font-semibold text-xl text-center">Добавленные материалы:</div>

<!--        <div>storeRoomMaterials: {{roomMaterials}}</div>-->
<!--        <div>roomMaterialsClone: {{roomMaterialsClone}}</div>-->

        <template v-if="!room_materials.length">
            <div class="mt-2 text-center">Список материалов пуст</div>
        </template>
        <template v-else>
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
            //roomMaterialsClone: [],
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
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),
    },

    mounted() {
        //console.log('mounted again!');
        this.room_materials = this.roomMaterials;
    },

    watch:{
        roomMaterials:{
            handler(nv, ov){
                //console.log('roomMaterials changed');
                this.room_materials = [];
                this.roomMaterials.forEach( t => {
                    if (t.room_id === +this.room_id){
                        this.room_materials.push(t);
                    }
                })
            },
            // handler(nv, ov){
            //     console.log('roomMaterials changed');
            //     const tmp = this.roomMaterials
            //         .filter(t => t.room_id === this.room_id )
            //     this.roomMaterialsClone = Object.assign(tmp, {});
            // },
            // deep: true,
        }
    }
}
</script>

<style scoped>

</style>
