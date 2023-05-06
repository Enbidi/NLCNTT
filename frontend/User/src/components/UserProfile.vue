<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAlertsStore } from '../stores/alerts'
import { Input } from 'mdb-ui-kit'

const authStore = useAuthStore()
const alertsStore = useAlertsStore()

const oldPassword = ref(null)
const newPassword = ref(null)
const confirmPassword = ref(null)

const oldPassVal = ref(null)
const newPassVal = ref(null)
const confirmPassVal = ref(null)

onMounted(() => {
  new Input(oldPassword.value).init()
  new Input(newPassword.value).init()
  new Input(confirmPassword.value).init()
})

async function changePassword(oldPassword, newPassword, newPasswordConfirmation) {
  if (authStore.isAuthenticated == false) return
  const response = await fetch('http://localhost:3000/user/settings/change_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      old_password: oldPassVal.value,
      new_password: newPassVal.value,
      confirm_password: confirmPassVal.value
    })
  })
  const data = await response.json()
  if (!response.ok) {
    alertsStore.push(data.message, 'warning')
    return
  }
  alertsStore.push(data.message, 'success')
}
</script>

<template>
  <!-- style="background-color: #f4f5f7" -->
  <section class="vh-100 bg-primary">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-6 mb-4 mb-lg-0">
          <div class="card mb-3" style="border-radius: .5rem;">
            <div class="row g-0">
              <div class="col-md-4 gradient-custom text-center text-white"
                style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar"
                  class="img-fluid my-5" style="width: 80px;" />
                <p>Khách hàng</p>
                <h5>{{ authStore.firstname + ' ' + authStore.lastname }}</h5>
                <i class="far fa-edit mb-5"></i>
              </div>
              <div class="col-md-8">
                <div class="card-body p-4">
                  <h6>Thông tin liên hệ</h6>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Email</h6>
                      <p class="text-muted">{{ authStore.email }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Phone</h6>
                      <p class="text-muted">{{ authStore.number }}</p>
                    </div>
                  </div>
                  <h6>Thông tin cá nhân</h6>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Giới tính</h6>
                      <p class="text-muted">{{ authStore.sex == 'male' ? 'Name' : 'Nữ' }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      
                    </div>
                  </div>
                  <div class="row justify-content-start">
                    <h6 class="h-6">Đổi mật khẩu</h6>
                    <!-- <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                    <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                    <a href="#!"><i class="fab fa-instagram fa-lg"></i></a> -->
                    <div class="col">
                      <div class="form-outline" ref="oldPassword">
                        <input type="password" id="old_password" class="form-control" v-model="oldPassVal"/>
                        <label class="form-label" for="old_password">Mật khẩu cũ</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row">
                      <div class="col-12 form-outline ms-1" ref="newPassword">
                        <input type="password" id="new_password" class="form-control" v-model="newPassVal"/>
                        <label class="form-label" for="new_password">Mật khẩu mới</label>
                      </div>
                      <div class="col-12 mt-1 form-outline ms-1" ref="confirmPassword">
                        <input type="password" id="confirm_password" class="form-control" v-model="confirmPassVal"/>
                        <label class="form-label" for="confirm_password">Mật khẩu mới</label>
                      </div>
                      <div class="col-12 pt-1 pe-0 text-end" >
                        <button class="me-0 btn btn-primary" @click="changePassword(oldPassVal, newPassVal, confirmPassVal)">Xác nhận</button>
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

<style scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #f6d365;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))
}
</style>