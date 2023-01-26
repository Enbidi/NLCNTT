<script>
import { watch } from 'vue'
import Comment from './Comment.vue'
import Rating from './Rating.vue'
import RatingInput from './RatingInput.vue'
import { useAuthStore } from '../stores/auth'
export default {
  inject: ['ratingStars'],
  props: ['productId'],
  components: {
    Comment,
    Rating,
    RatingInput
  },
  setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  },
  async mounted() {
    this.$el.querySelectorAll(".form-outline").forEach(input => new mdb.Input(input).init())
    var response = await fetch(`http://localhost:3000/product/${this.productId}/comment`)
    if (!response.ok) {
      console.error(await response.json())
      return
    }
    var data = await response.json()
    this.comments = data.items
  },
  methods: {
    addComment(newComment) {
      if (!this.authStore.isAuthenticated) {
        return
      }
      this.comments.push(newComment)
      fetch("http://localhost:3000/user/comment/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: 4,
          content: newComment,
          user: this.authStore.id,
          product: this.productId
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
          <div class="input-group mb-3">
            <input type="text" id="addAComment" class="form-control" placeholder="Nhập bình luận..."
              v-model="typingComment" />
            <button class="btn btn-primary" type="button" @click="addComment(typingComment)">
              Thêm bình luận
            </button>
          </div>
          <Comment 
            v-for="comment in comments"
            :rating-stars="comment.rating"
            avt="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
            :content="comment.content" username="Martha" />
        </div>
      </div>
    </div>
  </div>
</template>