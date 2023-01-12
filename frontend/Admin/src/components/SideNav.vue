<script setup>
import Collapse from './Collapse.vue'
import NavLink from './NavLink.vue'
</script>

<template>
  <div>
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <a class="nav-link" href="index.html">
            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
            Dashboard
          </a>
          <NavLink>
            <template v-slot:icon>
              <i class="fas fa-tachometer-alt"></i>
            </template>
            Dashboard
          </NavLink>
          <div class="sb-sidenav-menu-heading">Interface</div>
          <NavLink class="collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#demoCollapse"
            aria-expanded="false" aria-controls="demoCollapse">
            <template v-slot:icon>
              <i class="fas fa-columns"></i>
            </template>
            Bảng Dữ Liệu
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </NavLink>
          <Collapse id="demoCollapse" parentId="sidenavAccordion">
            <template v-slot:default>
              <a class="nav-link" href="layout-static.html">Người dùng</a>
              <a class="nav-link" href="layout-sidenav-light.html">Sản phẩm</a>
              <a class="nav-link" href="layout-sidenav-light.html">Hóa Đơn</a>
              <a class="nav-link" href="layout-sidenav-light.html">Bình luận</a>
              <a class="nav-link" href="layout-sidenav-light.html">Nhãn hiệu</a>
              <a class="nav-link" href="layout-sidenav-light.html">Xuất sứ</a>

            </template>
          </Collapse>
          <NavLink class="collapsed" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#demo2"
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
          </Collapse>
          <div class="sb-sidenav-menu-heading">Addons</div>
          <NavLink>
            <template v-slot:icon>
              <i class="fas fa-chart-area"></i>
            </template>
            Charts
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