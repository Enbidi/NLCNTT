<script setup>
import { inject, ref } from 'vue'

import useTemplateRef from './composables/useTemplateRef'
import CommonActions from './CommonActions.vue'
import Modal from './Modal.vue'
import ModalTriggerButton from './ModalTriggerButton.vue'
import { useUsersStore } from '../stores/users'
import { useSearch } from './composables/useSearch'
const usersStore = useUsersStore()
const { result } = useSearch(import.meta.env.VITE_USER_URL, usersStore)
usersStore.fetchUsers()
const hostname = inject("hostname")
const updationModal = useTemplateRef("updationModal")
const deletionModal = useTemplateRef("deletionModal")

const filter = ref({
  name: {
    value: '', custom: (value, row) => {
      var reg = new RegExp(`.*${value}.*`)
      return value == '' || reg.test(row.firstname ?? '') || reg.test(row.lastname ?? '')
    }
  }
})
</script>

<!-- <script>
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
  <CommonActions :api-url="`${hostname}/admin/user`" :deletion-modal="deletionModal" :updation-modal="updationModal" :fetched-data="result" :filter="filter" title="Người dùng" title-description="Dữ liệu người dùng">
    <template #modalTriggerButtons>
      <ModalTriggerButton target="addUserModal">
        Thêm người dùng
      </ModalTriggerButton>
    </template>
    
    <template #filter>
      <div class="form-outline">
        <input type="text" class="form-control" id="filter" v-model="filter.name.value" />
        <label class="form-label" for="filter">Lọc bằng tên</label>
      </div>
    </template>

    <template #additionModal="{ addHandler, errors }">
      <Modal id="addUserModal" ref="additionModal">
        <template #modalTitle>
          Thêm người dùng
        </template>
        <form @submit.prevent="addHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="addUserFirstnameInput" class="form-control" name="firstname" />
              <label class="form-label" for="addUserFirstnameInput">Họ</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addUserLastnameInput" class="form-control" name="lastname" />
              <label class="form-label" for="addUserLastnameInput">Tên</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="addUserNumberInput" class="form-control" name="number" />
              <label class="form-label" for="addUserNumberInput">Số điện thoại</label>
            </div>

            <div class="form-outline mb-4">
              <input type="email" id="addUserEmailInput" class="form-control" name="email" />
              <label class="form-label" for="addUserEmailInput">Email</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="addUserPasswordInput" class="form-control" name="password" />
              <label class="form-label" for="addUserPasswordInput">Mật khẩu</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="addUserConfirmPassInput" class="form-control" name="passwordConfirmation" />
              <label class="form-label" for="addUserConfirmPassInput">Nhập lại mật khẩu</label>
            </div>

            <select class="form-select mb-4" aria-label="Chọn giới tính" name="sex">
              <option selected>Giới tính</option>
              <option value="user">Nam</option>
              <option value="admin">Nữ</option>
            </select>

            <select class="form-select mb-4" aria-label="Chọn vai trò" name="role">
              <option selected>Chọn vai trò người dùng</option>
              <option value="user">Người dùng</option>
              <option value="admin">Admin</option>
            </select>

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
      <Modal id="updateUserModal" ref="updationModal">
        <template #modalTitle>
          Sửa người dùng
        </template>
        <form @submit.prevent="updateHandler($event)" method="POST">
          <!-- Name input -->
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input type="text" id="updateUserFirstnameInput" class="form-control" name="firstname" />
              <label class="form-label" for="updateUserFirstnameInput">Họ</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateUserLastnameInput" class="form-control" name="lastname" />
              <label class="form-label" for="updateUserLastnameInput">Tên</label>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="updateUserNumberInput" class="form-control" name="number" />
              <label class="form-label" for="updateUserNumberInput">Số điện thoại</label>
            </div>

            <div class="form-outline mb-4">
              <input type="email" id="updateUserEmailInput" class="form-control" name="email" />
              <label class="form-label" for="updateUserEmailInput">Email</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="updateUserPasswordInput" class="form-control" name="password" />
              <label class="form-label" for="updateUserPasswordInput">Mật khẩu</label>
            </div>

            <select class="form-select mb-4" aria-label="Chọn giới tính" name="sex">
              <option selected>Giới tính</option>
              <option value="user">Nam</option>
              <option value="admin">Nữ</option>
            </select>

            <select class="form-select mb-4" aria-label="Chọn vai trò" name="role">
              <option selected>Chọn vai trò người dùng</option>
              <option value="user">Người dùng</option>
              <option value="admin">Admin</option>
            </select>

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
      <Modal id="deleteUserModal" ref="deletionModal">
        <template #modalTitle>
          Xóa người dùng
        </template>
        <div class="modal-body">
          <div>
            <p class="text-warning text-center">Bạn có chắc muốn xóa người dùng này</p>
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
        <VTh class="text-center" sortKey="name">Họ</VTh>
        <VTh class="text-center" sortKey="price">Tên</VTh>
        <VTh class="text-center" sortKey="description">Số điện thoại</VTh>
        <VTh class="text-center" sortKey="branch">Email</VTh>
        <VTh class="text-center" sortKey="origin">Giới tính</VTh>
      </tr>
    </template>
    <template #tableColumnDatas="{ rows, selectItem }">
      <VTr v-for="row in rows" :key="row._id" :row="row">
        <td>{{ row._id }}</td>
        <td>{{ row.firstname }}</td>
        <td>{{ row.lastname }}</td>
        <td>{{ row.number }}</td>
        <td>{{ row.email }}</td>
        <td>{{ row.sex === "Male" ? "Nam" : "Nữ" }}</td>
        <td>
          <ModalTriggerButton target="updateUserModal" class="me-2 btn btn-warning" @click="selectItem(row)">
            Sửa
          </ModalTriggerButton>
          <ModalTriggerButton target="deleteUserModal" class="btn btn-danger" @click="selectItem(row)">
            Xóa
          </ModalTriggerButton>
        </td>
      </VTr>
    </template>
  </CommonActions>
</template>