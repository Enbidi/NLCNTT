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
    labels: statisticsStore.users.map(user => `Tháng ${user._id}`),
    datasets: [{
      label: 'Số lượt đăng kí',
      backgroundColor: '#f87979',
      data: statisticsStore.users.map(user => user.count)
    }]
  }
})
statisticsStore.$subscribe((_, state) => {
  console.log('Logged', state)
})
statisticsStore.fetchUsers()
</script>

<template>
  <ChartWrapper>
    <Suspense>
      <Line id="userCreationChart" :data="data" />
    </Suspense>
    <!-- <Line v-if="statisticsStore.bills && statisticsStore.bills.length != 0" id="revenueLineChart" :data="data"/> -->
  </ChartWrapper>
</template>