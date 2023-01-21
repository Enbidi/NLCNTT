import { createApp } from 'vue'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import App from './App.vue'
import router from './router'
import './assets/main.css'

// const routes = [
//   { path: "/products", component: ProductView },
//   { path: "/product/detail", component: import("./components/ProductDetail.vue")},
//   { path: "/cart", component: Cart }
// ]


// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

const app = createApp(App)
app.provide("hostname", "http://localhost:3000")
app.use(router)
app.mount("#app")