<script setup>
import Comment from './Comment.vue'
import { inject } from 'vue'
import { useFetch } from './composables/useFetch'
import { useAuthStore } from '../stores/auth'
defineProps(['productId'])
</script>

<script>
export default {
  setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  },
  mounted() {
    this.$el.querySelectorAll(".form-outline").forEach(input => new mdb.Input(input).init())
  },
  methods: {
    addComment(newComment) {
      if (!this.authStore.isAuthenticated) {
        return
      }
      this.comments.push(newComment)
      fetch("http://localhost:3000/comment/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: newComment,
        })
      })
    }
  },
  data() {
    return {
      typingComment: '',
      comments: []
    }
  }
}
</script>

<template>
  <div class="row d-flex justify-content-center">
    <div class="col">
      <div class="card shadow-0 border" style="background-color: #f0f2f5;">
        <div class="card-body p-4">
          <!-- <div class="row">
            <div class="col-md-11">
              <div class="form-outline mb-4">
                <input type="text" id="addAComment" class="form-control" placeholder="Nhập bình luận..."
                  v-model="comment" />
                <label class="form-label" for="addAComment"> Thêm bình luận</label>
              </div>
            </div>
            <div class="col-md-1">
              <button class="btn btn-primary">Them</button>
            </div>
          </div> -->

          <div class="input-group mb-3">
            <input type="text" id="addAComment" class="form-control" placeholder="Nhập bình luận..."
              v-model="comment" />
            <button class="btn btn-primary" type="button" @click="addComment(typingComment)">
              Thêm bình luận
            </button>
          </div>

          <Comment 
            v-for="t in comments"
            avt="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
            content="Type your note, and hit enter to add it" username="Martha" />

        </div>
      </div>
    </div>
  </div>
</template>