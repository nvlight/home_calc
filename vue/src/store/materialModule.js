import axiosClient from "../axios.js";

export const materialModule = {
    state: {
        materials: [],
        currentEditMaterialId: 0,
    },
    getters: {
        getCurrentEditMaterial(state){
            const find = state.materials.filter(
                t => t.id === state.currentEditMaterialId
            );
            return find[0];
        },
    },
    actions: {
        loadMaterials({commit}){
            let response;
            response = axiosClient
                .get("/material")
                .then((res)=>{
                    //console.log(res.data)
                    if (res.data.success) {
                        commit('setMaterilas', res.data.data);
                        //res.data.forEach(t => commit('addMaterial', t))
                    }
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        createMaterial({dispatch}, material){
            return dispatch('createMaterialQuery', material);
        },

        createMaterialQuery({commit,dispatch}, material){
            let response;
            response = axiosClient
                .post("/material", material)
                .then((res)=>{
                    if (res.data.success) {
                        const materialClone = Object.assign({}, material);
                        materialClone.id = res.data.savedId;
                        dispatch('addMaterial', materialClone);
                    }
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        editMaterial({dispatch}, material){
            return dispatch('editMaterialQuery', material);
        },
        editMaterialQuery({commit}, material){
            let response;
            response = axiosClient
                .patch(`/material/${material.id}`, material)
                .then((res)=>{
                    if (res.data.success) {
                        commit('editMaterial', material);
                    }
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        addMaterial({commit}, material){
            return commit('addMaterial', material);
        },
        delMaterial({dispatch}, id){
            let response;
            response = axiosClient
                .delete(`/material/${id}`)
                .then((res)=>{
                    //console.log(res.data)
                    if (res.data.success){
                        dispatch('deleteMaterialHandler', id);
                    }

                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },
        deleteMaterialHandler({commit}, id){
            return commit('delMaterial', id);
        },

        setCurrentEditMaterial({commit}, id){
            return commit('setCurrentMaterialId', id);
        },
    },
    mutations: {
        setMaterilas: (state, materials) => {
            state.materials = materials;
        },
        addMaterial: (state, material) => {
            //console.log('material', material)
            state.materials.unshift(material);
        },
        delMaterial: (state, id) => {
            state.materials = state.materials.filter(
                t => t.id != id
            );
        },
        editMaterial: (state, material) => {
            let find = state.materials.filter(
                t => t.id === material.id
            );
            //console.log(find[0]);
            //console.log(material);
            if (find.length){
                // todo: эта строка ниже не работает, пришлось обойти (!) свойста объекта и делать присваивание вручную!
                // не только не работает, да еще и парализует работу ниже идуещего цикла!
                //find[0] = material;

                for (let key in find[0]){
                    //console.log(find[0][key]);
                    //console.log(material[key]);
                    find[0][key] = material[key];
                }
            }
        },
        setCurrentMaterialId: (state, id) => {
            state.currentEditMaterialId = id;
        }
    },
    namespaced: true,
}
