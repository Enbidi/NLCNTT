<script setup>
import { inject, reactive, watch, ref, onUnmounted } from 'vue'

import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'

import useTemplateRef from './composables/useTemplateRef'

import { useSearchStore } from '../stores/search';
import { useOriginsStore } from '../stores/origins';
import { useBranchesStore } from '../stores/branches';
import { useProductsStore } from '../stores/products';
import { useSearch } from './composables/useSearch';
import { useSelectedProductsStore } from '../stores/selectedProducts';

const productsStore = useProductsStore()
const originsStore = useOriginsStore()
const branchesStore = useBranchesStore()
const searchStore = useSearchStore()
// var items = ref(null)
const { result } = useSearch(import.meta.env.VITE_PRODUCT_URL, productsStore)

productsStore.fetchProducts()
originsStore.fetchOrigins()
branchesStore.fetchBranches()

// productsStore.$subscribe((_, state) => {
//   result.value = state;
// }, { immediate: true });



const hostname = inject("hostname")
const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")
const filter = ref({
  name: {
    value: '', keys: ['name']
  }
});
// searchStore.$subscribe(async (_, state) => {
//   fetch(`${import.meta.env.VITE_PRODUCT_URL}/find?keyword=${state.val}`)
//     .then(res => res.json())
//     .then(data => items.value.items = data.items)
// })
</script>

<template>
  <CommonActions v-if="result" :api-url="`${hostname}/admin/product`" :deletion-modal="deletionModal"
    :updation-modal="updationModal" :fetched-data="result" :filter="filter" title="Sản phẩm" title-description="Dữ liệu các sản phẩm">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addProductModal">
        Thêm sản phẩm
      </ModalTriggerButton>
    </template>

    <template #filter>
      <div class="form-outline">
        <input type="text" class="form-control" id="filter" v-model="filter.name.value" />
        <label class="form-label" for="filter">Lọc bằng tên</label>
      </div>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addProductModal">
        <template #modalTitle>
          Thêm sản phẩm
        </template>
        <form @submit.prevent="addHandler($event, { sendFile: true })">
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
              <input type="text" id="addProductScreenInput" class="form-control" name="screen" />
              <label class="form-label" for="addProductScreenInput">Màn hình</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addProductOSInput" class="form-control" name="os" />
              <label class="form-label" for="addProductOSInput">Hệ điều hành</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addProductBackCamInput" class="form-control" name="backCamera" />
              <label class="form-label" for="addProductBackCamInput">Camera sau</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addProductFrontCamInput" class="form-control" name="frontCamera" />
              <label class="form-label" for="addProductFrontCamInput">Camera trước</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addProductChipInput" class="form-control" name="chip" />
              <label class="form-label" for="addProductChipInput">Chip</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="addProductRAMInput" class="form-control" name="RAM" />
              <label class="form-label" for="addProductRAMInput">RAM</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="addProductDiskInput" class="form-control" name="diskSize" />
              <label class="form-label" for="addProductDiskInput">Dung lượng bộ nhớ</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addProductInput" class="form-control" name="SIMs" />
              <label class="form-label" for="addProductSIMsInput">Số SIM</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addProductCharingInput" class="form-control" name="charging" />
              <label class="form-label" for="addProductCharingInput">Bin</label>
            </div>

            <div class="form-outline mb-4">
              <input type="file" id="addProductPriceInput" class="form-control" name="img" />
              <label class="form-label" for="addProductPriceInput">Hình</label>
            </div>

            <select class="form-select mb-4" aria-label="Chọn xuất sứ" name="origin">
              <option selected>Chọn xuất sứ cho sản phẩm</option>
              <option v-for="origin in originsStore.items" :value="origin._id" :key="origin._id">
                {{ origin.country }}
              </option>
            </select>

            <select class="form-select mb-4" aria-label="Chọn nhãn hiệu" name="branch">
              <option selected>Chọn nhãn hiệu cho sản phẩm</option>
              <option v-for="branch in branchesStore.items" :key="branch._id" :value="branch._id">
                {{ branch.name }}
              </option>
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
        <form @submit.prevent="updateHandler($event, { sendFile: true })" method="POST">
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
              <input type="text" id="updateProductScreenInput" class="form-control" name="screen"
                :value="selectedItem?.specs?.screen" />
              <label class="form-label" for="updateProductScreenInput">Màn hình</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateProductOSInput" class="form-control" name="os"
                :value="selectedItem?.specs?.os" />
              <label class="form-label" for="updateProductOSInput">Hệ điều hành</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateProductBackCamInput" class="form-control" name="backCamera"
                :value="selectedItem?.specs?.backCamera" />
              <label class="form-label" for="updateProductBackCamInput">Camera sau</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateProductFrontCamInput" class="form-control" name="frontCamera"
                :value="selectedItem?.specs?.frontCamera" />
              <label class="form-label" for="updateProductFrontCamInput">Camera trước</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateProductChipInput" class="form-control" name="chip"
                :value="selectedItem?.specs?.chip" />
              <label class="form-label" for="updateProductChipInput">Chip</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="updateProductRAMInput" class="form-control" name="RAM"
                :value="selectedItem?.specs?.RAM" />
              <label class="form-label" for="updateProductRAMInput">RAM</label>
            </div>

            <div class="form-outline mb-4">
              <input type="number" id="updateProductDiskInput" class="form-control" name="diskSize"
                :value="selectedItem?.specs?.diskSize" />
              <label class="form-label" for="updateProductDiskInput">Dung lượng bộ nhớ</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateProductSIMsInput" class="form-control" name="SIMs"
                :value="selectedItem?.specs?.SIMs" />
              <label class="form-label" for="updateProductSIMsInput">Số SIM</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateProductCharingInput" class="form-control" name="charging"
                :value="selectedItem?.specs?.charging" />
              <label class="form-label" for="updateProductCharingInput">Bin</label>
            </div>

            <div class="form-outline mb-4">
              <input type="file" id="updateProductPriceInput" class="form-control" name="img" />
              <label class="form-label" for="updateProductPriceInput">Hình</label>
            </div>

            <select class="form-select mb-4" aria-label="Chọn xuất sứ" name="origin">
              <option v-for="origin in originsStore.items" :value="origin._id" :key="origin._id"
                :selected="origin._id == selectedItem?.origin._id">
                {{ origin.country }}
              </option>
            </select>

            <select class="form-select mb-4" aria-label="Chọn nhãn hiệu" name="branch">
              <option selected>Chọn nhãn hiệu cho sản phẩm</option>
              <option v-for="branch in branchesStore.items" :key="branch._id" :value="branch._id"
                :selected="branch._id == selectedItem?.branch._id">
                {{ branch.name }}
              </option>
            </select>

            <!-- <div class="form-outline mb-4">
                <input type="text" id="updateProductOriginInput" class="form-control" name="origin"
                  :value="selectedItem?.origin" />
                <label class="form-label" for="updateProductOriginInput">Xuất sứ</label>
              </div>

              <div class="form-outline mb-4">
                <input type="text" id="updateProductBranchInput" class="form-control" name="branch"
                  :value="selectedItem?.branch" />
                <label class="form-label" for="updateProductBranchInput">Nhãn hiệu</label>
              </div> -->

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
          <div>
            <p class="text-warning text-center">Bạn có chắc muốn xóa sản phẩm này</p>
          </div>

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
        <VTh class="text-center" sortKey="origin">Xuất sứ</VTh>
        <VTh class="text-center" sortKey="branch">Nhãn hiệu</VTh>
        <th>Thông số kĩ thuật</th>
        <th class="text-center">Hình ảnh</th>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <template v-for="row in rows" :key="row._id">
        <VTr :row="row" v-slot="{ isSelected, toggle }">
          <td :rowspan="row.specs ? 10 : 1" class="align-middle">{{ row._id }}</td>
          <td :rowspan="row.specs ? 10 : 1" class="align-middle">{{ row.name }}</td>
          <td :rowspan="row.specs ? 10 : 1" class="align-middle">{{ row.price }}</td>
          <td :rowspan="row.specs ? 10 : 1" class="align-middle">{{ row.description }}</td>
          <td :rowspan="row.specs ? 10 : 1" class="align-middle">{{ row.origin?.country }}</td>
          <td :rowspan="row.specs ? 10 : 1" class="align-middle">{{ row.branch?.name }}</td>

          <template v-if="!row.specs">
            <td></td>
            <td class="text-center">
              <img :src="hostname + row.img" crossorigin="anonymous" class="img-fluid" style="width: 50px; height: 50px;">
            </td>
            <td>
              <ModalTriggerButton target="updateProductModal" class="me-2 btn btn-warning" @click="selectItem(row)">
                Sửa
              </ModalTriggerButton>
              <ModalTriggerButton target="deleteProductModal" class="btn btn-danger" @click="selectItem(row)">
                Xóa
              </ModalTriggerButton>
            </td>
          </template>
        </VTr>
        <template v-if="row.specs">
          <VTr :row="row">
            <td>Màn hình: {{ row.specs.screen }}</td>
            <td rowspan="10" class="text-center align-middle">
              <img :src="hostname + row.img" crossorigin="anonymous" class="img-fluid" style="width: 50px; height: 50px;">
            </td>
            <td rowspan="10" class="align-middle">
              <ModalTriggerButton target="updateProductModal" class="me-2 btn btn-warning" @click="selectItem(row)">
                Sửa
              </ModalTriggerButton>
              <ModalTriggerButton target="deleteProductModal" class="btn btn-danger" @click="selectItem(row)">
                Xóa
              </ModalTriggerButton>
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Hệ điều hành: {{ row.specs.os }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Camera sau: {{ row.specs.backCamera }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Camera trước: {{ row.specs.frontCamera }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Chip: {{ row.specs.chip }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              RAM: {{ row.specs.RAM }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Dung lượng đĩa: {{ row.specs.diskSize }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Số sim: {{ row.specs.SIMs }}
            </td>
          </VTr>
          <VTr :row="row">
            <td>
              Sạc: {{ row.specs.charging }}
            </td>
          </VTr>
        </template>
      </template>
    </template>
  </CommonActions>
</template>