import { createApp } from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import { createRouter, createWebHashHistory } from 'vue-router'
// import './assets/main.css'

// const routes = [
//   { path: '/', component: }
// ]

const app = createApp(App);
app.use(SmartTable)
app.mount("#app")