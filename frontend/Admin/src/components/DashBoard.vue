<script setup>
import StatisticCard from './StatisticCard.vue'
import DataTable from './DataTable.vue'
</script>

<template>
  <h1 class="mt-4">Dashboard</h1>
  <ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Dashboard</li>
  </ol>
  <div class="row">
    <div class="col-xl-3 col-md-6">
      <StatisticCard class="bg-primary">
        Primary Card
      </StatisticCard>
    </div>
    <div class="col-xl-3 col-md-6">
      <StatisticCard class="bg-warning">
        Warning Card
      </StatisticCard>
    </div>
    <div class="col-xl-3 col-md-6">
      <StatisticCard class="bg-success">
        Success Card
      </StatisticCard>
    </div>
    <div class="col-xl-3 col-md-6">
      <StatisticCard class="bg-danger">
        Danger Card
      </StatisticCard>
    </div>
  </div>
  <div class="row">
    <div class="col-xl-6">
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-chart-area me-1"></i>
          Area Chart Example
        </div>
        <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
      </div>
    </div>
    <div class="col-xl-6">
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-chart-bar me-1"></i>
          Bar Chart Example
        </div>
        <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
      </div>
    </div>
  </div>
  <DataTable api-url="http://localhost:3000/admin/branches" data-key="branches">
    <template #items="{ _id, name }">
      <td>{{ _id }}</td>
      <td>{{ name }}</td>
    </template>
  </DataTable>
</template>