<script setup>
import { inject } from 'vue'
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import { useTemplateRef } from './composables/useTemplateRef'
import { useFetch } from './composables/useFetch'

const hostname = inject("hostname")
const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")
const originData = useFetch(`${hostname}/origin`)
const branchData = useFetch(`${hostname}/branch`)
</script>

<template>
  <CommonActions :api-url="`${hostname}/product`" :deletion-modal="deletionModal" :updation-modal="updationModal">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addProductModal">
        Thêm sản phẩm
      </ModalTriggerButton>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addProductModal">
        <template #modalTitle>
          Thêm sản phẩm
        </template>
        <form @submit.prevent="addHandler($event, true)" method="POST" enctype="multipart/form-data">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="addProductNameInput" class="form-control" name="name" />
              <label class="form-label" for="addProductNameInput">Tên</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="addProductPriceInput" class="form-control" name="price" />
              <label class="form-label" for="addProductPriceInput">Giá</label>
            </div>

            <div class="form-outline mb-4">
              <input type="file" id="addProductPriceInput" class="form-control" name="img" />
              <label class="form-label" for="addProductPriceInput">Hình</label>
            </div>

            <select class="form-select mb-4" aria-label="Chọn xuất sứ" name="origin">
              <option selected>Chọn xuất sứ cho sản phẩm</option>
              <template v-for="origin in originData.items" :key="origin._id">
                <option :value="origin._id">{{ origin.country }}</option>
              </template>
            </select>

            <select class="form-select mb-4" aria-label="Chọn nhãn hiệu" name="branch">
              <option selected>Chọn nhãn hiệu cho sản phẩm</option>
              <template v-for="branch in branchData.items" :key="branch._id">
                <option :value="branch._id">{{ branch.name }}</option>
              </template>
            </select>

            <div class="form-outline mb-4">
              <textarea class="form-control" id="addProductDescriptionInput" rows="4" name="description"></textarea>
              <label class="form-label" for="addProductDescriptionInput">Mô tả</label>
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

    <template #updationModal="{ updateHandler, selectedItem, errors }">
      <Modal id="updateProductModal" ref="updationModal">
        <template #modalTitle>
          Thêm sản phẩm
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="updateProductNameInput" class="form-control" name="name"
                :value="selectedItem?.name" />
              <label class="form-label" for="updateProductNameInput">Tên</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="updateProductPriceInput" class="form-control" name="price"
                :value="selectedItem?.price" />
              <label class="form-label" for="updateProductPriceInput">Giá</label>
            </div>

            <div class="form-outline mb-4">
              <input type="file" id="updateProductPriceInput" class="form-control" name="img" />
              <label class="form-label" for="updateProductPriceInput">Hình</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="updateProductOriginInput" class="form-control" name="origin"
                :value="selectedItem?.origin" />
              <label class="form-label" for="updateProductOriginInput">Xuất sứ</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="updateProductBranchInput" class="form-control" name="branch"
                :value="selectedItem?.branch" />
              <label class="form-label" for="updateProductBranchInput">Nhãn hiệu</label>
            </div>

            <div class="form-outline mb-4">
              <textarea class="form-control" id="updateProductDescriptionInput" rows="4" name="description"></textarea>
              <label class="form-label" for="updateProductDescriptionInput">Mô tả</label>
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
      <Modal id="deleteProductModal" ref="deletionModal">
        <template #modalTitle>
          Xóa xuất sứ
        </template>
        <div class="modal-body">
          <dir>
            <p class="text-warning text-center">Bạn có chắc muốn xóa sản phẩm này</p>
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
        <VTh class="text-center" sortKey="name">Tên</VTh>
        <VTh class="text-center" sortKey="price">Giá</VTh>
        <VTh class="text-center" sortKey="description">Mô tả</VTh>
        <VTh class="text-center" sortKey="branch">Nhãn hiệu</VTh>
        <VTh class="text-center" sortKey="origin">Xuất sứ</VTh>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <VTr v-for="row in rows" :key="row._id" :row="row" v-slot="{ isSelected, toggle }">
        <td>{{ row._id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.price }}</td>
        <td>{{ row.description }}</td>
        <td>{{ row.origin.country }}</td>
        <td>{{ row.branch?.name }}</td>
        <td>
          <ModalTriggerButton target="updateProductModal" class="me-2 btn btn-warning" @click="selectItem(row)">
            Sửa
          </ModalTriggerButton>
          <ModalTriggerButton target="deleteProductModal" class="btn btn-danger" @click="selectItem(row)">
            Xóa
          </ModalTriggerButton>
        </td>
      </VTr>
    </template>
  </CommonActions>
</template>