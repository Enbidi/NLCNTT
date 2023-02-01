<script setup>
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'

import { useTemplateRef } from './composables/useTemplateRef'
import { inject } from 'vue'

import { useBillsStore } from '../stores/bills'

const billsStore = useBillsStore()
billsStore.fetchBills()

const hostname = inject("hostname")
const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")
</script>
<!-- 
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
</script> -->

<template>
  <CommonActions :api-url="`${hostname}/admin/bill`" :deletion-modal="deletionModal" :updation-modal="updationModal" :fetched-data="billsStore">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addBillModal">
        Thêm hóa đơn
      </ModalTriggerButton>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addBillModal">
        <template #modalTitle>
          Thêm hóa đơn
        </template>
        <form @submit.prevent="addHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="addBillInput" class="form-control" name="country" />
              <label class="form-label" for="addBillInput">Tên</label>
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

    <template #updationModal="{ updateHandler, errors }">
      <Modal id="updateBillModal" ref="updateBillModal">
        <template #modalTitle>
          Thêm hóa đơn
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="updateBillInput" class="form-control" name="country" />
              <label class="form-label" for="updateBillInput">Tên</label>
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

    <template #deletionModal="{ deleteHandler, errors }">
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
          <button class="btn btn-primary btn-block mb-4" @click="deleteHandler()">Xóa</button>
        </div>
      </Modal>
    </template>

    <template #tableColumnNames>
      <tr class="text-center">
        <VTh class="align-middle" rowspan="2" sortKey="_id">#</VTh>
        <VTh class="align-middle" rowspan="2" sortKey="createdAt">Ngày tạo</VTh>
        <VTh class="align-middle" rowspan="2" sortKey="updatedAt">Ngày cập nhật</VTh>
        <VTh class="align-middle" rowspan="2" sortKey="payment">PTTT(Credit Card/Trực tiếp)</VTh>
        <VTh class="align-middle" rowspan="2" sortKey="updatedAt">Tổng phải trả</VTh>
        <th class="text-center" colspan="3">Chi tiết hóa đơn</th>
      </tr>
      <tr class="text-center">
        <VTh sortKey="details.quantity">Số lượng</VTh>
        <VTh sortKey="details.price">Đơn giá</VTh>
        <VTh sortKey="details.unitPrice">Tổng giá</VTh>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <template v-for="row in rows">
        <VTr :row="row">
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row._id }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.createdAt }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.updatedAt }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1">
            <template v-if="row.creditCard">
              <p><strong>Loại thẻ: </strong>{{ row.creditCard.cardType }}</p>
              <p><strong>Số thẻ: </strong>{{ row.creditCard.cardNumber }}</p>
              <p><strong>CVV: </strong>{{ row.creditCard.CVV }}</p>
              <p><strong>Ngày hết hạn: </strong>{{ row.creditCard.expiration }}</p>
            </template>
          </td>
          <td class="align-middle" :rowspan="row.details.length + 1">{{ row.total }}</td>
        </VTr>
        <VTr v-for="(detail, index) in row.details" :row="row">
          <td>{{ detail.quantity }}</td>
          <td>{{ detail.price }}</td>
          <td>{{ detail.unitPrice }}</td>
          <td class="align-middle" :rowspan="row.details.length + 1" v-if="index == 0">
            <ModalTriggerButton target="updateBillModal" class="me-2 btn btn-warning" @click="selectItem(row)">
              Sửa
            </ModalTriggerButton>
          <!-- </td> -->
          <!-- <td class="align-middle" :rowspan="row.details.length + 1" v-if="index == 0"> -->
            <ModalTriggerButton target="deleteBillModal" class="me-2 btn btn-warning" @click="selectItem(row)">
              Xóa
            </ModalTriggerButton>
          </td>
        </VTr>
      </template>
    </template>
  </CommonActions>
</template>