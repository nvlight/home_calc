<template>
    <div class="baseboards_wrapper">
        <label>
            <input type="checkbox"
                   :value="is_showing"
                   @change="is_showing = !is_showing"
            >
            <span class="pl-1">Показать плинтуса</span>
        </label>

        <div class="flex" v-if="is_showing">
            <mg-input-labeled class="ml-1" v-model="room.internalCorners">внутр. углы</mg-input-labeled>
            <mg-input-labeled class="ml-1" v-model="room.outerCorners">внешн. углы</mg-input-labeled>
            <mg-input-labeled class="ml-1" v-model="room.connectors">соединители</mg-input-labeled>
            <mg-input-labeled class="ml-1" v-model="room.stubs">заглушки</mg-input-labeled>
        </div>
    </div>
</template>

<script>
export default {
    name: 'room-baseboards',
    props: {
        room: {
            type: Object,
            required: true,
        },
    },
    data(){
        return{
            is_showing: false,
        }
    },
}
</script>

<style scoped>

</style>
