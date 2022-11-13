import axiosClient from "../axios.js";

export const materialModule = {
    state: {
        materials: [],
    },
    getters: {

    },
    actions: {
        loadMaterials({commit}){
            let response;
            response = axiosClient
                .get("/material")
                .then((res)=>{
                    //console.log(res.data)
                    commit('setMaterilas', res.data.data);
                    //res.data.forEach(t => commit('addMaterial', t))
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
                    const materialClone = Object.assign({}, material);
                    materialClone.id = res.data.savedId;
                    dispatch('addMaterial', materialClone);
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

    },
    mutations: {
        setMaterilas: (state, materials) => {
            state.materials = materials;
        },
        addMaterial: (state, material) => {
            //console.log('material', material)
            state.materials.push(material);
        },
        delMaterial: (state, id) => {
            state.materials = state.materials.filter(
                t => t.id != id
            );
        },
    },
    namespaced: true,
}
