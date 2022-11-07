
export const roomModule = {
    state: {
        lastId: 1,
        rooms: [
            {
                id: 1,
                sizes : {
                    s1: 4,
                    s2: 5,
                    s3: 4,
                    s4: 5,
                },
                height: 2.4,

                windows: [
                    {
                        id: 1,
                        width: 0.4, // оконный проем
                        height: 0.9,
                        length: 0.8,
                    },
                ],
                is_windows_showing: false,

                doors: [
                    {
                        id: 1,
                        width: 0.3,
                        height: 2.2,
                        length: 0.8,
                    },
                ],
                is_doors_showing: false,

                internalCorners: 4,
                outerCorners: 2,
                connectors: 7, // соединение
                stubs: 2, // заглушка
            },
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
    },
    getters: {
    },
    actions: {
        insertEmptyRoom({commit, dispatch, state}){
            commit('incId');
            const room = Object.assign({}, state.emptyRoom);
            room.id = state.lastId;
            return commit('insertRoom', room);
        },

        insertRoom({commit, dispatch, state}, room){
            commit('incId');
            room.id = state.lastId;
            return commit('insertRoom', room);
        },
        deleteRoom({commit}, roomId){
            //console.log('actions - deleteRoom_id: '+roomId);
            return commit('deleteRoom', roomId);
        },
        deleteRoomHandler({commit, dispatch, state}, roomId){
            const filtered = state.rooms.filter(
                t => t.id == roomId
            );
            //commit('decValueTojobsResultingSum', filtered[0].sum);

            dispatch('deleteRoom', roomId);
        },
    },
    mutations: {
        incId(state){
            state.lastId++
        },

        insertRoom: (state, room) => {
            state.rooms.push(room);
        },

        deleteRoom: (state, roomId) => {
            state.rooms = state.rooms.filter(
                t => t.id != roomId
            );
        },
    },
    namespaced: true,
}
