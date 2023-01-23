import { createApp } from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './assets/main.css'

import Product from './components/Product.vue'
import Bill from './components/Bill.vue'
import User from './components/User.vue'
import Branch from './components/Branch.vue'
import Origin from './components/Origin.vue'

const routes = [
  { path: "/products", component: () => import("./components/Product.vue") },
  { path: "/origins", component: () => import("./components/Origin.vue") },
  { path: "/bills", component: () => import("./components/Bill.vue")},
  { path: '/users', component: () => import("./components/User.vue")},
  { path: '/branches', component: () => import("./components/Branch.vue")}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

app.config.globalProperties.hostname = "http://localhost:3000/admin"
app.provide("hostname", "http://localhost:3000")
app.use(SmartTable)
app.use(router)
app.mount("#app")