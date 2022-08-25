import {createStore} from "vuex";

const store = createStore({
    state:{
        user:{
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        buildingMaterials: [
            {
                id: 82239108,
                name: 'Саморезы для металла STANDERS фосфатированные 3.5x35, на вес (около 510 шт./кг)',
                description: '',
                price: 440,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-metalla-standers-fosfatirovannye-35x35-82239108/',
            },
            {
                id: 82239655,
                name: 'Саморезы для дерева Standers фосфатированные 3.5x35 на вес (около 568 шт./кг)',
                description: '',
                price: 420,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-dereva-standers-fosfatirovannye-35x35-na-ves-okolo-568-sht-kg-82239655',
            },

            {
                id: 82239109,
                name: 'Саморезы для металла STANDERS фосфатированные 3.5x45, на вес (около 411 шт./кг)',
                description: '',
                price: 440,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-metalla-standers-fosfatirovannye-35x45-82239109/',
            },
            {
                id: 82239659,
                name: 'Саморезы для дерева Standers фосфатированные 3.5x55 на вес (около 379 шт./кг)',
                description: '',
                price: 420,
                current: '₽',
                measure: 'кг',
                url: 'https://leroymerlin.ru/product/samorezy-dlya-dereva-standers-fosfatirovannye-35x55-na-ves-okolo-379-sht-kg-82239659',
            },


            {
                id: 82716893,
                name: 'Дюбель-гвозди грибовидные Ecoplast, 6x40 мм, полипропилен, 100 шт.',
                description: '',
                price: 180,
                current: '₽',
                measure: 'коробка',
                url: 'https://leroymerlin.ru/product/dyubel-gvozdi-gribovidnye-ecoplast-82716893/',
            },
            {
                id: 84177366,
                name: 'Дюбель-гвоздь потайной 6х60 мм полипропилен 100 шт.',
                description: '',
                price: 214,
                current: '₽',
                measure: 'коробка',
                url: 'https://leroymerlin.ru/product/dyubel-gvozd-potaynoy-6h60-mm-polipropilen-100-sht--84177366/',
            },

        ],
    },
    getters:{},
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
    },
    mutations:{
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
    },
    modules:{},
})

export default store;
