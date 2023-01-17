<script setup>
defineProps(["target"])
</script>

<template>
  <button type="button" class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#' + target">
    <slot />
  </button>
</template>