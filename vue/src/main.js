import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from "./router/index.js";
import store from "./store/index.js";
import components from "./components/UI"
//console.log(components);

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
});

app
    .use(router)
    .use(store)
    .mount('#app')
