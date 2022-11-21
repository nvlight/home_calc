import axiosClient from "../axios.js";

export const roomJobModule = {
    state(){
        return {
            roomJobs: [],
        }
    },
    getters: {
        sum(state){
            return state.roomJobs
                .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
        },
        sumByRoomId: (state) => (room_id) => {
            return state.roomJobs.filter( t => t.room_id === room_id)
                .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 )
        }
    },
    actions: {
        getRoomJobs({commit}){
            let response;
            response = axiosClient
                .get("/roomjob")
                .then((res)=>{
                    //console.log(res.data)
                    res.data.forEach(t => commit('addJob', t))
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                })
            return response;
        },

        createRoomJob({dispatch, state}, job){
            return dispatch('createRoomJobQuery', job);
        },

        createRoomJobQuery({commit}, job){
            let response;
            response = axiosClient
                .post("/roomjob", job)
                .then((res)=>{
                    //console.log(res.data)
                    job.id = res.data.savedId;
                    commit('addJob', job);
                    return res;
                })
                .catch( (err) => {
                })
            return response;
        },

        addJob({commit}, job){
            return commit('addJob', job);
        },
        deleteJobHandler({dispatch}, roomjobId){
            //console.log('roomjob:', roomjob);

            let response;
            response = axiosClient
                .delete(`/roomjob/${roomjobId}`)
                .then((res)=>{
                    //console.log(res.data)
                    if (res.data.success){
                        dispatch('deleteJob', roomjobId);
                    }

                    return res;
                })
            return response;
        },
        deleteJob({commit}, job_id){
            return commit('deleteJob', job_id);
        },

    },
    mutations: {
        addJob: (state, job) => {
            state.roomJobs.unshift(job);
        },
        deleteJob: (state, roomjobId) => {
            state.roomJobs = state.roomJobs.filter(
                t => t.id != roomjobId
            );
        },
    },
    namespaced: true,
}
