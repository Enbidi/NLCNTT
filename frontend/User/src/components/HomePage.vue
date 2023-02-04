<script setup>
import Carousel from './Carousel.vue'
import Product from './Product.vue'
import { useCommonProducts } from '../stores/commonProducts'

const commonProductsStore = useCommonProducts()
commonProductsStore.fetchProducts()
</script>

<template>
  <div class="container-fluid p-0">
    <Carousel/>
  </div>
  <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
    <img src="https://thumbs.dreamstime.com/b/beautiful-landscape-dry-tree-branch-sun-flowers-field-against-colorful-evening-dusky-sky-use-as-natural-background-backdrop-48319427.jpg" alt="">
  </div>
  <section class="row" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
    <template v-for="product in commonProductsStore.items">
      <div class="col-md-2 mb-2">
        <Product :product="product"/>
      </div>
    </template>
  </section>
</template>

<style scoped>
section {
  height: 100vh;
}
</style>