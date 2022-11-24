<template>
    <div class="max-w-md w-full m-auto">
        <h1 class="mt-3 font-semibold text-xl text-center">Добавление материалов к комнате</h1>

        <div>
            <mg-input-labeled v-model="searchMaterialQuery">фильтр материалов</mg-input-labeled>
        </div>

        <div class="pt-1">
            <div class="">
<!--                <div>{{this.selectedMaterial}}</div>-->
<!--                <div>{{+this.selectedMaterial[0]}}</div>-->

                <label for="material_name" class="text-sm text-center font-medium text-gray-700">Наименование
                </label>

                <select v-model="selectedMaterial"
                    multiple
                    @change="changeMaterPrice"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500
                        block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
<!--                    <option value="0">Выберите из списка</option>-->
                    <option
                        v-for="option in filteredMaterials"
                        :key="option.id"
                        :value="option.id"
                    >
                        {{option.title}}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex justify-between items-center">
            <div class="mt-2">

<!--                <div class="font-semibold">{{ materialPrice }} {{ currency }}</div>-->
                <div class="flex items-center">
                    <mg-input-labeled v-model="materPrice">Цена материала:</mg-input-labeled>
                    <div class="font-semibold ml-1">
                        {{ currency }}
                    </div>
                </div>
                <div class="text-gray-600 cursor-pointer text-sm hover:text-red-500"
                     @click="resetMaterPrice">установить цену по умолчанию</div>
            </div>

            <div class="mt-1">
                <mg-input-labeled v-model="amount">Количество материала</mg-input-labeled>
            </div>
        </div>

<!--        <div class="mt-2">-->
<!--            <div class="font-semibold">Объект материала:</div>-->
<!--            <div>{{ roomMaterial }}</div>-->
<!--        </div>-->

        <div class="mt-1">
            Сумма:<span class="ml-2 font-semibold">{{ sum }} {{ currency }}</span>
        </div>

        <mg-button @click="create">Добавить материал</mg-button>

    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";

export default {
    name: "room-material-form",
    components: {},
    props: {
        // room_id: {
        //     type: Number,
        // },
    },
    inject: ['room_id'],
    data() {
        return {
            selectedMaterial: [],
            amount: 1,

            searchMaterialQuery: '',

            materPrice: 0,
        }
    },
    methods:{
        ...mapActions({
            createRoomMaterial: "roomMaterial/createRoomMaterial",
        }),

        create(){
            this.createRoomMaterial(this.roomMaterial);
        },

        changeMaterPrice(){
            this.materPrice = this.materialPrice;
        },

        resetMaterPrice(){
            this.materPrice = this.materialPrice;
        },
    },
    computed: {
        ...mapState({
            materials: state => state.material.materials,
            currency: state => state.currency,
        }),
        ...mapGetters({
        }),

        filteredMaterials(){
            return this.materials.filter(t =>
                t.title.toLowerCase().includes(this.searchMaterialQuery.toLowerCase()) )
        },

        materialPrice(){
            const find = this.materials.filter( t => t.id === +this.selectedMaterial[0])
            if (!find.length){
                return 0;
            }
            return find[0].price;
        },

        sum(){
            return this.materPrice * this.amount;
            return this.materialPrice * this.amount;
        },

        roomMaterial(){
            const room_id     = this.room_id;
            const material_id = this.selectedMaterial[0];
            const amount      = this.amount;
            const sum         = this.sum;

            let result = {room_id, material_id, amount, sum, }

            return result;
        },
    },

    mounted() {
        this.changeMaterPrice();
    }
}

</script>

<style scoped>
</style>
