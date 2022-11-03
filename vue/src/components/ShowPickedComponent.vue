<template>
    <div v-if="currentPickedJob == 1">
        <CeilingCalc
            :roomSizes="room.sizes"
            :currentRoom="room"
            :currentPickedJob="currentPickedJob">
        </CeilingCalc>
    </div>
    <div v-else-if="currentPickedJob == 10">
        <LaminateCalc
            :currentPickedJob="currentPickedJob"
            :room="room">
        </LaminateCalc>
    </div>
    <div v-else-if="currentPickedJob == 13">
        <DoorstepCalc
            :room="room"
            :currentPickedJob="currentPickedJob"
        ></DoorstepCalc>
    </div>
    <div v-else-if="currentPickedJob == 12">
        <baseboards-calc
            :currentPickedJob="currentPickedJob"
            :room="room">
        </baseboards-calc>
    </div>

    <div v-else-if="currentPickedJob == 7">
        <wallpaper-calc
            :currentPickedJob="currentPickedJob"
            :room="room">
        </wallpaper-calc>
    </div>

    <div v-else-if="currentPickedJob == 6">
        <ceilingpaper-calc
            :currentPickedJob="currentPickedJob"
            :room="room">
        </ceilingpaper-calc>
    </div>

    <div v-else-if="currentPickedJob == 4">
        <putty-ceiling-calc :room="room"></putty-ceiling-calc>
    </div>

    <div v-else-if="currentPickedJob == 5">
        <putty-walls-calc :room="room"></putty-walls-calc>
    </div>

    <div v-else-if="currentPickedJob == 2">
        <cornice-calc :defaultPerimeter="room.perimeter"
          :room="room"
        ></cornice-calc>
    </div>

</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import CeilingCalc from "./CeilingCalc.vue";
import LaminateCalc from "./LaminateCalc.vue";
import DoorstepCalc from "./DoorstepCalc.vue";
import BaseboardsCalc from "./BaseboardsCalc.vue";
import WallpaperCalc from "./WallpaperCalc.vue";
import CeilingpaperCalc from "./CeilingpaperCalc.vue";
import PuttyCeilingCalc from "./PuttyCeilingCalc.vue";
import PuttyWallsCalc from "./PuttyWallsCalc.vue";
import CorniceCalc from "./CorniceCalc.vue";

export default {
    name: "show-picked-component",
    components: { CeilingCalc, LaminateCalc, DoorstepCalc, BaseboardsCalc, WallpaperCalc, CeilingpaperCalc,
        PuttyCeilingCalc, PuttyWallsCalc, CorniceCalc,
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
