<script setup>
import { inject } from 'vue'
defineProps({
  product: {
    type: Object,
    require: true
  },
  addToCart: {
    type: Function,
    require: true
  }
})

const hostname = inject("hostname")
</script>

<script>
export default {
  methods: {
    navigateToDetail() {
      this.$router.productDetail = this.product
      this.$router.push(
        {
          name: "productDetail",
          params: {
            id: this.$props.product._id
          }
        }
      )
    }
  }
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
      <p class="card-text">{{ product.description }}</p>
      <div class="row">
        <a class="col btn btn-primary d-flex align-items-center justify-content-center" @click="navigateToDetail()">Xem
          chi tiết</a>
        <a class="col btn btn-primary d-flex align-items-center justify-content-center" @click="addToCart()">Thêm vào
          giỏ hàng</a>
      </div>
    </div>
  </div>
</template>