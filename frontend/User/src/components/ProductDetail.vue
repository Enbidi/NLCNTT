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
  <div class="container my-5 p-5 px-lg-5 bg-white" style="border-radius: 25px;">
    <div class="row gx-4 gx-lg-5 align-items-center">
      <div class="col-md-6">
        <img class="card-img-top mb-5 mb-md-0 img-fluid" :src="hostname + productStore.data.img" alt="..."
          crossorigin="anonymous" />
      </div>
      <div class="col-md-6">
        <div>
          <div class="small mb-1">{{ productStore.data.branch.name }}</div>
          <h1 class="display-5 fw-bolder">{{ productStore.data.name }}</h1>
          <RatingInput @rating-change="stars => rating = stars" class="mx-1 ms-0" />
          <template v-if="productStore.data.inSales?.length > 0">
            <div class="list-grou list-group-light">
              <a v-for="sale in productStore.data.inSales" href="javascript:void(0)"
                class="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-2 list-group-item-secondary">
                Giảm {{ sale.saleType == 'Promotion' ? sale.percent + '%' : sale.value + 'VND' }}
              </a>
            </div>
          </template>
          <div class="fs-5 mb-5">
            <template v-if="productStore.data.inSales && productStore.data.inSales.length != 0">
              <span class="text-decoration-line-through me-2">{{ productStore.data.price }}</span>
            </template>
            <span>{{ productStore.finalPrice }}</span>
          </div>
          <p class="lead">
            <span class="fw-bold">Màn hình</span>: {{ productStore.data.specs.screen }}
          </p>
          <p class="lead">
            <span class="fw-bold">Hệ điều hành</span>: {{ productStore.data.specs.os }}
          </p>
          <p class="lead">
            <span class="fw-bold">Camera sau</span>: {{ productStore.data.specs.backCamera }}
          </p>
          <p class="lead">
            <span class="fw-bold">Camera trước</span>: {{ productStore.data.specs.frontCamera }}
          </p>
          <p class="lead">
            <span class="fw-bold">CPU</span>: {{ productStore.data.specs.chip }}
          </p>
          <p class="lead">
            {{ productStore.data.description }}
          </p>
          <div class="d-flex">
            <input class="form-control text-center me-3" type="num" v-model="quantity" style="max-width: 3rem" />
            <button class="btn btn-outline-dark flex-shrink-0" type="button"
              @click="cartStore.addToCart(productStore.data, quantity)">
              <i class="bi-cart-fill me-1" @click="cartStore.addToCart(productStore.data)"></i>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 mt-5">
        <CommentContainer :product-id="productStore.data._id" />
      </div>
    </div>
  </div>
</template>