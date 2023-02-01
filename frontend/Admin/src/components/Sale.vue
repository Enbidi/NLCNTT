<script setup>
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import { useTemplateRef } from './composables/useTemplateRef'

import { useSalesStore } from '../stores/sales'
import { useProductsStore } from '../stores/products'

const salesStore = useSalesStore()
const productsStore = useProductsStore()
salesStore.fetchSales()
productsStore.fetchProducts()

const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")
</script>

<template>
  <CommonActions :api-url="`${hostname}/sale`" :deletion-modal="deletionModal" :updation-modal="updationModal"
    :fetched-data="salesStore">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addOriginModal">
        Thêm xuất sứ
      </ModalTriggerButton>
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
              <input type="date" id="addSaleStartInput" class="form-control" name="start" />
              <label class="form-label" for="addSaleStartInput">Ngày bắt đầu</label>
            </div>
            <div class="form-outline mb-4">
              <input type="date" id="addSaleEndInput" class="form-control" name="end" />
              <label class="form-label" for="addSaleEndInput">Ngày kết thúc</label>
            </div>
            <div class="form-outline mb-4">
              <input type="text" id="addSalePercentInput" class="form-control" name="percent" />
              <label class="form-label" for="addSalePercentInput">Phần trăm giảm</label>
            </div>
            <div v-for="product in productsStore.selectedItems" class="form-check">
              <input class="form-check-input" type="checkbox" :value="product._id" name="products[]"/>
              <label class="form-check-label" for="flexCheckDefault">{{ product._id }}</label>
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
              <input type="text" id="addOriginInput" class="form-control" name="name" disabled
                :value="selectedItem?._id" />
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
          <dir>
            <p class="text-warning text-center">Bạn có chắc muốn xóa xuât sứ này</p>
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