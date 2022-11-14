<template>
    <div v-if="roomMaterialsSum" class="mt-3 text-xl text-center">
        <span>Стоимость материалов: </span>
        <span class="font-semibold ">{{ roomMaterialsSum }}&nbsp;{{ currency }}</span>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
    name: "room-materials-sum",
    data(){
        return {
            roomMaterialsSum: 0,
        }
    },
    props: {
        room_id: {
            type: Number,
            required: true,
        },
    },
    methods: {
        ...mapActions({
        }),
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),
    },
    watch:{
        roomMaterials: {
            handler(newValue, oldValue){
                //console.log('newValue:', newValue);
                //console.log('oldValue:', oldValue);

                this.roomMaterialsSum = 0;
                this.roomMaterials.forEach( t => {
                    if (t.room_id === this.room_id){
                        this.roomMaterialsSum += t.sum;
                    }
                });
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
</style>
