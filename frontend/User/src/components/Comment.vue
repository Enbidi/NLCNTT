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
          <img :src="avt" alt="avatar" width="25" height="25" />
          <p class="small mb-0 ms-2">{{ username }}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          <Rating class="me-1" :rating-stars="ratingStars" />
          <p class="small text-muted mb-0">Upvote?</p>
          <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i>
          <p class="small text-muted mb-0">3</p>
        </div>
      </div>
    </div>
  </div>
</template>