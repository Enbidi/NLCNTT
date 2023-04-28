<script setup>
import Rating from './Rating.vue';
defineProps(['avt', 'username', 'content', 'ratingStars'])
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <p>{{ content }}</p>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" width="25" height="25"/>
          <!-- <img :src="avt" width="25" height="25" /> -->
          <p class="small mb-0 ms-2">{{ username }}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          <Rating class="me-1" :rating-stars="ratingStars" />
          <!-- <p class="small text-muted mb-0">Thích?</p> -->
          <!-- <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i> -->
          <!-- <p class="small text-muted mb-0">3</p> -->
        </div>
      </div>
    </div>
  </div>
</template>