<template>
    <h1 class="mt-3 font-light  text-center">Добавление материалов</h1>
    <div class="min-h-full flex items-center justify-center pt-1 px-4 sm:px-6 lg:px-8">
        <div class="col-span-9 sm:col-span-3 w-full" style="">
            <label for="material_name" class="block text-sm font-medium text-gray-700">Наименование</label>
            <select
                v-if="buildingMaterials.length"
                v-model="currentPickedMaterial"
                id="material_name" name="material_name" autocomplete="material name"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                sm:text-sm mb-3"
            >
                <option :value="0" selected>Выберите материал</option>
                <option v-for="(material,index) in buildingMaterials"
                        :key="index"
                        :value="material.id"
                        class="text-1xl"
                    >{{material.id}}.  {{material.name}} - от {{material.price}}
                    <span class="font-semibold">₽</span>
                </option>
            </select>
            <div
                v-else
            >
                <strong>Список материалов пуст!</strong>
            </div>


        </div>
    </div>

    <div class="mb-3">
        currentPickedMaterial <strong>{{currentPickedMaterial}}</strong>
    </div>

    <button @click=""
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"/>
                </svg>
              </span>
        Добавить материал
    </button>
</template>

<script>
import store from "../store/index.js";

export default {
    name: "BuildingMaterial",
    props: [],
    data() {
        return {
            currentPickedMaterial: 0,
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
