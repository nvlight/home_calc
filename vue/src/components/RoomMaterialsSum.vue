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
    props: {
        room_id: {
            type: Number,
            required: true,
        },
    },
    data(){
        return {
            roomMaterialsSum: 0,
        }
    },
    methods: {
        ...mapActions({
        }),
        calcMaterialsSum(){
            this.roomMaterialsSum = 0;
            this.roomMaterials.forEach( t => {
                if (t.room_id === this.room_id){
                    this.roomMaterialsSum += t.sum;
                }
            });
        },
    },
    computed: {
        ...mapState({
            currency: state => state.currency,
            roomMaterials: state => state.roomMaterial.roomMaterials,
        }),
    },
    mounted() {
        this.calcMaterialsSum();
    },
    watch:{
        roomMaterials: {
            handler(newValue, oldValue){
                this.calcMaterialsSum();
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
</style>
