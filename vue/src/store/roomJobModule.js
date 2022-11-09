import axiosClient from "../axios.js";

export const roomJobModule = {
    state: {
        addedJobNum: 0,
        addedJobs: [],

        jobsResultingSum: 0,
        jobsSum: 0,
    },
    getters: {
        jobsSum(state){
            const sum = state.addedJobs
                .reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
            return sum;
        },
    },
    actions: {
        getJobsSum({state, getters}){
            return getters.jobsSum;
        },
        updateJobsSum({commit, state}){
            //const sum = state.addedJobs.reduce( (previousValue, currentValue) => previousValue + currentValue.sum, 0 );
            //commit('setJobsSum', sum);
        },

        getRoomJobs({commit, dispatch, state}){
            let response;
            response = axiosClient
                .get("/roomjob")
                .then((res)=>{
                    //console.log(res.data)
                    res.data.forEach(t => commit('addJob', t))
                    dispatch('updateJobsSum');
                    //commit('incValueToJobsResultingSum', job.sum);
                    return res;
                })
                .catch( (err) => {
                    console.log('we got error:',err);
                    //dispatch('decrementAddedJobNum');
                })
            return response;
        },

        addJobToStore({commit, dispatch, state}, job){
            commit('incAddedJobNum');
            job.id = state.addedJobNum;
            dispatch('createRoomJob', job);
        },

        createRoomJob({dispatch, state}, job){
            //const room = Object.assign({}, state.emptyRoom);
            return dispatch('createRoomJobQuery', job);
        },

        createRoomJobQuery({commit, dispatch, getters}, job){
            let response;
            response = axiosClient
                .post("/roomjob", job)
                .then((res)=>{
                    //console.log(res.data)
                    commit('addJob', job);
                    commit('incValueToJobsResultingSum', job.sum);
                    job.id = res.data.save_id;
                    dispatch('updateJobsSum');
                    return res;
                })
                .catch( (err) => {
                    dispatch('decrementAddedJobNum');
                })
            return response;
        },

        incrementAddedJobNum({commit}){
            return commit('incAddedJobNum');
        },
        decrementAddedJobNum({commit}){
            return commit('decAddedJobNum');
        },
        addJob({commit}, job){
            return commit('addJob', job);
        },
        deleteJobHandler({commit, dispatch}, roomjob){
            //console.log('roomjob:', roomjob);

            let response;
            response = axiosClient
                .delete(`/roomjob/${roomjob}`)
                .then((res)=>{
                    //console.log(res.data)
                    if (res.data.success){
                        const filtered = roomJobModule.state.addedJobs.filter(
                            t => t.id == roomjob
                        );
                        commit('decValueTojobsResultingSum', filtered[0].sum);
                        dispatch('deleteJob', roomjob);
                        dispatch('updateJobsSum');
                    }

                    return res;
                })
            return response;
        },
        deleteJob({commit}, job_id){
            return commit('deleteJob', job_id);
        },

        incValueToJobsResultingSum({commit}, sum){
            return commit('incValueToJobsResultingSum', sum);
        },

        setJobsResultingSum({commit}, value){
            commit('setJobsResultingSum', value);
        }
    },
    mutations: {
        incAddedJobNum: (state) => {
            state.addedJobNum++;
        },
        decAddedJobNum: (state) => {
            state.addedJobNum--;
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

        setJobsResultingSum(state, value){
            state.jobsResultingSum = value;
        },

        setJobsSum(state, value){
            state.jobsSum = value;
        }
    },
    namespaced: true,
}
