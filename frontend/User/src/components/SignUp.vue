<script setup>
import { inject } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAlertsStore } from '../stores/alerts'
import { convertFormDataToJSON, wait } from '../utils'
import { useRouter } from 'vue-router'

const alertsStore = useAlertsStore()
const authStore = useAuthStore()
const isLoading = inject('isLoading')
const router = useRouter()
async function signUp(event) {
  isLoading.value = true
  var url = import.meta.env.VITE_SIGNUP_URL
  var formData = new FormData(event.target)
  var formDataJSON = convertFormDataToJSON(formData)
  var fetchOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formDataJSON
  }
  var [response, _] = await Promise.all([alertsStore.callAPI('warning', url, fetchOpts, false), wait(700)])
  isLoading.value = false
  if (response == undefined || !response.ok) {
    return
  }
  alertsStore.clear()
  authStore.isAuthenticated = true
  alertsStore.push({
    content: 'Đăng kí thành công',
    type: 'success'
  })
  router.push({
    name: 'login',
    replace: true
  })
}
</script>

<script>
import { Input } from 'mdb-ui-kit'
export default {
  mounted() {
    this.$el.querySelectorAll('.form-outline').forEach(
      formOutline => {
        new Input(formOutline).init();
      }
    )
  }
}
</script>

<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
                <p class="text-white-50 mb-5">Vui lòng nhập email và mật khẩu!</p>

                <form @submit.prevent="signUp($event)" method="POST">
                  <div class="form-outline form-white mb-4">
                    <input type="text" id="firstname" class="form-control form-control-lg" name="firstname" />
                    <label class="form-label" for="firstname">Họ</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input type="text" id="lastname" class="form-control form-control-lg" name="lastname" />
                    <label class="form-label" for="lastname">Tên</label>
                  </div>
                  <select class="form-select mb-4 bg-dark text-white" name="sex">
                    <option selected>Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                  <div class="form-outline form-white mb-4">
                    <input type="text" id="number" class="form-control form-control-lg" name="number" />
                    <label class="form-label" for="number">Số điện thoại</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input type="email" id="email" class="form-control form-control-lg" name="email" />
                    <label class="form-label" for="email">Email</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input type="password" id="password" class="form-control form-control-lg" name="password" />
                    <label class="form-label" for="password">Mật khẩu</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input type="password" id="retypePassword" class="form-control form-control-lg"
                      name="passwordConfirmation" />
                    <label class="form-label" for="retypePassword">Nhập lại mật khẩu</label>
                  </div>

                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Quên mật khẩu?</a></p>

                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Đăng nhập</button>
                </form>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                  <a class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a class="text-white"><i class="fab fa-google fa-lg"></i></a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- <style>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style> -->