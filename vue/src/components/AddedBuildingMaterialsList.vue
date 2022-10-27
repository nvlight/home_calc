<template>
    <div class="min-h-full flex items-center justify-start pt-4 pb-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-2">
            <h2 class="font-semibold text-xl text-center">Строительные материалы:</h2>

            <div v-if="!addedMaterials?.length">
                <span class="block text-center">Список пуст</span>
            </div>
            <div v-else>
                <div v-for="(material,index) in addedMaterials"
                     :key="index"
                     class="flex justify-between mt-2">{{index+1}}.&nbsp;
                    <div class="flex self-center">
                        <span>{{ material.name }}, вес/количество: <strong>{{ material.weight }}</strong>
                            [{{material.itemId}}] id: {{material.id}}
                        </span>
                        <span class="font-semibold">{{ material.price }} <strong>₽</strong></span>
                        <mg-trash-icon-button @click="deleteAddedMaterial(material.id)"></mg-trash-icon-button>
                    </div>
                </div>
                <!-- MaterialSumm -->
                <div class="mt-3">
                    <span class="text-2xl">Стоимость строительных материалов: {{materialsSum}}&nbsp;₽</span>
                </div>
                <!--/ MaterialSumm -->
            </div>

        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import MgTrashIconButton from "./UI/MgTrashIconButton.vue";

export default {
    name: "added-building-materials-list",
    components: {MgTrashIconButton},
    computed:{
        ...mapState({
            addedMaterials: state => state.materialsForBuy,
        }),
      ...mapGetters({

      }),
    },
}
</script>

<style scoped>

</style>
