<script setup>
import CommentContainer from './CommentContainer.vue'
import RatingInput from './RatingInput.vue'
import { inject, provide, ref, watch } from 'vue'

import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const hostname = inject("hostname")
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const rating = ref(0)
const quantity = ref(1)
provide('ratingStars', rating)
authStore.fetchAuthInfo()
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
        <RatingInput @rating-change="stars => rating = stars" class="mx-1 ms-0" />
        <div class="fs-5 mb-5">
          <span class="text-decoration-line-through">{{ productStore.data.price }}</span>
          <span>{{ productStore.data.price }}</span>
        </div>
        <p class="lead">
          {{ productStore.data.description }}
        </p>
        <div class="d-flex">
          <input class="form-control text-center me-3" type="num" v-model="quantity"
            style="max-width: 3rem" />
          <button class="btn btn-outline-dark flex-shrink-0" type="button" @click="cartStore.addToCart(productStore.data, quantity)">
            <i class="bi-cart-fill me-1" @click="cartStore.addToCart(productStore.data)"></i>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <div class="col-12">
        <CommentContainer :product-id="productStore.data._id"/>
      </div>
    </div>
  </div>
</template>