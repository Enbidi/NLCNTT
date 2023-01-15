<script setup>
import SmartTable from 'vuejs-smart-table'
import { useFetch } from '@vueuse/core'
defineProps(["apiUrl", "dataKey", "repr"])
</script>

<script>
export default {
  created() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => this.data = data[this.dataKey])
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
      data: [],
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
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table me-1"></i>
      Bảng Dữ Liệu
    </div>
    <div class="card-body">
      <div>
        <div class="row mb-3">
          <div class="col-md-10 d-flex justify-content-start">
            <button class="btn btn-primary me-2" @click="$refs.table.selectAll()">Chọn tất cả</button>
            <button class="btn btn-primary" @click="$refs.table.deselectAll()">Hủy chọn tất cả</button>
          </div>
          <div class="col-md-2">
            <div class="form-outline">
              <input type="text" class="form-control" id="filter" v-model="filters.name.value" />
              <label class="form-label" for="filter">Lọc bằng tên</label>
            </div>
          </div>
        </div>
        <VTable class="table table-bordered table-hover" :data="data" :filters="filters" :page-size="20"
          v-model:currentPage="currentPage" selectionMode="multiple" @totalPagesChanged="totalPages = $event"
          @stateChanged="selectedRows = $event.selectedRows" selectedClass="bg-primary bg-gradient bg-opacity-50"
          ref="table" v-bind="$attrs">
          <template #head="{ allRowsSelected, toggleAllRows }">

            <slot name="columnNames" />
            <!-- <VTh sortKey="_id">Id</VTh>
            <VTh sortKey="name">Tên</VTh> -->
          </template>
          <template #body="{ rows }">
            <slot v-for="row in rows" :key="row._id" v-bind="row"/>
            <VTr v-for="row in rows" :key="row._id" :row="row" v-slot="{ isSelected, toggle }">
              {{ isSelected }}
              <td @click="log(toggle)">
                <input type="checkbox" :checked="isSelected" @change="toggle" />
              </td>
              <!-- <td>{{ row._id }}</td>
              <td>{{ row.name }}</td> -->
              <!-- <td><slot v-bind="row" @click="log(toggle)"></slot></td> -->
            </VTr>
          </template>
        </VTable>
        <strong>Đang chọn:</strong>
        <div v-if="selectedRows.length === 0">Không có hàng nào đang chọn</div>
        <ul>
          <li v-for="selected in selectedRows">
            {{ selected[repr] }}
          </li>
        </ul>
        <VTPagination v-model:currentPage="currentPage" :total-pages="totalPages" :boundary-link="true"
          class="d-flex justify-content-center" />
      </div>
    </div>
  </div>
</template>