import axios from "axios"
import store from "./store"

const axiosClient = axios.create({
    baseURL: 'http://laravel9-home-calc:87/api',
})

axiosClient.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${store.state.user.token}`;
        return config;
    }
)

export default axiosClient;
