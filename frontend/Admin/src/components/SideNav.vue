<script setup>
import Collapse from './Collapse.vue'
import NavLink from './NavLink.vue'
</script>

<template>
  <div>
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Chủ yếu</div>
          <NavLink>
            <template v-slot:icon>
              <i class="fas fa-tachometer-alt"></i>
            </template>
            <router-link to="/" class="nav-link">Dashboard</router-link>
          </NavLink>
          <div class="sb-sidenav-menu-heading">DỮ LIỆU</div>
          <NavLink class="collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#demoCollapse"
            aria-expanded="false" aria-controls="demoCollapse">
            <template v-slot:icon>
              <i class="fas fa-columns"></i>
            </template>
            Bảng dữ liệu
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </NavLink>
          <Collapse id="demoCollapse" parentId="sidenavAccordion">
            <template v-slot:default>
              <router-link to="/users" class="nav-link">Người dùng</router-link>
              <router-link to="/products" class="nav-link">Sản phẩm</router-link>
              <router-link to="bills" class="nav-link">Hóa Đơn</router-link>
              <router-link to="" class="nav-link">Bình luận</router-link>
              <router-link to="/branches" class="nav-link">Nhãn hiệu</router-link>
              <router-link to="/origins" class="nav-link">Xuất sứ</router-link>
              <router-link to="/sales" class="nav-link">Khuyến mãi</router-link>
            </template>
          </Collapse>
          <!-- <NavLink class="collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#demo2"
            aria-expanded="false" aria-controls="demo2">
            <template v-slot:icon>
              <i class="fas fa-book-open"></i>
            </template>
            Pages
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </NavLink>
          <Collapse id="demo2" parent-id="sidenavAccordion" collapse-title="Pages">
            <NavLink class="collapsed" href="javascript:void(0)" data-bs-toggle="collapse"
              data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
              Authentication
              <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
            </NavLink>
            <Collapse id="pagesCollapseAuth" parent-id="sidenavAccordionPages">
              <a class="nav-link" href="login.html">Login</a>
              <a class="nav-link" href="register.html">Register</a>
              <a class="nav-link" href="password.html">Forgot Password</a>
            </Collapse>
            <NavLink class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError"
              aria-expanded="false" aria-controls="pagesCollapseError">
              Error
              <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
            </NavLink>
            <Collapse id="pagesCollapseError" parent-id="sidenavAccordionPages">
              <a class="nav-link" href="401.html">401 Page</a>
              <a class="nav-link" href="404.html">404 Page</a>
              <a class="nav-link" href="500.html">500 Page</a>
            </Collapse>
          </Collapse> -->
          <div class="sb-sidenav-menu-heading">Quản lí thu chi</div>
          <NavLink>
            <template v-slot:icon>
              <i class="fas fa-chart-area"></i>
            </template>
            Chi trả
          </NavLink>
          <NavLink>
            <template v-slot:icon>
              <i class="fas fa-table"></i>
            </template>
            Tables
          </NavLink>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        Start Bootstrap
      </div>
    </nav>
  </div>
</template>