<script setup>
import { ref } from 'vue'

defineProps(["branchName"])

const active = ref(false)

</script>

<template>
  <li class="list-group-item list-group-item-action px-3 border-0 ripple list-group-item-secondary"
    :class="{ active }"
    :aria-current="active ? 'true' : ''"
    @mouseenter="active=true"
    @mouseleave="active=false">
    {{ branchName }}
  </li>
</template>