<template>
    <div class="min-h-full">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900"
                >Materials</h1>
            </div>
        </header>

        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="flex">

                <div class="w-4/12 ">
                    <material-edit-form v-show="editFormShow" class="border border p-3"
                                        @editFormClosedBtnPressed="editFormShow = false"
                    ></material-edit-form>
                    <material-create-form v-show="!editFormShow" class="border border p-3" ></material-create-form>
                </div>

                <material-list class="w-8/12 w-full ml-5 border border-dotted border p-3"
                               :materials="materials"
                               :title="'Список материалов'"
                               @editBtnClicked="editFormShow = true"
                ></material-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import store from "../store/index.js";
import router from "../router/index.js";
import MaterialList from "../components/material/MaterialList.vue";
import MaterialCreateForm from "../components/material/MaterialCreateForm.vue";
import MaterialEditForm from "../components/material/MaterialEditForm.vue";
import MainLink from "../components/nav/MainLink.vue";

export default {
    name: 'materials',
    components: {
        MaterialList,MaterialCreateForm, MaterialEditForm, MainLink,
    },
    data(){
        return {
            editFormShow: false,
        }
    },
    methods:{
        ...mapActions({
            loadMaterials: 'material/loadMaterials',
        }),
    },
    computed:{
        ...mapState({
            materials: state => state.material.materials,
        }),
    },
    mounted() {
        this.loadMaterials();
    },
}
</script>

<style scoped>

</style>
