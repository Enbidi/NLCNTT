<script setup>
import Branch from './Branch.vue';
import Product from './Product.vue';
import { ref } from 'vue';
import iphone from '../iphone';
import xiaomi from '../xiaomi';
const products = ref(iphone);
</script>

<script>
var cart = [];

export default {
  created() {
    var cartData = window.localStorage.getItem("cart");
    if (cartData) {
      cart = JSON.parse(cartData);
    }
  },
  unmounted() {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  },
  methods: {
    addToCart(product) {
      cart.push(product);
    }
  }
};
</script>

<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-3">
        <ul class="list-group list-group-light">
          <Branch @click="products = iphone">Iphone</Branch>
          <Branch @click="products = xiaomi">Xiami</Branch>
          <Branch>Samsung</Branch>
          <Branch>Nokia</Branch>
          <Branch>Lenovo</Branch>
        </ul>
      </div>
      <div class="col-md-9">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <Product v-for="product in products" v-bind="product" @click="addToCart(product)"/>
        </div>
      </div>
    </div>
  </div>
</template>