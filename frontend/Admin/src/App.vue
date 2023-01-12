<script setup>
import Nav from './components/Nav.vue';
import TopBar from './components/TopBar.vue';
import SideBar from './components/SideNav.vue';
import MainContent from './components/MainContent.vue';
</script>

<template>
  <TopBar />
  <div id="layoutSidenav">
    <SideBar id="layoutSidenav_nav"/>
    <MainContent id="layoutSidenav_content"/>
  </div>
</template>