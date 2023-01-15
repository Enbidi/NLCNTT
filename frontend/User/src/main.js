import { createApp } from 'vue'
import 'mdb-vue-ui-kit/css/mdb.min.css';
import App from './App.vue'
import ProductView from './components/ProductsView.vue';
import Cart from './components/Cart.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './assets/main.css'

window.helper = function() {

}

const routes = [
  { path: "/products", component: ProductView },
  { path: "/cart", component: Cart }
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

createApp(App).use(router).mount("#app");