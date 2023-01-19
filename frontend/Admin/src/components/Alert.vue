<script>
export default {
  inheritAttrs: false,
  methods: {
    toggle() {
      this.isShowing = !this.isShowing
    }
  },
  data() {
    return {
      isShowing: false
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="slide" mode="out-in">
      <div v-if="isShowing" class="position-relative">
        <div class="alert text-white" role="alert" v-bind="$attrs">
          <span class="close-btn" @click="isShowing = false">&times;</span>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.alert {
  z-index: 999999999999;
  position: absolute;
  right: 20px;
  width: 25%;
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
.slide-enter-active {
  transition: all .5s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

@media screen and (max-width: 680px) {
  .alert {
    width: 100%;
  }
}
</style>