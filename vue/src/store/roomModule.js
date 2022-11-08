import axiosClient from "../axios.js";

export const roomModule = {
    state: {
        rooms: [
            // {
            //     id: 1,
            //     sizes : {
            //         s1: 4,
            //         s2: 5,
            //         s3: 4,
            //         s4: 5,
            //     },
            //     height: 2.4,
            //
            //     windows: [
            //         {
            //             id: 1,
            //             width: 0.4, // оконный проем
            //             height: 0.9,
            //             length: 0.8,
            //         },
            //     ],
            //     is_windows_showing: false,
            //
            //     doors: [
            //         {
            //             id: 1,
            //             width: 0.3,
            //             height: 2.2,
            //             length: 0.8,
            //         },
            //     ],
            //     is_doors_showing: false,
            //
            //     internalCorners: 4,
            //     outerCorners: 2,
            //     connectors: 7, // соединение
            //     stubs: 2, // заглушка
            // },
        ],

        emptyRoom: {
            id: 0,
            sizes : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            },
            height: 0,

            windows: [],
            is_windows_showing: false,

            doors: [],
            is_doors_showing: false,

            internalCorners: 0,
            outerCorners: 0,
            connectors: 0, // соединение
            stubs: 0, // заглушка
        },
        saveRoomId: 0,
    },
    getters: {
        getRoomById(){
            //console.log('getRoomById', roomModule.state.setSaveRoomId);
            const find =
                roomModule.state.rooms.filter(
                    t => t.id === roomModule.state.saveRoomId
                );

            return find[0];
        },
    },
    actions: {
        getRooms({commit}){
            return axiosClient
                .get("/room")
                .then((res)=>{
                    //console.log(res.data)

                    res.data.rooms.forEach(t => {
                        //console.log(JSON.parse(t.data));
                        let roomParse = JSON.parse(t.data);
                        //roomParse.id = roomParse.room_id;
                        commit('insertRoom', roomParse);
                    });

                    return res;
                })
        },

        createRoom({dispatch, state}){
            const room = Object.assign({}, state.emptyRoom);

            return dispatch('createRoomQuery', room);
        },

        createRoomQuery({commit, dispatch, getters}, room){
            let response;
            response = axiosClient
                .post("/room", room)
                .then((res)=>{
                    console.log(res.data)
                    room.id = res.data.room_id
                    commit('insertRoom', room)
                    return res;
                })
            return response;
        },

        saveRoom({commit, dispatch, getters}, id){
            commit('setSaveRoomId', id);
            const room = getters.getRoomById;
            //console.log(room);
            //console.log(JSON.stringify(room));
            dispatch('saveRoomQuery', room);
        },

        saveRoomQuery({commit, dispatch, getters}, room){
            let response;
            response = axiosClient
                .post("/room", room)
                .then((res)=>{
                    //console.log(res.data)
                    return res;
                })
            return response;
        },

        deleteRoom({commit}, roomId){
            let response;
            response = axiosClient
                .delete('/room/'+`${roomId}`)
                .then((res)=>{
                    //console.log(res.data)
                    commit('deleteRoom', roomId);
                    return res;
                })
            return response;
        },

        deleteRoomHandler({commit, dispatch, state}, roomId){
            const filtered = state.rooms.filter(
                t => t.id == roomId
            );
            //commit('decValueTojobsResultingSum', filtered[0].sum);

            dispatch('deleteRoom', roomId);
        },

        updateRoom({commit}, room){
            return axiosClient
                .patch("/room" + room.id)
                .then((res)=>{
                    console.log(res.data)
                    return res;
                })
        },
    },
    mutations: {

        insertRoom: (state, room) => {
            state.rooms.push(room);
        },

        deleteRoom: (state, roomId) => {
            state.rooms = state.rooms.filter(
                t => t.id != roomId
            );
        },

        setSaveRoomId: (state, id) => {
            state.saveRoomId = id;
        },

    },
    namespaced: true,
}
