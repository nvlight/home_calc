import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import GetStarted from "../components/GetStarted.vue"
import DefaultLayout from "../components/DefaultLayout.vue"
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store/index.js";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
    {
        path: '/',
        redirect: '/home',
        //meta: {requiresAuth: true, },
        component: DefaultLayout,
        children: [
            {path: '/home', name: 'Home', component: Home}
        ],
    },
    {
        path: '/get-started',
        name: 'GetStarted',
        meta: { requiresAuth: true },
        component: GetStarted,
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: { isGuest: true,},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },
            {
                path: '/register',
                name: 'Register',
                component: Register,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach( (to,from, next) => {
    //console.log(to);
    if( to.name === 'Login' && store.state.user.token){
        next({name: 'GetStarted'})
    } else
    if (to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    }
    else{
        next();
    }
})

export default router;
