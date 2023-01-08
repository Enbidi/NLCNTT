<script setup>
defineProps({
  imgSrc: String,
  description: String
});
</script>

<template>
  <div class="col">
    <div class="card">
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img :src="imgSrc" class="img-fluid" />
        <a href="#!">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
        </a>
      </div>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">{{ description }}</p>
        <a class="btn btn-primary">Button</a>
      </div>
    </div>
  </div>
</template>