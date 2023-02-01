<script setup>
import { ref, watch } from 'vue'
import CartItem from './CartItem.vue'

import { useCartStore } from '../stores/cart'
import { useAlertsStore } from '../stores/alerts'
const cartStore = useCartStore()

const cardType = ref(null)
const cardNumber = ref(null)
const expiration = ref(null)
var expirationDate
watch(expiration, newVal => {
  if (isNaN(Date.parse(expiration.value))) {
    return
  }
  expirationDate = new Date(newVal)
})

const cvv = ref(null)

async function order() {
  const details = cartStore.items.map(item => ({
    product: item._id,
    quantity: item.quantity
  }))
  const creditCard = {
    cardType: cardType.value,
    cardNumber: cardNumber.value,
    expiration: expirationDate,
    cvv: cvv.value
  }
  var response = await fetch('http://localhost:3000/user/bill/add', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cardType: cardType.value,
      cardNumber: cardNumber.value,
      expiration: expirationDate,
      details,
      creditCard
    })
  })
  if (!response.ok) {
    return
  }
}
</script>


<template>
  <section class="h-100 h-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card">
            <div class="card-body p-4">

              <div class="row">

                <div class="col-lg-7">
                  <h5 class="mb-3"><a href="#!" class="text-body"><i
                        class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                  <hr>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p class="mb-1">Giỏ hàng</p>
                      <p class="mb-0">Bạn có {{ cartStore?.items.length }} trong giỏ hàng</p>
                    </div>
                    <div>
                      <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                            class="fas fa-angle-down mt-1"></i></a></p>
                    </div>
                  </div>
                  <CartItem v-for="item in cartStore.items" :product="item" :key="item._id" />
                  <!-- 
                  <CartItem img-src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    name="Iphone 11 pro"
                    description="256GB, Navy Blue"/>

                  <CartItem img-src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                    name="Samsung galaxy Note 10"
                    description="256GB, Navy Blue"/> -->

                  <!-- <CartItem img-src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp" name="Canon EOS M50" description="Onyx Black"/> -->

                  <!-- <div class="card mb-3 mb-lg-0">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                          <div>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                              class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                          </div>
                          <div class="ms-3">
                            <h5>MacBook Pro</h5>
                            <p class="small mb-0">1TB, Graphite</p>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div style="width: 50px;">
                            <h5 class="fw-normal mb-0">1</h5>
                          </div>
                          <div style="width: 80px;">
                            <h5 class="mb-0">$1799</h5>
                          </div>
                          <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>

                <!-- Pills navs -->
                <!-- Pills navs -->

                <!-- Pills content -->

                <!-- Pills content -->

                <div class="col-lg-5">
                  <div class="card bg-primary text-white rounded-3">
                    <div class="card-header">
                      <ul class="nav nav-pills mb-3 row" id="pMethods" role="tablist">
                        <li class="nav-item col px-0" role="presentation">
                          <a class="nav-link active" id="pMethods-tab-1" data-mdb-toggle="pill" href="#pMethods-pills-1"
                            role="tab" aria-controls="ex1-pills-1" aria-selected="true">Thanh toán qua thẻ</a>
                        </li>
                        <li class="nav-item col px-0" role="presentation">
                          <a class="nav-link" id="pMethods-tab-2" data-mdb-toggle="pill" href="#pMethods-pills-2"
                            role="tab" aria-controls="ex1-pills-2" aria-selected="false" style="font-size: 11px">Thanh
                            toán khi nhận hàng</a>
                        </li>
                      </ul>
                    </div>
                    <div class="card-body">
                      <div class="tab-content" id="pMethods-content">
                        <div class="tab-pane fade show active" id="pMethods-pills-1" role="tabpanel"
                          aria-labelledby="pMethods-tab-1">
                          <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="mb-0">Chi tiết thẻ</h5>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              class="img-fluid rounded-3" style="width: 45px;" alt="Avatar">
                          </div>
                          <form @submit.prevent="submitBill($event)">
                            <p class="ms-2 small mb-2">Loại thẻ</p>

                            <div class="mb-5 ms-2">
                              <div class="form-check float-start">
                                <input class="form-check-input" type="radio" name="cardType" value="mastercard"
                                  id="pOption1" v-model="cardType">
                                <label class="form-check-label" for="pOption1">
                                  <a href="javascript:void(0)" type="submit" class="text-white"><i
                                      class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                                </label>
                              </div>
                              <div class="form-check float-start">
                                <input class="form-check-input" type="radio" name="cardType" value="visa" id="pOption2"
                                  v-model="cardType">
                                <label class="form-check-label" for="pOption2">
                                  <a href="javascript:void(0)" type="submit" class="text-white"><i
                                      class="fab fa-cc-visa fa-2x me-2"></i></a>
                                </label>
                              </div>
                              <div class="form-check float-start">
                                <input class="form-check-input" type="radio" name="cardType" value="amex" id="pOption3"
                                  v-model="cardType">
                                <label class="form-check-label" for="pOption3">
                                  <a href="javascript:void(0)" type="submit" class="text-white"><i
                                      class="fab fa-cc-amex fa-2x me-2"></i></a>
                                </label>
                              </div>
                              <div class="form-check float-start">
                                <input class="form-check-input" type="radio" name="cardType" value="paypal" id="pOption4"
                                  checked v-model="cardType">
                                <label class="form-check-label" for="pOption4">
                                  <a href="javascript:void(0)" type="submit" class="text-white"><i
                                      class="fab fa-cc-paypal fa-2x"></i></a>
                                </label>
                              </div>
                            </div>
                            <div class="form-outline form-white mb-4 float-none">
                              <input type="text" id="holderName" class="form-control form-control-lg" siez="17"
                                placeholder="Cardholder's Name" />
                              <label class="form-label" for="holderName">Tên người sở hữu</label>
                            </div>

                            <div class="form-outline form-white mb-4">
                              <input type="text" id="cardNumber" class="form-control form-control-lg" siez="17"
                                placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" v-model="cardNumber"/>
                              <label class="form-label" for="cardNumber">Số thẻ</label>
                            </div>

                            <div class="row mb-4">
                              <div class="col-md-6">
                                <div class="form-outline form-white">
                                  <input type="text" id="expiration" class="form-control form-control-lg"
                                    placeholder="MM/YYYY" size="7" minlength="7" maxlength="12" v-model="expiration"/>
                                  <label class="form-label" for="expiration">Expiration</label>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-outline form-white">
                                  <input type="password" id="cvv" class="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3"
                                    v-model="cvv"/>
                                  <label class="form-label" for="cvv">Cvv</label>
                                </div>
                              </div>
                            </div>

                          </form>

                          <hr class="my-4">

                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Hóa đơn</p>
                            <p class="mb-2">{{ cartStore.totalPrice }} VND</p>
                          </div>

                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Chi phí giao hàng</p>
                            <p class="mb-2">$20.00</p>
                          </div>

                          <div class="d-flex justify-content-between mb-4">
                            <p class="mb-2">Tổng hóa đơn</p>
                            <p class="mb-2">{{ cartStore.totalPrice + 200 }}</p>
                          </div>

                          <button type="button" class="btn btn-info btn-block btn-lg" @click="order()">
                            <div class="d-flex justify-content-between">
                              <span>$4818.00</span>
                              <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                            </div>
                          </button>
                        </div>
                        <div class="tab-pane fade" id="pMethods-pills-2" role="tabpanel"
                          aria-labelledby="pMethods-tab-2">
                          Tab 2 content
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>