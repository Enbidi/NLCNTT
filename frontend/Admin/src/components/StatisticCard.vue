<script setup>
defineProps(['title', 'content'])
</script>
<template>
  <div class="card bg-primary text-white mb-4">
    <div class="card-body">
      <h5 class="text-white font-weight-bold">{{ title }}</h5>
    </div>
    <div class="card-footer text-end">
      <span class="small text-whitestretched-link text-end">{{ content}}</span>
      <!-- <div class="small text-white"><i class="fas fa-angle-right"></i></div> -->
    </div>
  </div>
</template>