import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: "/", component: () => import("./components/DashBoard.vue")},
  { path: "/products", component: () => import("./components/Product.vue") },
  { path: "/origins", component: () => import("./components/Origin.vue") },
  { path: "/bills", component: () => import("./components/Bill.vue") },
  { path: '/users', component: () => import("./components/User.vue") },
  { path: '/branches', component: () => import("./components/Branch.vue") },
  { path: '/sales', component: () => import('./components/Sale.vue') }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})