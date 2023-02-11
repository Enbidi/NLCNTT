<script setup>
import StatisticCard from './StatisticCard.vue'
import RevenueChart from './RevenueChart.vue'
import UserRegistrationChart from './UserRegistrationChart.vue'
import { useSizesStore } from '../stores/sizes'
import { useStatisticsStore } from '../stores/statistics'
const sizesStore = useSizesStore()
const statisticsStore = useStatisticsStore()
statisticsStore.fetchNumericalDatas()
</script>

<template>
  <div>
    <h1 class="mt-4">Dashboard</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <StatisticCard class="bg-primary" content="Tổng số người dùng" :title="statisticsStore.totalUser">
        </StatisticCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatisticCard class="bg-warning" content="Doanh thu trong tháng này" :title="statisticsStore.revenueInCurrentMonth">
        </StatisticCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatisticCard class="bg-success" content="Tổng số sản phẩm" :title="statisticsStore.totalProduct"/>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatisticCard class="bg-danger" content="Tổng số nhãn hiệu" :title="statisticsStore.totalBranch"/>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <RevenueChart/>
      </div>
      <div class="col-xl-6">
        <UserRegistrationChart/>
      </div>
    </div>
  </div>
</template>