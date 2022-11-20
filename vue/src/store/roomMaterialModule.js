import axiosClient from "../axios.js";

export const roomMaterialModule = {
    state() {
        return {
            roomMaterials: [],
        }
    },
    getters: {
        sum(state){
            return state.roomMaterials
                .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
        },
    },
    actions: {
        loadRoomMaterials({commit}){
            let response;
            response = axiosClient
                .get("/roommaterial")
                .then((res)=>{
                    //console.log(res.data)
                    commit('setRoomMaterilas', res.data.data);
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        createRoomMaterial({dispatch}, roomMaterial){
            return dispatch('createRoomMaterialQuery', roomMaterial);
        },

        createRoomMaterialQuery({commit, dispatch}, roomMaterial){
            let response;
            response = axiosClient
                .post("/roommaterial", roomMaterial)
                .then((res)=>{
                    if (res.data.success !== 0){
                        const roomMaterialClone = Object.assign({}, roomMaterial);
                        roomMaterialClone.id = res.data.savedId;
                        roomMaterialClone.title = res.data.title;
                        dispatch('addRoomMaterial', roomMaterialClone);
                    }
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        addRoomMaterial({commit}, roomMaterial){
            return commit('addRoomMaterial', roomMaterial);
        },

        delRoomMaterial({dispatch}, id){
            let response;
            response = axiosClient
                .delete(`/roommaterial/${id}`)
                .then((res)=>{
                    if (res.data.success){
                        dispatch('deleteRoomMaterialHandler', id);
                    }

                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },
        deleteRoomMaterialHandler({commit}, id){
            return commit('delRoomMaterial', id);
        },

    },
    mutations: {
        setRoomMaterilas: (state, roomMaterials) => {
            state.roomMaterials = roomMaterials;
        },
        addRoomMaterial: (state, roomMaterial) => {
            state.roomMaterials.unshift(roomMaterial);
            //state.roomMaterials.push(roomMaterial);
        },
        delRoomMaterial: (state, id) => {
            state.roomMaterials = state.roomMaterials.filter(
                t => t.id != id
            );
        },
    },
    namespaced: true,
}
