<template>
    <div class="material-item border-b border-l-cyan-600">
        <div class="flex mt-2">
            <mg-trash-icon-button @click="$store.dispatch('material/delMaterial', material.id)"></mg-trash-icon-button>
            <span class="font-light">[{{material.id}}]</span>
            <span class="ml-1 cursor-pointer title" @click="showHideDescription">{{material.title}}; </span>
            <div>
                <span class="font-medium pl-1">[{{material.price}} {{$store.state.currency}}</span>
                <span>/{{material.unit}}]</span>
            </div>
        </div>
        <div class="description" v-if="show">{{ material.description }}</div>
    </div>
</template>

<script>
export default {
    name: 'material-item',
    props: {
        material: {
            type: Object,
            required: true,
        },
        show_title: {
            type: Boolean,
            required: true,
        }
    },
    data(){
        return {
            show: false,
        }
    },
    methods:{
        showHideDescription(){
            this.show = !this.show;
        }
    },
    computed:{

    },
    mounted() {
        this.show = this.show_title;
    }
}
</script>

<style scoped>

</style>
