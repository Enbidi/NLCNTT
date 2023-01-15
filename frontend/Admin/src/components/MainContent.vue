<template>
  <div>
    <main>
      <div class="container-fluid px-4">
        <!-- <User /> -->
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>
    <footer class="py-4 bg-light mt-auto">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between small">
          <div class="text-muted">Copyright &copy; Your Website 2022</div>
          <div>
            <a href="#">Privacy Policy</a>
            &middot;
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fade-leave-active, .fade-enter-active {
  transition: all .3s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>