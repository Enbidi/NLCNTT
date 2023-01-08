<script setup>
defineProps({
  path: String,
  active: Boolean
})
</script>

<template>
  <li class="nav-item">
    <a class="nav-link" :class="{active}">
      <router-link :to="path"><slot></slot></router-link>
    </a>
  </li>
</template>