<script setup>
defineProps({
  groupClass: String,
  inputClass: String,
  inputId: String,
  inputType: String,
  labelClass: String,
  labelContent: String
});
</script>

<template>
  <div :class="groupClass">
    <input :type="inputType" :id="inputId" :class="inputClass" />
    <label :class="labelClass" :for="inputId">{{ labelContent }}</label>
  </div>
</template>