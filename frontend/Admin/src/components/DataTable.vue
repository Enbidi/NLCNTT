<script setup>
import SmartTable from 'vuejs-smart-table'
import { useFetch } from '@vueuse/core'
defineProps(["url"])
</script>

<script>
export default {
  created() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => this.branches = data.branches)
  },
  mounted() {
    this.$el.querySelectorAll('.form-outline').forEach(
      formOutline => {
        new mdb.Input(formOutline).init();
      }
    )
  },
  data() {
    return {
      branches: [],
      filters: {
        name: { value: '', keys: ['name'] }
      },
      currentPage: 1,
      totalPages: 1
    }
  }
}
</script>

<template>
  <div>
    <div class="form-outline">
      <input type="text" class="form-control" id="filter" v-model="filters.name.value" />
      <label class="form-label" for="filter">Lọc bằng tên</label>
    </div>
    <VTable class="table table-striped"
      :data="branches"
      :filters="filters"
      :page-size="2"
      v-model:currentPage="currentPage"
      @totalPagesChanged="totalPages = $event">
      <template #head>
        <!-- <tr>
          <th>Id</th>
          <th>Name</th>
        </tr> -->
        <VTh sortKey="_id">Id</VTh>
        <VTh sortKey="name">Tên</VTh>
      </template>
      <template #body="{ rows }">
        <tr v-for="row in rows" :key="row._id">
          <td>{{ row._id }}</td>
          <td>{{ row.name }}</td>
        </tr>
      </template>
    </VTable>
    <VTPagination v-model:currentPage="currentPage" :total-pages="totalPages" :boundary-link="true" />
  </div>
</template>