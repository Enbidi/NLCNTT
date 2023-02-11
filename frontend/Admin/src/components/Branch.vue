<script setup>
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import useTemplateRef from './composables/useTemplateRef'

import { useBranchesStore } from '../stores/branches'

const branchesStore = useBranchesStore()
branchesStore.fetchBranches()
const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")
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
  <CommonActions :api-url="`${hostname}/branch`" :deletion-modal="deletionModal" :updation-modal="updationModal" :fetched-data="branchesStore">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addOriginModal">
        Thêm nhãn hiệu
      </ModalTriggerButton>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addOriginModal">
        <template #modalTitle>
          Thêm nhãn hiệu
        </template>
        <form @submit.prevent="addHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="addBranchInput" class="form-control" name="name" />
              <label class="form-label" for="addBranchInput">Tên nhãn hiệu</label>
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
    </template>

    <template #updationModal="{ errors, updateHandler, selectedItem }">
      <Modal id="updateBranchModal" ref="updationModal">
        <template #modalTitle>
          Sửa nhãn hiệu
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            
            <div class="form-outline mb-4">
              <input type="text" id="updateOriginIdInput" class="form-control" name="name" disabled :value="selectedItem?._id"/>
              <label class="form-label" for="updateOriginIdInput">Nhãn hiệu Id</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateOriginNameInput" class="form-control" name="name" />
              <label class="form-label" for="updateOriginNamInput">Tên nhãn hiệu</label>
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
      <Modal id="deleteBranchModal" ref="deletionModal">
        <template #modalTitle>
          Xóa nhãn hiệu
        </template>
        <div class="modal-body">
          <dir>
            <p class="text-warning text-center">Bạn có chắc muốn xóa nhãn hiệu này</p>
          </dir>

          <div v-if="errors && errors.length != 0" class="alert alert-danger">
            <p v-for="error in errors">{{ error.msg }}</p>
          </div>
          <div v-else-if="errors && errors.length == 0" class="alert alert-success">
            Xóa sản phẩm thành công
          </div>
        </div>

        <!-- Submit button -->
        <div class="modal-footer">
          <button class="btn btn-primary btn-block mb-4" @click="deleteHandler()">Xóa</button>
        </div>
      </Modal>
    </template>

    <template #tableColumnNames>
      <tr>
        <VTh sortKey="_id">#</VTh>
        <VTh class="text-center" sortKey="country">Nhãn hiệu</VTh>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <VTr v-for="row in rows" :row="row">
        <td>{{ row._id }}</td>
        <td>{{ row.name }}</td>
        <td>
          <ModalTriggerButton target="updateBranchModal" class="me-2 btn btn-warning" @click="selectItem(row)">Sửa</ModalTriggerButton>
          <ModalTriggerButton target="deleteBranchModal" class="btn btn-danger" @click="selectItem(row)">Xóa</ModalTriggerButton>
        </td>
      </VTr>
    </template>
  </CommonActions>
</template>