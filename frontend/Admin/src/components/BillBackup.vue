<script setup>
import TableWrapper from './TableWrapper.vue';
</script>

<script>
export default {
  created() {
    fetch("http://localhost:3000/admin/bills")
      .then(res => res.json())
      .then(data => this.bills = data.bills)
  },
  data() {
    return {
      bills: [],
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
        <div class="form-outline">
          <input type="text" class="form-control" id="filter" v-model="filters.name.value" />
          <label class="form-label" for="filter">Lọc bằng tên</label>
        </div>
      </div>
    </div>
    <VTable class="table table-bordered table-hover" :data="bills" :filters="filters" :page-size="20"
      v-model:currentPage="currentPage" selectionMode="multiple" selectedClass="bg-primary bg-gradient bg-opacity-50"
      @totalPagesChanged="totalPages = $event" @stateChanged="selectedRows = $event.selectedRows" ref="table">
      <template #head="{ allRowsSelected, toggleAllRows }">
        <tr class="text-center">
          <VTh class="align-middle" rowspan="2" sortKey="_id">#</VTh>
          <VTh class="align-middle" rowspan="2" sortKey="createdAt">Ngày tạo</VTh>
          <VTh class="align-middle" rowspan="2" sortKey="updatedAt">Ngày cập nhật</VTh>
          <VTh class="align-middle" rowspan="2" sortKey="payment">Phương thức thanh toán</VTh>
          <VTh class="align-middle" rowspan="2" sortKey="updatedAt">Tổng phải trả</VTh>
          <th class="text-center" colspan="3">Chi tiết hóa đơn</th>
        </tr>
        <tr class="text-center">
          <VTh sortKey="details.quantity">Số lượng</VTh>
          <VTh sortKey="details.price">Đơn giá</VTh>
          <VTh sortKey="details.unitPrice">Tổng giá</VTh>
        </tr>
      </template>
      <template #body="{ rows }">
        <template v-for="row in rows" :key="row._id">
          <VTr :row="row">
            <td class="align-middle" :rowspan="row.details.length + 1">{{ row._id }}</td>
            <td class="align-middle" :rowspan="row.details.length + 1">{{ row.createdAt }}</td>
            <td class="align-middle" :rowspan="row.details.length + 1">{{ row.updatedAt }}</td>
            <td class="align-middle" :rowspan="row.details.length + 1">{{ row.payment }}</td>
            <td class="align-middle" :rowspan="row.details.length + 1">{{ row.total }}</td>
          </VTr>
          <VTr v-for="detail in row.details" :row="row">
            <td>{{ detail.quantity }}</td>
            <td>{{ detail.price }}</td>
            <td>{{ detail.unitPrice }}</td>
          </VTr>
        </template>
      </template>
    </VTable>
    <strong>Đang chọn:</strong>
    <div v-if="selectedRows.length === 0">Không có hàng nào đang chọn</div>
    <ul>
      <li v-for="selected in selectedRows">
        {{ selected._id }}
      </li>
    </ul>
    <VTPagination v-model:currentPage="currentPage" :total-pages="totalPages" :boundary-link="true"
      class="d-flex justify-content-center" />
  </table-wrapper>
</template>