<script >
import NavItem from './NavItem.vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { useAuthStore } from '../stores/auth'

export default {
  components: {
    NavItem,
    DropDown,
    DropDownItem
  },
  setup() {
    const authStore = useAuthStore()
    authStore.fetchAuthInfo()
    return {
      authStore
    }
  },
  methods: {
    async logout() {
      let res = await fetch('http://localhost:3000/logout')
      if (!res.ok) {
        let err = await res.json()
        console.log(err)
      }
      this.authStore.isAuthenticated = false
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Trang chủ</a>
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <NavItem path="/product">
            Sản phẩm
          </NavItem>
          <NavItem path="/product/:id">
            Chi tiết sản phẩm
          </NavItem>
          <NavItem path="/cart">
            Giỏ hàng
          </NavItem>
          <template v-if="authStore.isAuthenticated">
            <DropDown :btn-name="'Xin chào, ' + authStore.lastname">
              <DropDownItem>
                Cài đặt
              </DropDownItem>
              <DropDownItem>
                Lịch sử mua hàng
              </DropDownItem>
              <template #footer>
                <DropDownItem @click="logout()">
                  Đăng xuất
                </DropDownItem>
              </template>
            </DropDown>
          </template>
          <template v-else>
            <NavItem path="/login">
              Đăng nhập
            </NavItem>
            <NavItem path="/signup">
              Đăng kí
            </NavItem>
          </template>
        </ul>
      </div>
      <form class="d-flex input-group w-auto">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" />
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </form>
    </div>
  </nav>
</template>