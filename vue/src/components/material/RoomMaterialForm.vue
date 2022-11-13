<template>
    <div class="max-w-md w-full m-auto">
        <h1 class="mt-3 font-semibold text-2xl text-center">Добавление материалов</h1>
        <div class="pt-1">
            <div class="">
                <label for="material_name" class="text-sm text-center font-medium text-gray-700">Наименование
                </label>

                <select v-model="selectedMaterial"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500
                            block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                    <option value="0">Выберите из списка</option>
                    <option
                        v-for="option in materials"
                        :key="option.id"
                        :value="option.id"
                    >
                        {{option.title}}
                    </option>
                </select>
            </div>
        </div>

        <div v-if="this.$store.state.debug" class="border-dotted border-2 p-3 border-red-400 mt-2">
            selectedMaterial <strong>{{selectedMaterial}}</strong>
        </div>

        <div class="mt-2">Cтоимость материала / единица:
            <span class="font-semibold">{{ materialPrice }} {{ currency }}</span>
        </div>

        <div class="mt-2" >
            <mg-input-labeled v-model="amount">Количество материала</mg-input-labeled>
        </div>

        <div class="mt-2">
            <div>roomMaterial:</div>
            <div>{{ roomMaterial }}</div>
        </div>

        <div class="mt-2">
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
        room_id: {
            type: Number,
        },
    },
    data() {
        return {
            selectedMaterial: "1",
            amount: 0,
        }
    },
    methods:{
        ...mapActions({
            createRoomMaterial: "roomMaterial/createRoomMaterial",
        }),

        create(){
            console.log('create');
            this.createRoomMaterial(this.roomMaterial);
        }
    },
    computed: {
        ...mapState({
            materials: state => state.material.materials,
            //roomMaterials: state => state.roomMaterial.roomMaterials,
            currency: state => state.currency,
        }),
        ...mapGetters({
            roomMaterials: "roomMaterial/roomMaterials",
        }),

        materialPrice(){
            const find = this.materials.filter( t => t.id === +this.selectedMaterial)
            if (!find.length){
                return 0;
            }
            return find[0].price;
        },

        sum(){
            return this.materialPrice * this.amount;
        },

        roomMaterial(){
            const room_id     = this.room_id;
            const material_id = this.selectedMaterial;
            const amount      = this.amount;
            const sum         = this.sum;

            let result = {room_id, material_id, amount, sum, }

            return result;
        },
    },
}

</script>

<style scoped>
</style>
