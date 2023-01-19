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
  <CommonActions :api-url="`${hostname}/bill`" :modal-ref="deletionModal">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addOriginModal">
        Thêm hóa đơn
      </ModalTriggerButton>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addOriginModal">
        <template #modalTitle>
          Thêm hóa đơn
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
      <Modal id="deleteBillModal" ref="deletionModal">
        <template #modalTitle>
          Xóa hóa đơn
        </template>
        <div class="modal-body">
          <dir>
            <p class="text-warning text-center">Bạn có chắc muốn xóa hóa đơn này</p>
          </dir>

          <div v-if="errors && errors.length != 0" class="alert alert-danger">
            <p v-for="error in errors">{{ error.msg }}</p>
          </div>
          <div v-else-if="errors && errors.length == 0" class="alert alert-success">
            Xóa xuất sứ thành công
          </div>
        </div>

        <!-- Submit button -->
        <div class="modal-footer">
          <button class="btn btn-primary btn-block mb-4" @click="callDeleteAPI()">Xóa</button>
        </div>
      </Modal>
    </template>

    <template #tableColumnNames>
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
    <template #tableColumnDatas="{ rows, deleteHandler }">
      <template v-for="row in rows">
        <VTr :row="row">
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row._id }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.createdAt }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.updatedAt }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.payment }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.total }}</td>
        </VTr>
        <VTr v-for="(detail, index) in row.details" :row="row">
          <td>{{ detail.quantity }}</td>
          <td>{{ detail.price }}</td>
          <td>{{ detail.unitPrice }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1" v-if="index==0">
            <button class="btn btn-link" @click="deleteHandler(row._id)">Xóa</button>
          </td>
        </VTr>
      </template>
    </template>
  </CommonActions>
</template>