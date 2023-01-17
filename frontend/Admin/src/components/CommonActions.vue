<script setup>
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue';
import LoadingScreen from './LoadingScreen.vue'
defineProps(['apiUrl', 'modalRef'])
</script>

<script>
export default {
  created() {
    fetch(this.$props.apiUrl)
      .then(response => response.json())
      .then(data => this.fetchedData = data)
  },
  mounted() {
    this.$el.querySelectorAll('.form-outline').forEach(
      formOutline => {
        new mdb.Input(formOutline).init();
      }
    )
  },
  methods: {
    async addHandler(event) {
      this.isLoading = true
      let form = event.target
      let url = `${this.apiUrl}/add`
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
    async callDeleteAPI() {
      if (this.$options.deletingId == undefined)
        return
      this.isLoading = true
      let branchId = this.$options.deletingId
      let apiURL = `${this.apiUrl}/${branchId}/delete`
      let res = await fetch(apiURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "appilication/json"
        }
      })
      setTimeout(() => this.isLoading = false, 700)
      if (!res.ok) {
        const err = JSON.parse(await res.text())
        this.errors = err.errors
        return
      }
      this.errors = []
    },
    async deleteHandler(branchId) {
      this.$options.deletingId = branchId
      let modalRef = this.$props.modalRef.$refs.modal
      let modalInstance = mdb.Modal.getInstance(modalRef)
      if (modalInstance) {
        modalInstance.show()
      } else {
        (new mdb.Modal(modalRef)).show()
      }
    }
  },
  data() {
    return {
      fetchedData: null,
      filters: {
        name: { value: '', keys: ['name'] }
      },
      selectedRows: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      errors: null
    }
  }
}
</script>

<template>
  <div>
    <h1 class="mt-4">Sản phẩm</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Dữ liệu các sản phẩm</li>
    </ol>
    <LoadingScreen v-if="isLoading" />
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Bảng Dữ Liệu
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-10">
            <button class="btn btn-primary me-2" @click="$refs.table.selectAll()">Chọn tất cả</button>
            <button class="btn btn-primary me-2" @click="$refs.table.deselectAll()">Hủy chọn tất cả</button>
            <slot name="modalTriggerButtons"/>
            <slot name="additionModal" v-bind="{ addHandler, errors}"/>
            <slot name="updationModal" />
            <slot name="deletionModal" v-bind="{ callDeleteAPI, errors }"/>
          </div>
          <div class="col-md-2">
            <div class="form-outline">
              <input type="text" class="form-control" id="filter" v-model="filters.name.value" />
              <label class="form-label" for="filter">Lọc bằng tên</label>
            </div>
          </div>
        </div>
        <VTable class="table table-bordered table-hover" :data="fetchedData ? fetchedData.items : []" :filters="filters"
          :page-size="20" v-model:currentPage="currentPage" selectionMode="multiple"
          @totalPagesChanged="totalPages = $event" @stateChanged="selectedRows = $event.selectedRows"
          selectedClass="bg-primary bg-gradient bg-opacity-50" ref="table" v-bind="$attrs">
          <template #head>
            <slot name="tableColumnNames" />
          </template>
          <template #body="{ rows }">
            <slot name="tableColumnDatas" v-bind="{ rows, deleteHandler }" />
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