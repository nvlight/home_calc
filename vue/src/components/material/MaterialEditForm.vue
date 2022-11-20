<template>
    <form @submit.prevent>
        <div class="flex justify-between items-center">
            <h3 class="text-2xl">Редактирование материала</h3>
            <mg-close-icon-button @click="$emit('editFormClosedBtnPressed')"></mg-close-icon-button>
        </div>

        <mg-input-labeled class="mt-3 block" v-model="material.title">Название</mg-input-labeled>
        <div class="flex justify-between mt-2">
            <mg-input-labeled v-model="material.price">Цена</mg-input-labeled>
            <mg-input-labeled v-model="material.unit">Ед.измерения</mg-input-labeled>
        </div>
        <mg-textarea v-model="material.description">Описание</mg-textarea>

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
            defaultMaterial: {
                title: 'Название',
                price: 0,
                unit: 'шт',
                description: '',
            },

            material: {},
        }
    },

    methods: {
        editMaterial(){
            this.$store.dispatch('material/editMaterial', this.material);
        },
        resetMaterialForm(){
            this.material = Object.assign({}, this.defaultMaterial);
        },
    },
    computed: {
        ...mapGetters({
            currentEditMaterial: "material/getCurrentEditMaterial",
        }),
    },
    mounted() {
        this.resetMaterialForm();
    },
    watch:{
        currentEditMaterial:{
            handler(nv, ov){
                this.material = Object.assign({}, this.currentEditMaterial);
            },
            deep: true,
        },
    }

}
</script>

<style scoped>

</style>
