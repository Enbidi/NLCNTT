<script setup>
defineProps({
  ratingStars: {
    type: Number
  }
})
</script>

<template>
  <div>
    <template v-for="i in 5">
      <template v-if="i <= ratingStars">
        <i class="fa-solid fa-star scale"></i>
      </template>
      <template v-else>
        <i class="fa-regular fa-star scale"></i>
      </template>
    </template>
  </div>
</template>

<style>
.scale {
  transition: all .5s ease-in-out;
}
.scale:hover {
  transform: scale(1.5);
}
</style>