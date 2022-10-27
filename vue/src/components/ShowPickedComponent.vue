<template>
    <h3>ShowPickedComponent</h3>

    <div v-if="currentPickedJob == 1">
        <CeilingCalc
            :roomSizes="room.sizes"
            :currentRoom="room"
            :currentPickedJob="currentPickedJob">
        </CeilingCalc>
    </div>
    <div v-else-if="currentPickedJob == 10">
        <LaminateCalc @addCalcedLaminate="addCalcedLaminateHandler" :room="room"></LaminateCalc>
    </div>
    <div v-else-if="currentPickedJob == 13">
        <DoorstepCalc @addCalcedDoorstep="addCalcedDoorstepHandler" :room="room"></DoorstepCalc>
    </div>
    <div v-else-if="currentPickedJob == 12">
        <baseboards-calc @addCalcedBaseboards="addCalcedBaseboardsHandler" :room="room"></baseboards-calc>
    </div>
    <div v-else-if="currentPickedJob == 14">
        <wallpaper-calc :room="room"></wallpaper-calc>
    </div>

    <div v-else-if="Boolean(currentPickedJob) !== false">
        <mg-grid-icon-button @click="addCalcedJob">Добавить</mg-grid-icon-button>
    </div>

</template>

<script>
import CeilingCalc from "./CeilingCalc.vue";
import LaminateCalc from "./LaminateCalc.vue";
import DoorstepCalc from "./DoorstepCalc.vue";
import BaseboardsCalc from "./BaseboardsCalc.vue";
import WallpaperCalc from "./WallpaperCalc.vue";

export default {
    name: "show-picked-component",
    components: { CeilingCalc, LaminateCalc, DoorstepCalc, BaseboardsCalc, WallpaperCalc},
    props: {
        currentPickedJob: {
            type: Number,
            required: true,
        },
        room: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>

</style>
