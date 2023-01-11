<script setup>
defineProps(["id", "parentId"])
</script>

<template>
  <div class="collapse" :id="id" aria-labelledby="headingOne" :data-bs-parent="'#' + parentId">
    <nav class="sb-sidenav-menu-nested nav">
      <slot></slot>
    </nav>
  </div>
</template>