import axiosClient from "../axios.js";

export const roomModule = {
    state: {
        loading: true,
        rooms: [],
        selectedJob: [],

        emptyRoom: {
            id: 0,
            title: 'Имя комнаты',
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
            is_baseboards_showing: false,

            internalCorners: 0,
            outerCorners: 0,
            connectors: 0, // соединение
            stubs: 0, // заглушка

        },
    },
    getters: {
        getRoomById: (state) => (id) => {
            const find = state.rooms.filter(
                    t => t.id === id
                );
            return find[0];
        },

        getSelectedJob: (state) => (room_id) => {
            return state.selectedJob.filter( t => t.roomId === room_id);
        }
    },
    actions: {
        clearRooms({commit}){
            commit('clearRooms');
        },
        getRooms({commit}){
            return axiosClient
                .get("/room")
                .then((res)=>{
                    if (res.data.success){
                        res.data.rooms.forEach(t => {
                            let roomParse = JSON.parse(t.data);
                            commit('insertRoom', roomParse);
                        });
                        commit('setLoading', false);
                    }
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
                    if (res.data.success){
                        room.id = res.data.room_id
                        commit('insertRoom', room)
                    }
                    return res;
                })
            return response;
        },

        updateRoom({dispatch, getters}, dt){
            const id = dt.room_id;
            const room = getters.getRoomById(id);
            room.title = dt.title;
            dispatch('updateRoomQuery', room);
        },

        updateRoomQuery({commit, dispatch, getters}, room){
            let response;
            response = axiosClient
                .patch(`/room/${room.id}`, room)
                .then((res)=>{
                    return res.data.success;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        deleteRoom({commit}, roomId){
            let response;
            response = axiosClient
                .delete('/room/'+`${roomId}`)
                .then((res)=>{
                    commit('deleteRoom', roomId);
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        setRoomSelectedJobId({commit}, rs){
            commit('setRoomSelectedJobId', rs);
        },
    },
    mutations: {
        setRooms: (state, rooms) => {
            state.rooms = rooms;
        },

        clearRooms: (state) => {
            state.rooms = [];
        },

        setLoading: (state, value) => {
            state.loading = value;
        },

        insertRoom: (state, room) => {
            state.rooms.push(room);
        },

        deleteRoom: (state, roomId) => {
            state.rooms = state.rooms.filter(
                t => t.id != roomId
            );
        },

        setRoomSelectedJobsArray: (state, array) => {
            state.selectedJob = array;
        },

        setRoomSelectedJobId: (state, rs) => {
            const fn = state.selectedJob.filter(t => t.roomId === rs.roomId);
            if (!fn.length){
                state.selectedJob.push(rs);
            }else{
                fn[0].jobId = rs.jobId;
            }
            sessionStorage.setItem('selectedJobsArray', JSON.stringify(state.selectedJob));
        },
    },
    namespaced: true,
}
