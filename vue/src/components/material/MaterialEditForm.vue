<template>
    <form @submit.prevent>
        <div class="flex justify-between items-center">
            <h3 class="text-2xl">Редактирование материала</h3>
            <mg-close-icon-button @click="$emit('editFormClosedBtnPressed')"></mg-close-icon-button>
        </div>

        <mg-input-labeled class="mt-3 block" v-model="currentMaterial.title">Название</mg-input-labeled>
        <div class="flex justify-between mt-2">
            <mg-input-labeled v-model="currentMaterial.price">Цена</mg-input-labeled>
            <mg-input-labeled v-model="currentMaterial.unit">Ед.измерения</mg-input-labeled>
        </div>
        <mg-textarea v-model="currentMaterial.description">Описание</mg-textarea>

        <mg-button @click="editMaterial">обновить</mg-button>
    </form>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'material-edit-form',
    components: {},
    emits: ['editFormClosedBtnPressed'],
    data(){
        return {
        }
    },

    methods: {
        editMaterial(){
            this.$store.dispatch('material/editMaterial', this.material);
        },

    },
    computed: {
        ...mapGetters({
            getMaterialById: "material/getMaterialById",
            currentEditMaterialId: "material/getCurrentEditMaterialId",
        }),

        currentMaterial(){
            const currEditMattId = this.currentEditMaterialId;
            const currEditMatt   = this.getMaterialById(currEditMattId);
            return Object.assign({}, currEditMatt);
        }
    },
    mounted() {
    },
    watch:{
    }

}
</script>

<style scoped>
</style>
