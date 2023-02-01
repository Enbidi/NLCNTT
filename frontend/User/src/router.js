import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { 
    path: "/",
    name: "homepage",
    component: () => import("./components/HomePage.vue")
  },
  { 
    path: "/product",
    component: () => import("./components/ProductPage.vue"),
    name: "product"
  },
  { 
    path: "/product/:id",
    component: () => import("./components/ProductDetail.vue"),
    name: "productDetail",
    props: true
  },
  { 
    path: "/cart",
    component: () => import("./components/Cart.vue"),
    name: "cart"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./components/SignUp.vue")
  },
  {
    path: "/userprofile",
    component: () => import('./components/UserProfile.vue')
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
