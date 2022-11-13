<template>
    <div>
        <h1 class="font-semibold text-2xl">{{ title }}</h1>
<!--        <div>materials: {{materials}}</div>-->

        <div v-for="material in materials"
            :key="material.id"
        >
            <div class="flex">
                <mg-trash-icon-button @click="delMaterial(material.id)"></mg-trash-icon-button>
                <span>{{material.id}}</span>
                <span class="ml-1">{{material.title}}; </span>
                <span class="font-semibold pl-1">{{material.price}} {{currency}}</span>
                <span>/{{material.unit}}</span>
            </div>
            <hr>
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
        ...mapActions({
            delMaterial: 'material/delMaterial',
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
