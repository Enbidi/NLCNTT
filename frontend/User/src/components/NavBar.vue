<script >
import NavItem from './NavItem.vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import BillHistory from './BillHistory.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import { useAuthStore } from '../stores/auth'
import { useSearchResultStore } from '../stores/searchResult'

export default {
  components: {
    NavItem,
    DropDown,
    DropDownItem,
    BillHistory,
    ModalTriggerButton
  },
  setup() {
    const authStore = useAuthStore()
    // authStore.$subscribe((a, b) => console.log(a, b), { detached: true })
    const searchResultStore = useSearchResultStore()
    authStore.fetchAuthInfo()
    return {
      authStore,
      searchResultStore
    }
  },
  methods: {
    async logout() {
      let res = await fetch(import.meta.env.VITE_LOGOUT_URL)
      if (!res.ok) {
        let err = await res.json()
        console.log(err)
      }
      this.authStore.isAuthenticated = false
    }
  },
  data() {
    return {
      searchString: ''
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Trang chủ</router-link>
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <NavItem path="/product">
            Sản phẩm
          </NavItem>
          <!-- <NavItem path="/product/:id">
            Chi tiết sản phẩm
          </NavItem> -->
          <NavItem path="/cart">
            Giỏ hàng
          </NavItem>
          <template v-if="authStore.isAuthenticated">
            <DropDown :btn-name="'Xin chào, ' + authStore.lastname">
              <DropDownItem>
                <NavItem path="/userprofile">
                  Thông tin người dùng
                </NavItem>
              </DropDownItem>
              <DropDownItem>
                  <a class="nav-link text-primary" data-mdb-toggle="modal" data-mdb-target="#billHistoryModal">
                    Lịch sử mua hàng
                  </a>
                <!-- <ModalTriggerButton target="billHistoryModal" content="Lịch sử mua hàng"/> -->
                <BillHistory />
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
        <input type="search" class="form-control rounded" placeholder="Tìm kiếm" aria-label="Search"
          aria-describedby="search-addon" v-model.lazy="searchString" />
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search cursor-pointer" style="cursor: pointer"
            @click="searchResultStore.search(searchString)"></i>
        </span>
      </form>
    </div>
  </nav>
</template>