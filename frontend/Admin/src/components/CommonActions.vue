<script setup>
import LoadingScreen from './LoadingScreen.vue'

defineProps(['apiUrl', 'deletionModal', 'updationModal', 'fetchedData'])
</script>

<script>
export default {
  // created() {
  //   fetch(this.$props.apiUrl)
  //     .then(response => response.json())
  //     .then(data => this.fetchedData = data)
  // },
  mounted() {
    this.$el.querySelectorAll('.form-outline').forEach(
      formOutline => {
        new mdb.Input(formOutline).init();
      }
    )
  },
  methods: {
    _wait(millis) {
      return new Promise((resolve) => {
        setTimeout(resolve, millis)
      })
    },
    async callAPI(url, payload) {
      this.isLoading = true
      // Use this to show loading screen
      // in case of fast network caused
      // loading screen to be too fast
      // to see
      const [res, _] = await Promise.all([fetch(url, payload), this._wait(700)])
      this.isLoading = false
      if (!res.ok) {
        let err = JSON.parse(await res.text())
        this.errors = err.errors
        return
      }
      this.errors = []
    },
    async addHandler(event, includeFile = false) {
      let form = event.target
      let formData = new FormData(form)
      let formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()))
      let url = `${this.apiUrl}/add`
      let payload = includeFile ? 
        {
          method: "POST",
          body: formData
        } : {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "appilication/json"
          },
          body: formDataJSON
        }
      this.callAPI(url, payload)
    },
    async deleteHandler() {
      let id = this.selectedItem._id
      let apiURL = `${this.apiUrl}/${id}/delete`
      let payload = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "appilication/json"
        }
      }
      this.callAPI(apiURL, payload)
      // Update UI
      this.fetchedData.items = this.fetchedData.items.filter(item => item._id != id)
    },
    async updateHandler(event) {
      this.isLoading = true
      let form = event.target
      let formData = new FormData(form)
      let id = this.selectedItem._id
      let apiURL = `${this.apiUrl}/${id}/update`
      for (const [key, val] of formData.entries()) {
        if (val == this.selectItem[key]) {
          formData.delete(key)
        }
      }
      let formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()))
      let payload = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: formDataJSON
      }
      this.callAPI(apiURL, payload)
    },
    selectItem(item) {
      this.selectedItem = item
    }
  },
  data() {
    return {
      // fetchedData: null,
      filters: {
        name: { value: '', keys: ['name'] }
      },
      selectedRows: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      selectedItem: null,
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
            <slot name="modalTriggerButtons" />
            <slot name="additionModal" v-bind="{ addHandler, errors }" />
            <slot name="updationModal" v-bind="{ updateHandler, errors, selectedItem }" />
            <slot name="deletionModal" v-bind="{ deleteHandler, errors, selectedItem }" />
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
            <slot name="tableColumnDatas" v-bind="{ rows, selectItem }" />
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