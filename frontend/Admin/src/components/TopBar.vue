<script setup>
import { ref } from 'vue'
import { useSearchStore } from '../stores/search';

const searchVal = ref('');

const searchStore = useSearchStore();
const toggleSideBar = () => {
  document.body.classList.toggle("sb-sidenav-toggled");
}
</script>

<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="index.html">Admin Page</a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="javascript:void(0)" @click="toggleSideBar"><i
        class="fas fa-bars"></i></button>
    <!-- Navbar Search-->
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Tìm kiếm bằng tên..." aria-label="Search for..."
          aria-describedby="btnNavbarSearch" v-model.lazy="searchVal"/>
        <button class="btn btn-primary" id="btnNavbarSearch" type="button" @click="searchStore.val=searchVal"><i class="fas fa-search"></i></button>
      </div>
    </form>
    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
          aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#!">Settings</a></li>
          <li><a class="dropdown-item" href="#!">Activity Log</a></li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li><a class="dropdown-item" href="/auth/logout">Logout</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>