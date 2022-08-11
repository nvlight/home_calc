import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import GetStarted from "../components/GetStarted.vue"
import DefaultLayout from "../components/DefaultLayout.vue"

const routes = [
    {
        path: '/',
        redirect: '/home',
        //name: 'Home',
        component: DefaultLayout,
        children: [
            {path: '/home', name: 'Home', component: Home}
        ],
    },
    {
        path: '/get-started',
        name: 'GetStarted',
        component: GetStarted,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
