import { createApp } from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import { createRouter, createWebHashHistory } from 'vue-router'

import Product from './components/Product.vue'
import Origin from './components/Origin.vue'
import Bill from './components/Bill.vue'
import User from './components/User.vue'
import Branch from './components/Branch.vue'

const routes = [
  { path: "/products", component: Product },
  { path: "/origins", component: Origin },
  { path: "/bills", component: Bill},
  { path: '/users', component: User},
  { path: '/branches', component: Branch}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.config.globalProperties.hostname = "http://localhost:3000/admin"

app.use(SmartTable)
app.use(router)
app.mount("#app")