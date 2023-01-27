<script setup>
import Login from './components/Login.vue';
import NavBar from './components/NavBar.vue';
import Product from './components/Product.vue';
import ProductContainer from './components/ProductContainer.vue';
import Branches from './components/Branches.vue';
import Cart from './components/Cart.vue';
import ProductsView from './components/ProductsView.vue';
import NavItem from './components/NavItem.vue';
import Alert from './components/Alert.vue'
import { useCartStore } from './stores/cart'
const cartStore = useCartStore()
cartStore.$subscribe((_, state) => {
  localStorage.setItem("cart", JSON.stringify(state))
}, { detached: true })
</script>

<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Alert/>
  <!-- <ProductsView /> -->
</template>

<style>
body {
  background-image: url(https://assets.website-files.com/5fc9d3d58a00611de699385c/6143c438750858e45da212fc_Xsolla%20Web%20Shop%20for%20Mobile%20Games.jpg);
  background-size: 100%;
  background-attachment: fixed;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>