import axiosClient from "../axios.js";

export const roomJobModule = {
    state: {
        addedJobNum: 0,
        addedJobs: [],

        jobsResultingSum: 0,
    },
    getters: {
        jobsSum(){
            const sum = roomJobModule.state.addedJobs
                .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
            return sum;
        },
    },
    actions: {
        createRoomJob({dispatch, state}){
            const room = Object.assign({}, state.emptyRoom);

            return dispatch('createRoomQuery', room);
        },

        createRoomJobQuery({commit, dispatch, getters}, room){
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

        incrementAddedJobNum({commit}){
            return commit('incAddedJobNum');
        },
        addJob({commit}, job){
            return commit('addJob', job);
        },
        deleteJobHandler({commit, dispatch}, job_id){
            //console.log(job_id);
            const filtered = roomJobModule.state.addedJobs.filter(
                t => t.id == job_id
            );
            commit('decValueTojobsResultingSum', filtered[0].sum);

            dispatch('deleteJob', job_id);
        },
        deleteJob({commit}, job_id){
            return commit('deleteJob', job_id);
        },

        incValueToJobsResultingSum({commit}, sum){
            return commit('incValueToJobsResultingSum', sum);
        },

    },
    mutations: {
        incAddedJobNum: (state) => {
            state.addedJobNum++;
        },
        addJob: (state, job) => {
            state.addedJobs.push(job);
        },
        deleteJob: (state, job_id) => {
            state.addedJobs = state.addedJobs.filter(
                t => t.id != job_id
            );
        },

        incValueToJobsResultingSum(state, sum){
            state.jobsResultingSum += sum;
        },
        decValueTojobsResultingSum(state, sum){
            state.jobsResultingSum -= sum;
        },
    },
    namespaced: true,
}
