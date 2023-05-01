<script setup>
import { ref } from 'vue'
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import useTemplateRef from './composables/useTemplateRef'
import { useSearch } from './composables/useSearch'
import { useCommentsStore } from '../stores/comments'

const commentsStore = useCommentsStore()
const { result } = useSearch(import.meta.env.VITE_BRANCH_URL, commentsStore)
commentsStore.fetchData()
const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")

const filter = ref({
  content: {
    value: '', custom: (value, row) => {
      var reg = new RegExp(`.*${value}.*`, 'i')
      return value == '' || reg.test(row.content)
    }
  }
})
</script>

<template>
  <CommonActions v-if="result" :api-url="`${hostname}/comment`" :deletion-modal="deletionModal"
    :updation-modal="updationModal" :fetched-data="result" :filter="filter" title="Bình luận" title-description="Các bình luận hiện có">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addCommentModal">
        Thêm nhãn hiệu
      </ModalTriggerButton>
    </template>

    <template #filter>
      <div class="form-outline">
        <input type="text" class="form-control" id="filter" v-model="filter.content.value" />
        <label class="form-label" for="filter">Lọc bằng tên</label>
      </div>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addCommentModal">
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
          Sửa bình luận
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">

            <div class="form-outline mb-4">
              <input type="text" id="updateCommentIdInput" class="form-control" name="name" disabled
                :value="selectedItem?._id" />
              <label class="form-label" for="updateCommentIdInput">Nhãn hiệu Id</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateCommentNameInput" class="form-control" name="name" />
              <label class="form-label" for="updateCommentNamInput">Tên nhãn hiệu</label>
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
          Xóa bình luận
        </template>
        <div class="modal-body">
          <div>
            <p class="text-warning text-center">Bạn có chắc muốn xóa bình luận này</p>
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
        <VTh class="text-center" sortKey="rating">Đánh giá</VTh>
        <VTh class="text-center" sortKey="product">Sản phẩm</VTh>
        <VTh class="text-center" sortKey="user">Người dùng</VTh>
        <VTh class="text-center" sortKey="content">Nội dung</VTh>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <template v-for="row in rows">
        <VTr :row="row">
          <td rowspan="4">{{ row._id }}</td>
          <td rowspan="4">{{ row.rating }}</td>
          <td>Mã sản phẩm: {{ row.product?._id }}</td>
          <td>Mã người dùng: {{ row.user?._id }}</td>
          <td rowspan="4">{{ row.content }}</td>
          <td rowspan="4">
            <!-- <ModalTriggerButton target="updateBranchModal" class="me-2 btn btn-warning" @click="selectItem(row)">Sửa</ModalTriggerButton> -->
            <ModalTriggerButton target="deleteBranchModal" class="btn btn-danger" @click="selectItem(row)">Xóa
            </ModalTriggerButton>
          </td>
        </VTr>
        <VTr :row="row">
          <td>Sản phẩm: {{ row.product?.name }}</td>
        </VTr>
        <VTr :row="row">
          <td>Xuất sứ: {{ row.product?.origin.country }}</td>
        </VTr>
        <VTr :row="row">
          <td>Nhãn hiệu: {{ row.product?.branch.name }}</td>
        </VTr>
      </template>
    </template>
</CommonActions></template>