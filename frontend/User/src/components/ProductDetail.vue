<script setup>
import CommentContainer from './CommentContainer.vue'

import { inject } from 'vue'

import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart';
defineProps(["test", "dummy"])
const hostname = inject("hostname")
const productStore = useProductStore()
const cartStore = useCartStore()

</script>

<template>
  <div class="container px-4 px-lg-5 bg-white">
    <div class="row gx-4 gx-lg-5 align-items-center">
      <div class="col-md-6">
        <img class="card-img-top mb-5 mb-md-0 img-fluid" :src="hostname + productStore.data.img" alt="..."
          crossorigin="anonymous" />
      </div>
      <div class="col-md-6">
        <div class="small mb-1">{{ productStore.data.branch.name }}</div>
        <h1 class="display-5 fw-bolder">{{ productStore.data.name }}</h1>
        <div class="fs-5 mb-5">
          <span class="text-decoration-line-through">{{ productStore.data.price }}</span>
          <span>{{ productStore.data.price }}</span>
        </div>
        <p class="lead">
          {{ productStore.data.description }}
        </p>
        <div class="d-flex">
          <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1"
            style="max-width: 3rem" />
          <button class="btn btn-outline-dark flex-shrink-0" type="button">
            <i class="bi-cart-fill me-1" @click="cartStore.addToCart(productStore.data)"></i>
            Add to cart
          </button>
        </div>
      </div>
      <div class="col-12">
        <CommentContainer />
      </div>
    </div>
  </div>
</template>