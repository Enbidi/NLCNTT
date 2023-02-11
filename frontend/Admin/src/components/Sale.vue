<script setup>
import { ref } from 'vue'
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import useTemplateRef from './composables/useTemplateRef'

import { useSalesStore } from '../stores/sales'
import { useProductsStore } from '../stores/products'

const salesStore = useSalesStore()
const productsStore = useProductsStore()
salesStore.fetchSales()
productsStore.fetchProducts()

const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")

const saleType = ref(0)
</script>

<template>
  <CommonActions :api-url="`${hostname}/sale`" :deletion-modal="deletionModal" :updation-modal="updationModal"
    :fetched-data="salesStore">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addOriginModal">
        Thêm khuyến mãi
      </ModalTriggerButton>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addOriginModal">
        <template #modalTitle>
          Thêm khuyến mãi
        </template>
        <form @submit.prevent="addHandler($event, { sendRaw: true })" method="POST">
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
            <div class="form-check mb-4">
              <input class="form-check-input" type="radio" name="type" checked @change="saleType=0" value="promotion"/>
              <label class="form-check-label" for="flexRadioDefault1">Giảm theo phần trăm</label>
            </div>
            <div class="form-check mb-4">
              <input class="form-check-input" type="radio" name="type" @change="saleType=1" value="discount"/>
              <label class="form-check-label" for="flexRadioDefault2">Giảm trực tiếp</label>
            </div>
            <div class="form-outline mb-4">
              <input type="text" id="addSalePercentInput" class="form-control" name="saleVal" />
              <label class="form-label" for="addSalePercentInput">{{ saleType == 0 ? 'Phần trăm giảm' : 'Giá trị giảm' }}</label>
            </div>
            <ul class="list-group list-group-light">
              <template v-if="productsStore.selectedItems.length == 0">
                <p>Điều hướng tới trang Admin sản phẩm để chọn các sản phẩm được giảm và quay lại</p>
              </template>
              <template v-else>
                <li v-for="product in productsStore.selectedItems" class="list-group-item">
                  <div class="form-check d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" :value="product._id" name="products" />
                    <label class="form-check-label" for="flexCheckDefault">{{ product.name }}</label>
                    <img :src="'http://localhost:3000' + product.img" class="img-fluid" crossorigin="anonymous"
                      style="width: 45px; height: 45px;">
                  </div>
                </li>
              </template>
            </ul>
          </div>

          <!-- Submit button -->
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary btn-block mb-4">Thêm</button>
          </div>
        </form>
      </Modal>
    </template>

    <template #updationModal="{ updateHandler, errors, selectedItem }">
      <Modal id="updateOriginModal" ref="updationModal">
        <template #modalTitle>
          Sửa khuyến mãi
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="date" id="updateSaleStartInput" class="form-control" name="start"
                :value="selectedItem && new Date(selectedItem.start).toISOString().substring(0, 10)" />
              <label class="form-label" for="updateSaleStartInput">Ngày bắt đầu</label>
            </div>
            <div class="form-outline mb-4">
              <input type="date" id="updateSaleEndInput" class="form-control" name="end"
                :value="selectedItem && new Date(selectedItem.end).toISOString().substring(0, 10)" />
              <label class="form-label" for="updateSaleEndInput">Ngày kết thúc</label>
            </div>
            <div class="form-outline mb-4">
              <input type="text" id="updateSalePercentInput" class="form-control" name="percent"
                :value="selectedItem?.percent" />
              <label class="form-label" for="updateSalePercentInput">Phần trăm giảm</label>
            </div>
            <ul class="list-group list-group-light">
              <li v-for="product in productsStore.selectedItems" class="list-group-item">
                <div class="form-check d-flex align-items-center">
                  <input class="form-check-input" type="checkbox" :value="product._id" name="products" />
                  <label class="form-check-label" for="flexCheckDefault">{{ product.name }}</label>
                  <img :src="'http://localhost:3000' + product.img" class="img-fluid" crossorigin="anonymous"
                    style="width: 45px; height: 45px;">
                </div>
              </li>
            </ul>
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
          Xóa khuyến mãi
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
      <VTh sortKey="start">Ngày bắt đầu</VTh>
      <VTh sortKey="end">Ngày kết thúc</VTh>
      <th>Loại khuyến mãi</th>
      <VTh sortKey="percent">Phần trăm giảm/Giá trị giảm</VTh>
      <VTh sortKey="content">Trạng thái</VTh>
      <th>Các sản phẩm được giảm</th>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <VTr v-for="row in rows" :row="row">
        <td class="align-middle">{{ row._id }}</td>
        <td class="align-middle">{{ row.start }}</td>
        <td class="align-middle">{{ row.end }}</td>
        <td class="align-middle">{{ row.saleType == 'Promotion' ? 'Phần trăm' : 'Giảm trực tiếp' }}</td>
        <td class="align-middle">{{ row.saleType == 'Promotion' ? row.percent : row.value }}</td>
        <td class="align-middle">{{ row.isExpired == true ? 'Hết hạn' : 'Hoạt động' }}</td>
        <td>
          <ul class="list-group list-group-light">
            <li v-for="product in row.products" class="list-group-item">
              {{ product }}
            </li>
          </ul>
        </td>
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