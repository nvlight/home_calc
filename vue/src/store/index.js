import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
    state:{
        debug: true,
        user:{
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        buildingMaterials: [
            {
                id: 82239108,
                category: 'fasteners',
                name: 'Саморезы для металла STANDERS фосфатированные 3.5x35, на вес (около 510 шт./кг)',
                description: '',
                price: 440,
                unit_count: 510,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-metalla-standers-fosfatirovannye-35x35-82239108/',
            },
            {
                id: 82239655,
                category: 'fasteners',
                name: 'Саморезы для дерева Standers фосфатированные 3.5x35 на вес (около 568 шт./кг)',
                description: '',
                price: 420,
                unit_count: 568,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-dereva-standers-fosfatirovannye-35x35-na-ves-okolo-568-sht-kg-82239655',
            },

            {
                id: 82239109,
                category: 'fasteners',
                name: 'Саморезы для металла STANDERS фосфатированные 3.5x45, на вес (около 411 шт./кг)',
                description: '',
                price: 440,
                unit_count: 411,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-metalla-standers-fosfatirovannye-35x45-82239109/',
            },
            {
                id: 82239659,
                category: 'fasteners',
                name: 'Саморезы для дерева Standers фосфатированные 3.5x55 на вес (около 379 шт./кг)',
                description: '',
                price: 420,
                unit_count: 379,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-dereva-standers-fosfatirovannye-35x55-na-ves-okolo-379-sht-kg-82239659',
            },


            {
                id: 82716893,
                category: 'fasteners',
                name: 'Дюбель-гвозди грибовидные Ecoplast, 6x40 мм, полипропилен, 100 шт.',
                description: '',
                price: 180,
                unit_count: 100,
                current: '₽',
                measure: 'коробка',
                url: 'https://leroymerlin.ru/product/dyubel-gvozdi-gribovidnye-ecoplast-82716893/',
            },
            {
                id: 84177366,
                category: 'fasteners',
                name: 'Дюбель-гвоздь потайной 6х60 мм полипропилен 100 шт.',
                description: '',
                price: 214,
                unit_count: 100,
                current: '₽',
                measure: 'коробка',
                url: 'https://leroymerlin.ru/product/dyubel-gvozd-potaynoy-6h60-mm-polipropilen-100-sht--84177366/',
            },

            {
                id: 12593034,
                category: 'gipsokarton',
                name: 'Гипсокартон 12.5 мм 2500х1200 3 м²',
                description: '',
                price: 321,
                unit_count: 1,
                current: '₽',
                measure: 'штука',
                url: 'https://leroymerlin.ru/product/gipsokarton-125-mm-2500x1200-3-m-12593034/',
            },

        ],
        materialsForBuyCount: 0,
        materialsForBuy: [],
        jobsResultingSumm: 0,
        addedJobNum: 0,
        added_jobs: [],
    },
    getters:{

    },
    actions:{
        getSurvey({commit}, id){
            commit('setCurrentSurveyLoading', true);
            return axiosClient
                .get(`/survey/${id}`)
                .then( (res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch( (err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                });
        },
        getFastenersForCeilingCalc({commit}){
            let needMaterials = [];
            const needIds = [
                82239108,
                82239655,
                82239109,
                82239659,
                82716893,
                84177366,
            ];
            const allMaterials = store.state.buildingMaterials;
            for(let i=0; i<allMaterials.length; i++){
                if ( needIds.includes(allMaterials[i].id) ){
                    needMaterials.push(allMaterials[i]);
                }
            }
            //console.log(needMaterials);
            return needMaterials;
        },
        // 12345678aA@
        // 12345678aA@
        login({commit}, user){
            return axiosClient.post('/login', user)
                .then( ({data}) => {
                    commit('setUser', data)
                    return data;
                })
        },
        register({commit}, user){
            return axiosClient.post('/register', user)
                .then( ({data}) => {
                    commit('setUser', data)
                    return data;
                })
        },
        logout({commit}){
            return axiosClient.post('/logout')
                .then( response => {
                    commit('logout');
                    return response;
                })
        },

        incrementAddedJobNum({commit}){
            return commit('incAddedJobNum');
        },

        addJob({commit}, job){
            return commit('addJob', job);
        },
        deleteJobHandler({commit, dispatch}, job_id){
            const filtered = store.state.added_jobs.filter(
                t => t.id == job_id
            );
            commit('decValueToJobsResultingSumm', filtered[0].summ);

            dispatch('deleteJob', job_id);
        },
        deleteJob({commit}, job_id){
            return commit('deleteJob', job_id);
        },
    },
    mutations:{
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        addMaterial(state, material){
            state.materialsForBuyCount++;
            material.id = state.materialsForBuyCount;
            state.materialsForBuy.push(material);
        },
        deleteMaterial(state, materialId){

            state.materialsForBuy = state.materialsForBuy.filter(
                mt => mt.id !== materialId
            );

            state.materialsForBuyCount--;
        },

        incValueToJobsResultingSumm(state, summ){
            state.jobsResultingSumm += summ;
        },
        decValueToJobsResultingSumm(state, summ){
            state.jobsResultingSumm -= summ;
        },

        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data  = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        logout: (state) => {
            state.user.data  = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },

        incAddedJobNum: (state) => {
            state.addedJobNum++;
        },

        addJob: (state, job) => {
            state.added_jobs.push(job);
        },
        deleteJob: (state, job_id) => {
            state.added_jobs = state.added_jobs.filter(
                t => t.id != job_id
            );
        },
    },
    modules:{},
})

export default store;
