<script>
import { Input } from 'mdb-ui-kit'
import { useAuthStore } from '../stores/auth'
import { useAlertsStore } from '../stores/alerts'
import { convertFormDataToJSON, wait } from '../utils'
export default {
  inject: ['isLoading'],
  setup() {
    const authStore = useAuthStore()
    const alertsStore = useAlertsStore()
    authStore.$subscribe((_, state) => {
      localStorage.setItem('isSignedIn', state.isAuthenticated)
    }, { detached: true })
    return { authStore, alertsStore }
  },
  mounted: function () {
    this.$el.querySelectorAll('.form-outline').forEach(
      formOutline => {
        new Input(formOutline).init();
      }
    )
  },
  methods: {
    async loginAPI(event) {
      this.isLoading = true
      var formData = new FormData(event.target)
      var formDataJSON = convertFormDataToJSON(formData)
      var [response, _] = await Promise.all([fetch(import.meta.env.VITE_SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formDataJSON
      }), wait(700)])
      this.isLoading = false
      if (!response.ok) {
        this.alertsStore.push(
          response.status == 401
            ? { content: 'Tên đăng nhập hoặc mật khẩu không đúng', type: 'danger' }
            : { content: 'Đăng nhập thành công', type: 'success' }
        )
      }
      this.alertsStore.clear()
      this.alertsStore.push({
        content: 'Đăng nhập thành công',
        type: 'success'
      })
      // this.authStore.isAuthenticated = true
      this.authStore.fetchAuthInfo()
      this.$router.push({
        name: 'product',
        replace: true
      })
    }
  },
};
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

                <form action="/login" method="POST" @submit.prevent="loginAPI($event)">
                  <div class="form-outline form-white mb-4">
                    <input type="email" id="email" class="form-control form-control-lg" name="email" />
                    <label class="form-label" for="email">Email</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" id="password" class="form-control form-control-lg" name="password" />
                    <label class="form-label" for="password">Mật khẩu</label>
                  </div>

                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Quên mật khẩu?</a></p>

                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Đăng nhập</button>
                </form>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="http://localhost:3000/oauth2/login/federated/facebook" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                  <a class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a href="http://localhost:3000/oauth2/login/federated/google" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                </div>

              </div>

              <div>
                <p class="mb-0">Không có tài khoản? <a href="javascript:void(0)" class="text-white-50 fw-bold" @click="isLogging=false">Đăng ký</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>