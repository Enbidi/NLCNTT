import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { 
    path: "/product",
    component: () => import("./components/ProductsView.vue"),
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
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
