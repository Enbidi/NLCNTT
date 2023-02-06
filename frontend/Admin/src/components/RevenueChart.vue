<script setup>
import { computed } from 'vue'
import ChartWrapper from './ChartWrapper.vue';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

import { useStatisticsStore } from '../stores/statistics'
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const statisticsStore = useStatisticsStore()
const data = computed(() => {
  return {
    labels: statisticsStore.bills.map(bill => `Tháng ${bill._id}`),
    datasets: [{
      label: 'Doanh thu',
      backgroundColor: '#f87979',
      data: statisticsStore.bills.map(bill => bill.revenueInMonth)
    }]
  }
})
statisticsStore.fetchBills()
</script>

<template>
  <ChartWrapper>
    <Suspense>
      <Line id="revenueLineChart" :data="data" />
    </Suspense>
    <!-- <Line v-if="statisticsStore.bills && statisticsStore.bills.length != 0" id="revenueLineChart" :data="data"/> -->
  </ChartWrapper>
</template>