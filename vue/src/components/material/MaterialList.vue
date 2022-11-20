<template>
    <div>
        <h1 class="font-semibold text-2xl">{{ title }}</h1>
<!--        <div>materials: {{materials}}</div>-->

        <div v-for="material in materials"
            :key="material.id"
        >
            <material-item :material="material" :show_title="false"></material-item>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import MaterialItem from "./MaterialItem.vue";

export default {
    name: 'material-list',
    components: {
        MaterialItem,
    },
    props: {
        'materials': {
            type: Array,
            required: true,
        },
        'title':{
            type: String,
            required: true,
        }
    },
    data(){
        return {
        }
    },
    methods:{
    },
    computed:{
    },
}
</script>

<style scoped>

</style>
