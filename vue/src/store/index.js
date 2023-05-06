import {createStore} from "vuex";
import axiosClient from "../axios.js";
import {roomModule} from "./roomModule.js";
import {roomJobModule} from "./roomJobModule.js";
import {materialModule} from "./materialModule.js";
import {roomMaterialModule} from "./roomMaterialModule.js";

const store = createStore({
    state: () => ({
        mainDevSiteUrl: 'https://mgdev.ru',
        debug: true,
        user:{
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        currency: "₽",
    }),
    getters:{
        testValCurrency(state){
            return state.currency;
        }
    },
    actions:{
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
    },
    mutations:{
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
    },
    modules:{
        room: roomModule,
        roomJob: roomJobModule,
        material: materialModule,
        roomMaterial: roomMaterialModule,
    },
})

export default store;
