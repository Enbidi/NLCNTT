<script setup>
import Nav from './components/Nav.vue';
import TopBar from './components/TopBar.vue';
import SideNav from './components/SideNav.vue';
import MainContent from './components/MainContent.vue';
import Alert from './components/Alert.vue';
</script>

<template>
  <TopBar />
  <div id="layoutSidenav">
    <SideNav id="layoutSidenav_nav"/>
    <MainContent id="layoutSidenav_content"/>
  </div>
  <Alert/>
</template>