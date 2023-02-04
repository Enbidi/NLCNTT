<script setup>
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import { useBillStore } from '../stores/bill'

const billStore = useBillStore()
billStore.fetchData()
</script>

<template>
  <Modal id="billHistoryModal" title="Lịch sử hóa đơn">
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr class="align-middle text-center">
          <td rowspan="2">Ngày lập</td>
          <td colspan="2">Chi tiết</td>
        </tr>
        <tr class="align-middle text-center">
          <td class="text-center">Id sản phẩm</td>
          <td>Số lượng</td>
        </tr>
      </thead>
      <tbody>
        <template v-for="history in billStore.history">
          <tr>
            <td :rowspan="history.details.length + 1">{{ history.createdAt }}</td>
          </tr>
          <tr v-for="detail in history.details">
            <td>{{ detail._id }}</td>
            <td>{{ detail.quantity }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </Modal>
</template>