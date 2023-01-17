<script setup>
import TableWrapper from './TableWrapper.vue'
import Modal from './Modal.vue'
import LoadingScreen from './LoadingScreen.vue'
</script>

<script>
export default {
  created() {
    fetch(this.hostname + "/branches")
      .then(res => res.json())
      .then(data => this.branches = data.branches)
  },
  mounted() {
    new mdb.Input(this.$refs.filter).init()
  },
  methods: {
    async addBranchHandler(event) {
      this.isLoading = true
      let form = event.target
      let url = form.action
      let formData = new FormData(form)
      let formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()))
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formDataJSON
      });
      setTimeout(() => this.isLoading = false, 700)
      if (!res.ok) {
        const err = JSON.parse(await res.text())
        this.errors = err.errors
        return
      }
      this.errors = []
    },
    async deleteBranchHandler(branchId) {
      this.isLoading = true
      const apiURL = this.hostname + `/branch/${branchId}/delete`
      let res = await fetch(apiURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      setTimeout(() => this.isLoading = false, 700)
      if (!res.ok) {
        const err = JSON.parse(await res.text())
        this.errors = err.errors
        return
      }
      this.errors = []
    }
  },
  data() {
    return {
      branches: [],
      filters: {
        name: { value: '', keys: ['name'] }
      },
      selectedRows: [],
      currentPage: 1,
      totalPages: 1,
      branchName: "",
      isLoading: false,
      errors: null
    }
  }
}
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  <table-wrapper>
    <div class="row mb-3">
      <div class="col-md-10 d-flex justify-content-start">
        <button class="btn btn-primary me-2" @click="$refs.table.selectAll()">Chọn tất cả</button>
        <button class="btn btn-primary me-2" @click="$refs.table.deselectAll()">Hủy chọn tất cả</button>
        <Modal id="addBranchModal">
          <template #buttonContent>
            Thêm nhãn hiệu
          </template>
          <template #modalTitle>
            Thêm nhãn hiệu
          </template>
          <form @submit.prevent="addBranchHandler($event)" method="POST" :action="hostname + '/branch/add'">
            <!-- Name input -->
            <div class="modal-body">
              <div class="form-outline mb-4">
                <input type="text" id="addBranchInput" class="form-control" name="name" />
                <label class="form-label" for="addBranchInput">Tên</label>
              </div>
              <div v-if="errors && errors.length != 0" class="alert alert-danger">
                <p v-for="error in errors">{{ error.msg }}</p>
              </div>
              <div v-else-if="errors && errors.length == 0" class="alert alert-success">
                Thêm thành công
              </div>
            </div>

            <!-- Submit button -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary btn-block mb-4">Thêm</button>
            </div>
          </form>
        </Modal>
      </div>
      <div class="col-md-2">
        <div class="form-outline" ref="filter">
          <input type="text" class="form-control" id="filter" v-model="filters.name.value" />
          <label class="form-label" for="filter">Lọc bằng tên</label>
        </div>
      </div>
    </div>
    <VTable class="table table-bordered table-hover" :data="branches" :filters="filters" :page-size="20"
      v-model:currentPage="currentPage" selectionMode="multiple" selectedClass="bg-primary bg-gradient bg-opacity-50"
      @totalPagesChanged="totalPages = $event" @stateChanged="selectedRows = $event.selectedRows" ref="table">
      <template #head>
        <VTh sortKey="_id">#</VTh>
        <VTh class="text-center" sortKey="country">Nhãn hiệu</VTh>
      </template>
      <template #body="{ rows }">
        <VTr v-for="row in rows" :row="row">
          <td>{{ row._id }}</td>
          <td>{{ row.name }}</td>
          <td>
            <button class="btn btn-link" @click="deleteBranchHandler(row._id)">Xóa</button>
          </td>
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