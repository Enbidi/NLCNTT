<script setup>
import TableWrapper from './TableWrapper.vue'
</script>

<script>
export default {
  created() {
    fetch("http://localhost:3000/admin/origins")
      .then(res => res.json())
      .then(data => this.origins = data.origins)
  },
  mounted() {
    new mdb.Input(this.$refs.filter).init()
  },
  data() {
    return {
      origins: [],
      filters: {
        name: { value: '', keys: ['name'] }
      },
      selectedRows: [],
      currentPage: 1,
      totalPages: 1
    }
  }
}
</script>

<template>
  <table-wrapper>
    <div class="row mb-3">
      <div class="col-md-10 d-flex justify-content-start">
        <button class="btn btn-primary me-2" @click="$refs.table.selectAll()">Chọn tất cả</button>
        <button class="btn btn-primary" @click="$refs.table.deselectAll()">Hủy chọn tất cả</button>
      </div>
      <div class="col-md-2">
        <div class="form-outline" ref="filter">
          <input type="text" class="form-control" id="filter" v-model="filters.name.value" />
          <label class="form-label" for="filter">Lọc bằng tên</label>
        </div>
      </div>
    </div>
    <VTable class="table table-bordered table-hover" :data="origins" :filters="filters" :page-size="20"
      v-model:currentPage="currentPage" selectionMode="multiple" selectedClass="bg-primary bg-gradient bg-opacity-50"
      @totalPagesChanged="totalPages = $event" @stateChanged="selectedRows = $event.selectedRows" ref="table">
      <template #head="{ allRowsSelected, toggleAllRows }">
        <VTh sortKey="_id">#</VTh>
        <VTh sortKey="country">Quốc gia</VTh>
      </template>
      <template #body="{ rows }">
        <VTr v-for="row in rows" :row="row">
          <td>{{ row._id }}</td>
          <td>{{ row.country }}</td>
        </VTr>
      </template>
    </VTable>
    <strong>Đang chọn:</strong>
    <div v-if="selectedRows.length === 0">Không có hàng nào đang chọn</div>
    <ul>
      <li v-for="selected in selectedRows">
        {{ selected.name }}
      </li>
    </ul>
    <VTPagination v-model:currentPage="currentPage" :total-pages="totalPages" :boundary-link="true"
      class="d-flex justify-content-center" />
  </table-wrapper>
</template>