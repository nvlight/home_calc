<template>
    <form @submit.prevent>
        <h3 class="text-2xl">Создание нового материала</h3>
        <mg-input-labeled class="mt-3 block" v-model="material.title">Название</mg-input-labeled>
        <div class="flex justify-between mt-2">
            <mg-input-labeled v-model="material.price">Цена</mg-input-labeled>
            <mg-input-labeled v-model="material.unit">Ед.измерения</mg-input-labeled>
        </div>
        <mg-textarea v-model="material.description">Описание</mg-textarea>

        <mg-button @click="createMaterial">создать</mg-button>
    </form>
</template>

<script>
export default {
    name: 'material-form',
    components: {},
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
        createMaterial(){
            this.$store.dispatch('material/createMaterial', this.material);
            this.resetMaterialForm();
        },
        resetMaterialForm(){
            this.material = Object.assign({}, this.defaultMaterial);
        }
    },
    computed: {

    },
    mounted() {
        this.resetMaterialForm();
    }

}
</script>

<style scoped>

</style>
