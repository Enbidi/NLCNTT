<script>
import { convertFormDataToJSON } from '../utils'
import LoadingScreen from './LoadingScreen.vue'
import { useAlertsStore } from '../stores/alerts'
import { Input } from 'mdb-ui-kit'

export default {
  components: {
    LoadingScreen
  },
  props: ['apiUrl', 'deletionModal', 'updationModal', 'fetchedData', 'filter', 'title', 'titleDescription'],
  setup(props) {
    var alertsStore = useAlertsStore()
    return {
      alertsStore
    }
  },
  mounted() {
    this.$el.querySelectorAll('.form-outline').forEach(
      formOutline => {
        new Input(formOutline).init();
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
      var data = await res.json()
      if (!res.ok) {
        data.errors.forEach(error => {
          this.alertsStore.push({
            content: error.msg,
            type: 'danger'
          })
        })
        return
      }
      this.errors = []
      return data
    },
    async addHandler(event, opts) {
      let url = `${this.apiUrl}/add`
      let form = event.target
      let formData = new FormData(form)
      var payload = { method: "POST" }
      if (opts && opts.sendFile) {
        payload.body = formData
      }
      else {
        payload.headers = {
          'Content-Type': 'application/json'
        }
        payload.body = convertFormDataToJSON(formData)
      }
      try {
        let result = await this.callAPI(url, payload)
        this.fetchedData.items.push(result.created)
      } catch(err) {}
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
    async updateHandler(event, opts) {
      if (this.selectedItem == null) { return }
      this.isLoading = true
      let form = event.target
      let formData = new FormData(form)
      let id = this.selectedItem._id
      let apiURL = `${this.apiUrl}/${id}/update`
      var entries = [...formData]
      for (const [key, val] of entries) {
        if (val == this.selectedItem[key] || this.selectedItem && this.selectedItem[key] != val && !val) {
          formData.delete(key)
        }
      }
      let formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()))
      let payload = opts && opts.sendFile
        ? {
          method: "PATCH",
          body: formData
        }
        : {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: formDataJSON
        }
      let result = await this.callAPI(apiURL, payload)
      this.fetchedData.items = this.fetchedData.items.map(item => item._id != id ? item : result.updated)
    },
    selectItem(item) {
      this.selectedItem = item
    },
    async deleteSelectedItems() {
      var body = { ids: this.selectedRows.map(row => row._id) }
      var payload = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      var apiURL = `${this.apiUrl}/delete`
      try {
        await this.callAPI(apiURL, payload)
        this.fetchedData.items = this.fetchedData.items.filter(item => !(item._id in body.ids))
        this.alertsStore.push({
          content: 'Xóa thành công',
          type: 'success'
        })
      } catch(err) {}
    },
    updateSelectedItem() {
      if (this.selectedRows.length > 1) {
        this.alertsStore.push('Không thể sửa nhiều hơn 1 sản phẩm')
        return
      }
      this.selectedItem = this.selectedRows[0]
      this.updationModal.show()
    }
  },
  data() {
    return {
      // fetchedData: null,
      // filters: {
      //   name: { value: '', keys: ['name'] }
      // },
      selectedRows: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      selectedItem: null,
      errors: null
    }
  },
  watch: {
    selectedRows(rows) {
      if (!this.fetchedData.selectedItems) {
        return
      }
      this.fetchedData.selectedItems = rows
    }
  }
}
</script>

<template>
  <div>
    <h1 class="mt-4">{{ title }}</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">{{ titleDescription }}</li>
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
            <button class="btn btn-warning me-2" @click="updateSelectedItem()">Sửa sản phẩm đang chọn</button>
            <button class="btn btn-danger me-2" @click="deleteSelectedItems()">Xóa sản phẩm đang chọn</button>
            <slot name="modalTriggerButtons" />
            <slot name="additionModal" v-bind="{ addHandler, errors }" />
            <slot name="updationModal" v-bind="{ updateHandler, errors, selectedItem }" />
            <slot name="deletionModal" v-bind="{ deleteHandler, errors, selectedItem }" />
          </div>
          <div class="col-md-2">
            <!-- <div class="form-outline">
              <input type="text" class="form-control" id="filter" v-model="filter.name.value"/>
              <label class="form-label" for="filter">Lọc bằng tên</label>
            </div> -->
            <slot name="filter"/>
          </div>
        </div>
        <VTable class="table table-bordered table-hover" :data="fetchedData ? fetchedData.items : []" :filters="filter"
          :page-size="20" v-model:currentPage="currentPage" selectionMode="multiple"
          @totalPagesChanged="totalPages = $event"
          @stateChanged="selectedRows = $event.selectedRows"
          selectedClass="bg-primary bg-gradient bg-opacity-50" ref="table" v-bind="$attrs">
          <template #head>
            <slot name="tableColumnNames" />
          </template>
          <template #body="{ rows }">
            <slot name="tableColumnDatas" v-bind="{ rows, selectItem }" />
          </template>
        </VTable>
        <VTPagination v-model:currentPage="currentPage" :total-pages="totalPages" :boundary-link="true"
          class="d-flex justify-content-center" />
      </div>
    </div>
  </div>
</template>