import { createApp } from 'vue'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'mdb-ui-kit/css/mdb.min.css'
import './assets/main.css'
import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const pinia = createPinia()
const app = createApp(App)
app.config.unwrapInjectedRef = true
app.use(router)
app.use(pinia)
app.provide("hostname", "http://localhost:3000")
app.mount("#app")