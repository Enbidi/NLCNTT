<script setup>
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
</script>

<script>
export default {
  mounted() {
    this.$data.deletionModal = this.$refs.deletionModal
  },
  data() {
    return {
      deletionModal: {}
    }
  }
}
</script>

<template>
  <CommonActions :api-url="`${hostname}/branch`" :modal-ref="deletionModal">
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
              <input type="text" id="addOriginInput" class="form-control" name="country" />
              <label class="form-label" for="addOriginInput">Tên</label>
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

    <template #deletionModal="{ callDeleteAPI, errors }">
      <Modal id="deleteOriginModal" ref="deletionModal">
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
          <button class="btn btn-primary btn-block mb-4" @click="callDeleteAPI()">Xóa</button>
        </div>
      </Modal>
    </template>

    <template #tableColumnNames>
      <tr>
        <VTh sortKey="_id">#</VTh>
        <VTh class="text-center" sortKey="country">Nhãn hiệu</VTh>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, deleteHandler }">
      <VTr v-for="row in rows" :row="row">
        <td>{{ row._id }}</td>
        <td>{{ row.name }}</td>
        <td>
          <button class="btn btn-link" @click="deleteHandler(row._id)">Xóa</button>
        </td>
      </VTr>
    </template>
  </CommonActions>
</template>