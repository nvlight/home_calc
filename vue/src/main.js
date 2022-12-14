import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from "./router/index.js"
import store from "./store/index.js"
import components from "./components/UI"
import calcComponents from "./components/job"
import directives from "./directives/index.js";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
});
calcComponents.forEach(component => {
    app.component(component.name, component)
});
directives.forEach(directive => {
    app.directive(directive.name, directive)
});

app
    .use(router)
    .use(store)
    .mount('#app')
