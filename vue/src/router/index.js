import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import Rooms from "../views/Rooms.vue"
import DefaultLayout from "../components/DefaultLayout.vue"
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store/index.js";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Materials from "../views/Materials.vue";
import Projects from "../views/Projects.vue";

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/rooms',
        redirect: '/rooms',
        meta: { requiresAuth: true },
        component: DefaultLayout,
        children: [
            {
                path: '/rooms',
                name: 'Rooms',
                component: Rooms,
            },
            {
                path: '/materials',
                name: 'Materials',
                component: Materials,
            },
            {
                path: '/projects',
                name: 'Projects',
                meta: { requiresAuth: true },
                component: Projects,
            },
        ],
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
    if( to.name === 'Login' && store.state.user.token){
        next({name: 'Rooms'})
    } else
    if (to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    }
    else{
        next();
    }
    //next();
})

export default router;
