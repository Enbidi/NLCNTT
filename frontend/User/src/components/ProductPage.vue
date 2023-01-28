<script setup>
import { ref, watch } from 'vue'
import BranchBar from './BranchBar.vue'
import ProductsView from './ProductsView.vue'
import { useSearchResultStore } from '../stores/searchResult'

const searchResultStore = useSearchResultStore()
var products = ref(null)
searchResultStore.$subscribe((_, state) => {
  products.value = state.items
})
</script>

<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <BranchBar @branch-changed="specificBranchProducs => products = specificBranchProducs"/>
      <ProductsView :products="products"/>
    </div>
  </div>
</template>