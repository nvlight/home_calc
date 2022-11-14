<template>
    <form @submit.prevent>
        <h3 class="">Создание нового материала</h3>
        <mg-input-labeled v-model="material.title">title</mg-input-labeled>
        <mg-input-labeled v-model="material.price">price</mg-input-labeled>
        <mg-input-labeled v-model="material.unit">unit</mg-input-labeled>
        <mg-input-labeled v-model="material.description">description</mg-input-labeled>

        <mg-button @click="createMaterial">создать</mg-button>
    </form>
</template>

<script>
export default {
    name: 'material-form',
    components: {},
    data(){
        return {
            material:{
                title: '',
                price: 0,
                unit: 'шт',
                description: '',
            },
        }
    },

    methods: {
        createMaterial(){
            this.$store.dispatch('material/createMaterial', this.material);
        }
    },
    computed: {

    },

}
</script>

<style scoped>

</style>
