import {createStore} from "vuex";

const store = createStore({
    state:{
        count: 0,
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
        materialsForBuy: [

        ],
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
    },
    mutations:{
        increment (state){
            state.count++;
        },
        decrement (state){
            state.count--;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        addMaterial(state, material){
            state.materialsForBuy.push(material);
        },
    },
    modules:{},
})

export default store;
