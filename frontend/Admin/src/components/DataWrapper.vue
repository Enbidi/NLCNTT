<script setup>
// defineProps(["apiUrl", "dataKey", "repr"])
defineProps({
  apiUrl: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  created() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => this.data = data)
  },
  data() {
    return {
      data: []
    }
  }
}
</script>

<template>
  <slot v-bind="data" />
</template>