<script setup>
import { ref, inject } from 'vue'
import BranchBar from './BranchBar.vue'
import ProductsView from './ProductsView.vue'
import { useSearchResultStore } from '../stores/searchResult'
import { wait } from '../utils'

const searchResultStore = useSearchResultStore()
var isLoading = inject('isLoading')
var products = ref(null)
searchResultStore.$subscribe((_, state) => {
  products.value = state.items
})

async function changeProducts(newProducts) {
  isLoading.value = true
  await wait(500)
  products.value = newProducts
  isLoading.value = false
}
</script>

<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <BranchBar @branch-changed="changeProducts" />
      <ProductsView :products="products" />
    </div>
  </div>
</template>