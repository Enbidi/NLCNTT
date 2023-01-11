<script setup>
defineProps(["href"]);
</script>

<template>
  <li class="nav-item">
    <a class="nav-link text-white " :href="href">
      <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
        <i class="material-icons opacity-10">table_view</i>
      </div>
      <span class="nav-link-text ms-1"><slot></slot></span>
    </a>
  </li>
</template>