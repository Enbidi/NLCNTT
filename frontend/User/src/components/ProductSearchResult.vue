<script setup>
defineProps(['results'])
</script>
<template>
  <div class="col-md-10">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div v-for="product in products" class="col">
        <Product :product="product" :id="product._id"/>
      </div>
    </div>
  </div>
</template>