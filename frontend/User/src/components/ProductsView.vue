<script setup>
import Branch from './Branch.vue';
import Product from './Product.vue';
import { ref } from 'vue';
import iphone from '../iphone';
import xiaomi from '../xiaomi';
import { inject, watch } from 'vue'

import { useFetch } from './composables/useFetch'

const hostname = inject("hostname")
const productAPI_URL = hostname + "/product"
const productsPerBranchAPI_URL = hostname + "/branch/product"
const productData = useFetch(productAPI_URL)
const productsPerBranch = useFetch(productsPerBranchAPI_URL)

</script>

<script>
export default {
  mounted() {
    var cartData = window.localStorage.getItem("cart")
    this.cart = cartData ? JSON.parse(cartData) : []
  },
  unmounted() {
    window.localStorage.setItem("cart", JSON.stringify(this.cart))
  },
  methods: {
    addToCart(product) {
      this.cart.push(product)
    }
  }
};
</script>

<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-2">
        <ul class="list-group list-group-light">
          <Branch @click="products = iphone">Iphone</Branch>
          <Branch @click="products = xiaomi">Xiami</Branch>
          <Branch>Samsung</Branch>
          <Branch>Nokia</Branch>z
          <Branch>Lenovo</Branch>
        </ul>
      </div>
      <div class="col-md-10">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div v-for="product in productData?.items" class="col">
            <Product :product="product" :add-to-cart="() => addToCart(product)" :id="product._id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>