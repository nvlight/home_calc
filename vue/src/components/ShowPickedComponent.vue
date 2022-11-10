<template>
    <div v-if="currentPickedJob == 1">
        <CeilingCalc :room="room"></CeilingCalc>
    </div>
    <div v-else-if="currentPickedJob == 10">
        <LaminateCalc :room="room"></LaminateCalc>
    </div>
    <div v-else-if="currentPickedJob == 13">
        <DoorstepCalc :room="room"></DoorstepCalc>
    </div>
    <div v-else-if="currentPickedJob == 12">
        <baseboards-calc :room="room"></baseboards-calc>
    </div>
    <div v-else-if="currentPickedJob == 7">
        <wallpaper-calc :room="room"></wallpaper-calc>
    </div>
    <div v-else-if="currentPickedJob == 6">
        <ceilingpaper-calc :room="room"></ceilingpaper-calc>
    </div>
    <div v-else-if="currentPickedJob == 4">
        <putty-ceiling-calc :room="room"></putty-ceiling-calc>
    </div>
    <div v-else-if="currentPickedJob == 5">
        <putty-walls-calc :room="room"></putty-walls-calc>
    </div>
    <div v-else-if="currentPickedJob == 2">
        <cornice-calc :room="room"></cornice-calc>
    </div>
    <div v-else-if="currentPickedJob == 9">
        <drywall-calc :room="room"></drywall-calc>
    </div>
    <div v-else-if="currentPickedJob == 8">
        <drywall-ceiling-calc :room="room"></drywall-ceiling-calc>
    </div>
    <div v-else-if="currentPickedJob == 14">
        <tile-floor-calc :room="room"></tile-floor-calc>
    </div>
    <div v-else-if="currentPickedJob == 15">
        <tile-walls-calc :room="room"></tile-walls-calc>
    </div>

</template>

<script>
import CeilingCalc from "./calc/CeilingCalc.vue";
import LaminateCalc from "./calc/LaminateCalc.vue";
import DoorstepCalc from "./calc/DoorstepCalc.vue";
import BaseboardsCalc from "./calc/BaseboardsCalc.vue";
import WallpaperCalc from "./calc/WallpaperCalc.vue";
import CeilingpaperCalc from "./calc/CeilingpaperCalc.vue";
import PuttyCeilingCalc from "./calc/PuttyCeilingCalc.vue";
import PuttyWallsCalc from "./calc/PuttyWallsCalc.vue";
import CorniceCalc from "./calc/CorniceCalc.vue";
import DrywallCalc from "./calc/DrywallCalc.vue";
import DrywallCeilingCalc from "./calc/DrywallCeilingCalc.vue";
import TileFloorCalc from "./calc/TileFloorCalc.vue";
import TileWallsCalc from "./calc/TileWallsCalc.vue";

export default {
    name: "show-picked-component",
    components: { CeilingCalc, LaminateCalc, DoorstepCalc, BaseboardsCalc, WallpaperCalc, CeilingpaperCalc,
        PuttyCeilingCalc, PuttyWallsCalc, CorniceCalc, DrywallCalc, DrywallCeilingCalc, TileFloorCalc, TileWallsCalc,
    },
    props: {
        currentPickedJob: {
            type: Number,
            required: true,
        },
        room: {
            type: Object,
            required: true,
        }
    },
    methods:{
    },
    computed:{
    }
}
</script>

<style scoped>
</style>
