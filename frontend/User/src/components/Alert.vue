<script setup>
import { onMounted } from 'vue'
import { useAlertsStore } from '../stores/alerts'
const alertsStore = useAlertsStore()
onMounted(() => {
  setTimeout(() => alertsStore.items = [], 5000)
})
</script>

<template>
  <TransitionGroup v-if="alertsStore.items" name="slide" tag="div" class="alert-container">
    <template v-for="item in alertsStore.items" :key="item">
      <div class="alert" :class="'alert-' + item.type ?? 'warning'" role="alert">
        {{ item.content }}
        <span class="close-btn" @click="alertsStore.remove(item)">&times;</span>
      </div>
    </template>
  </TransitionGroup>
</template>

<style scoped>
.alert-container {
  position: fixed;
  bottom: 20px;
  right: 10px;
}

.alert {
  z-index: 999999999999;
}

.close-btn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.close-btn:hover {
  color: black;
}

.slide-leave-active,
.slide-enter-active,
.slide-move {
  transition: all .5s ease-out;
}

.slide-leave-active {
  position: absolute;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media screen and (max-width: 680px) {
  .alert {
    width: 100%;
  }
}
</style>