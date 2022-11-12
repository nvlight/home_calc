import axiosClient from "../axios.js";

export const materialModule = {
    state: {
        materials: [],
    },
    getters: {
        jobsSum(state){
            const sum = state.materials
                .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
            return sum;
        },
    },
    actions: {
        getMaterials({commit}){
            let response;
            response = axiosClient
                .get("/materials")
                .then((res)=>{
                    //console.log(res.data)
                    res.data.forEach(t => commit('addMaterial', t))
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        createMaterial({dispatch}, material){
            console.log('createMaterial');
            return dispatch('createMaterialQuery', material);
        },

        createMaterialQuery({commit}, material){
            let response;
            response = axiosClient
                .post("/material", material)
                .then((res)=>{
                    material.id = res.data.savedId;
                    commit('addMaterial', material);
                    return res;
                })
                .catch( (err) => {
                })
            return response;
        },

        addMaterial({commit}, material){
            return commit('addMaterial', material);
        },
        deleteMaterialHandler({dispatch}, id){
            let response;
            response = axiosClient
                .delete(`/material/${id}`)
                .then((res)=>{
                    //console.log(res.data)
                    if (res.data.success){
                        dispatch('delMaterial', id);
                    }

                    return res;
                })
            return response;
        },
        delMaterial({commit}, id){
            return commit('delMaterial', id);
        },

    },
    mutations: {
        addMaterial: (state, material) => {
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
