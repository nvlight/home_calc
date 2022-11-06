<template>
    <div class="max-w-md w-full m-auto">
        <h1 class="mt-3 font-semibold text-2xl text-center">Добавление материалов</h1>
        <div class="pt-1">
            <div class="">
                <label for="material_name" class="text-sm text-center font-medium text-gray-700">Наименование
                </label>
                <mg-select
                    v-model="currentPickedMaterial"
                    :options="buildingMaterials">
                </mg-select>

            </div>
        </div>

        <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400 mt-2">
            currentPickedMaterial <strong>{{currentPickedMaterial}}</strong>
        </div>

        <mg-button class="">Добавить материал</mg-button>

    </div>
</template>

<script>
import store from "../store/index.js";

export default {
    name: "BuildingMaterial",
    components: {},

    props: [],
    data() {
        return {
            currentPickedMaterial: '0',
        }
    },
    computed: {
        buildingMaterials(){
            return store.state.buildingMaterials;
        }
    },
}

</script>

<style scoped>
</style>
