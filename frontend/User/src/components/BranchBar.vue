<script setup>
import Branch from './Branch.vue'
import { useProductsPerBranchStore } from '../stores/productsPerBranch'

const productsPerBranchStore = useProductsPerBranchStore()
productsPerBranchStore.fetchData()
</script>

<template>
  <div class="col-md-2">
    <ul class="list-group list-group-light">
      <Branch v-for="branch in productsPerBranchStore?.items" :branch-name="branch.name"
        @click="$emit('branchChanged', branch.products)" />
    </ul>
  </div>
</template>