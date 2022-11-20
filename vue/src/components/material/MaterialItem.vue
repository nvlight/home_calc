<template>
    <div class="material-item border-b border-l-cyan-600">
        <div class="flex mt-2">
            <div class="flex items-center">
                <mg-show-icon-button @click="showHideDescription"></mg-show-icon-button>
                <mg-edit-icon-button @click="editMaterialHandler(material.id)"></mg-edit-icon-button>
                <mg-trash-icon-button @click="deleteMaterialHandler(material.id)"></mg-trash-icon-button>
            </div>
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
    components: {},
    emits: ['editBtnClicked'],
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
        },
        editMaterialHandler(id){
            this.$store.dispatch('material/setCurrentEditMaterial', id);
            this.$emit('editBtnClicked');
        },
        deleteMaterialHandler(id){
            if (!confirm('Действительно удалить материал?')) {return}
            this.$store.dispatch('material/delMaterial', id);
        },
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
