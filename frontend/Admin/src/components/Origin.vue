<script setup>
import { ref } from 'vue'
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import useTemplateRef from './composables/useTemplateRef'

import { useOriginsStore } from '../stores/origins'
import { useSearchStore } from '../stores/search'
import { useSearch } from './composables/useSearch'

const originsStore = useOriginsStore()
const { result } = useSearch(import.meta.env.VITE_ORIGIN_URL, originsStore);
originsStore.fetchOrigins()

const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")

const filter = ref({
  country: {
    val: '', keys: ['country']
  }
})
</script>

<!-- <script>
export default {
  mounted() {
    this.$data.deletionModal = this.$refs.deletionModal
    this.$data.updationModal = this.$refs.updationModal
  },
  data() {
    return {
      deletionModal: {},
      updationModal: {}
    }
  }
}
</script> -->

<template>
  <CommonActions v-if="result" :api-url="`${hostname}/origin`" :deletion-modal="deletionModal" :updation-modal="updationModal" :fetched-data="result" :filter="filter">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addOriginModal">
        Thêm xuất sứ
      </ModalTriggerButton>
    </template>

    <template #filter>
      <div class="form-outline">
        <input type="text" class="form-control" id="filter" v-model="filter.country.value" />
        <label class="form-label" for="filter">Lọc bằng tên</label>
      </div>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addOriginModal">
        <template #modalTitle>
          Thêm xuất sứ
        </template>
        <form @submit.prevent="addHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="addOriginInput" class="form-control" name="country" />
              <label class="form-label" for="addOriginInput">Quốc gia</label>
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
            <button type="submit" class="btn btn-primary btn-block mb-4" @click="addHandler()">Thêm</button>
          </div>
        </form>
      </Modal>
    </template>

    <template #updationModal="{ updateHandler, errors, selectedItem }">
      <Modal id="updateOriginModal" ref="updationModal">
        <template #modalTitle>
          Sửa xuất sứ
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">

            <div class="form-outline mb-4">
              <input type="text" id="addOriginInput" class="form-control" name="name" disabled :value="selectedItem?._id"/>
              <label class="form-label" for="addOriginInput">Xuất sứ Id</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addOriginInput" class="form-control" name="country" />
              <label class="form-label" for="addOriginInput">Quốc gia</label>
            </div>

            <div v-if="errors && errors.length != 0" class="alert alert-danger">
              <p v-for="error in errors">{{ error.msg }}</p>
            </div>
            <div v-else-if="errors && errors.length == 0" class="alert alert-success">
              Sửa thành công
            </div>
          </div>

          <!-- Submit button -->
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary btn-block mb-4">Thêm</button>
          </div>
        </form>
      </Modal>
    </template>

    <template #deletionModal="{ deleteHandler, errors }">
      <Modal id="deleteOriginModal" ref="deletionModal">
        <template #modalTitle>
          Xóa xuất sứ
        </template>
        <div class="modal-body">
          <div>
            <p class="text-warning text-center">Bạn có chắc muốn xóa xuât sứ này</p>
          </div>

          <div v-if="errors && errors.length != 0" class="alert alert-danger">
            <p v-for="error in errors">{{ error.msg }}</p>
          </div>
          <div v-else-if="errors && errors.length == 0" class="alert alert-success">
            Xóa xuất sứ thành công
          </div>
        </div>

        <!-- Submit button -->
        <div class="modal-footer">
          <button class="btn btn-primary btn-block mb-4" @click="deleteHandler()">Xóa</button>
        </div>
      </Modal>
    </template>

    <template #tableColumnNames>
      <VTh sortKey="_id">#</VTh>
      <VTh sortKey="country">Quốc gia</VTh>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <VTr v-for="row in rows" :row="row">
        <td>{{ row._id }}</td>
        <td>{{ row.country }}</td>
        <td>
          <ModalTriggerButton target="updateOriginModal" class="me-2 btn btn-warning" @click="selectItem(row)">
            Sửa
          </ModalTriggerButton>
          <ModalTriggerButton target="deleteOriginModal" class="btn btn-danger" @click="selectItem(row)">
            Xóa
          </ModalTriggerButton>
        </td>
      </VTr>
    </template>
  </CommonActions>
</template>