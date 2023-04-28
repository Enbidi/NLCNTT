<script setup>
import { useCartStore } from '../stores/cart'
defineProps(['product'])
const cartStore = useCartStore()
const BASE_URL = import.meta.env.VITE_BASE_URL
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <div>
            <img :src="BASE_URL + product.img"
              class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;" crossorigin="anonymous">
          </div>
          <div class="ms-3">
            <h5>{{ product.name }}</h5>
            <p class="small mb-0">{{ product.description }}</p>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <div class="ms-1" style="width: 50px;">
            <h5 class="fw-normal mb-0">{{ product.quantity }}</h5>
          </div>
          <div style="width: 100px;">
            <h5 class="mb-0">{{ product.price }}</h5>
          </div>
          <a href="javascript:void(0)" @click="cartStore.remove(product)" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>