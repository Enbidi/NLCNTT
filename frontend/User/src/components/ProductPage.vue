<script setup>
import { ref, inject } from 'vue'
import BranchBar from './BranchBar.vue'
import ProductsView from './ProductsView.vue'
import { useSearchResultStore } from '../stores/searchResult'
import { useLoad } from './composables/useLoad'
import { wait, showLoading } from '../utils/'

const searchResultStore = useSearchResultStore()
var isLoading = inject('isLoading')
var products = ref(null)
searchResultStore.$subscribe(async (_, state) => {
  showLoading(isLoading, () => {
    products.value = state.items
  }, 500)
})

async function changeProducts(newProducts) {
  showLoading(isLoading, () => {
    products.value = newProducts
  }, 500)
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