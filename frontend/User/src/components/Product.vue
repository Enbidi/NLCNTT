<script setup>
import { inject } from 'vue'

import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    require: true
  }
})

const hostname = inject("hostname")
const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

function navigateToDetail() {
  productStore.data = props.product
  router.push(
    {
      name: "productDetail",
      params: {
        id: props.product._id
      }
    }
  )
}
</script>

<template>
  <div class="card">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
      <img :src="hostname + product.img" class="img-fluid" crossorigin="anonymous" />
      <a href="javascript:void(0)">
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </a>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">
        <template v-if="product.inSales?.length > 0">
          <p class="text-success">Sản phẩm đang khuyến mãi</p>
        </template>
      <p>{{ product.description }}</p>
      </p>
      <div class="row">
        <a class="col btn btn-primary d-flex align-items-center justify-content-center" @click="navigateToDetail()">Xem
          chi tiết</a>
        <a class="col btn btn-primary d-flex align-items-center justify-content-center"
          @click="cartStore.addToCart(product)">Thêm vào
          giỏ hàng</a>
      </div>
    </div>
  </div>
</template>