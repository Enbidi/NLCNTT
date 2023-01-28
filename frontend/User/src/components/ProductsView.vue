<script setup>
import Product from './Product.vue'
const props = defineProps(['products'])
</script>

<template>
  <!-- <div class="container-fluid mt-3"> -->
    <!-- <div class="row"> -->
      <!-- <div class="col-md-2">
        <ul class="list-group list-group-light">
          <Branch v-for="branch in productsPerBranchStore?.items" :branch-name="branch.name" @click="products = branch.products"/>
        </ul>
      </div> -->
      <div class="col-md-10">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div v-for="product in products" class="col">
            <Product :product="product" :id="product._id"/>
          </div>
        </div>
      </div>
    <!-- </div> -->
  <!-- </div> -->
</template>