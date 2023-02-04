<script setup>
import Carousel from './Carousel.vue'
import Product from './Product.vue'
import { useCommonProducts } from '../stores/commonProducts'
import { useProductsPerBranchStore } from '../stores/productsPerBranch'
const commonProductsStore = useCommonProducts()
const productsPerBranchStore = useProductsPerBranchStore()

commonProductsStore.fetchData()
productsPerBranchStore.fetchData()
</script>

<template>
  <main>
    <div class="container-fluid p-0">
      <Carousel />
    </div>
    <section class="row m-3" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
      <h3 class="text-white">Các sản phẩm bán chạy nhất</h3>
      <template v-for="product in commonProductsStore.items">
        <div class="col-md-2 mb-2">
          <Product :product="product" />
        </div>
      </template>
    </section>
    <section class="row m-3" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
      <h3 class="text-white">Các sản phẩm của SAMSUNG</h3>
      <template v-for="product in productsPerBranchStore.getProductsByBranchName('Samsung')">
        <div class="col-md-2 mb-2">
          <Product :product="product" />
        </div>
      </template>
    </section>
    <section class="row m-3" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
      <h3 class="text-white">Các sản phẩm của APPLE</h3>
      <template v-for="product in productsPerBranchStore.getProductsByBranchName('Apple')">
        <div class="col-md-2 mb-2">
          <Product :product="product" />
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped>
section {
  height: 100vh;
}
</style>