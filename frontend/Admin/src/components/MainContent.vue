<script setup>
import DataTable from './DataTable.vue'
import StatisticCard from './StatisticCard.vue'
import DashBoard from './DashBoard.vue'
import Origin from './Origin.vue'
import Branch from './Branch.vue'
import Product from './Product.vue'
import Bill from './Bill.vue'
</script>


<template>
  <div>
    <main>
      <div class="container-fluid px-4">
        <Product />
      </div>
    </main>
    <footer class="py-4 bg-light mt-auto">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between small">
          <div class="text-muted">Copyright &copy; Your Website 2022</div>
          <div>
            <a href="#">Privacy Policy</a>
            &middot;
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>