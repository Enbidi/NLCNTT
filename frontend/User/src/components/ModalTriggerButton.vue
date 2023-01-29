<script setup>
defineProps(["target", "content"])
</script>

<template>
  <button type="button" class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#' + target">
    {{ content }}
  </button>
</template>