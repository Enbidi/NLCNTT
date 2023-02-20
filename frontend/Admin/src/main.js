import { createApp } from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import { Line } from 'vue-chartjs'
import { createPinia } from 'pinia'
import { router } from './router'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'mdb-ui-kit/css/mdb.min.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

app.config.globalProperties.hostname = "http://localhost:3000/admin"
app.config.unwrapInjectedRef = true
app.provide("hostname", "http://localhost:3000")
app.use(SmartTable)
// app.use(Line)
app.use(router)
app.mount("#app")