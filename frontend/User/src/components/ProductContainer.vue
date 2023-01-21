<script setup>
import { inject} from 'vue'

import Product from './Product.vue'
import { useFetch } from './composables/useFetch'
const hostname = inject("hostname")
const productAPI_URL = hostname + "/product"
const productData = useFetch(productAPI_URL)
</script>

<template>
  <div class="col-md-9">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <Product img-src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" description="This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer." />
      <Product img-src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" description="This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer." />
      <Product img-src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" :description="'fucj'" />
    </div>
  </div>
</template>