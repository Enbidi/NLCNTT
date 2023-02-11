<script>
import { watch } from 'vue'
import { Input } from 'mdb-ui-kit'
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
    this.$el.querySelectorAll(".form-outline").forEach(input => new Input(input).init())
    var response = await fetch(import.meta.env.VITE_PRODUCT_URL + `/${this.productId}/comment`)
    if (!response.ok) {
      console.error(await response.json())
      return
    }
    var data = await response.json()
    this.comments = data.items
  },
  methods: {
    async addComment(content) {
      if (!this.authStore.isAuthenticated) {
        return
      }
      const response = await fetch(import.meta.env.VITE_USER_URL + "/comment/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: this.ratingStars,
          content,
          user: this.authStore.id,
          product: this.productId
        })
      })
      if (!response.ok) {
        return
      }
      const data = await response.json()
      const comment = data.created
      this.comments.unshift(comment)
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
          <TransitionGroup
            enter-active-class="animate__animated animate__fadeInDown"
            leave-active-class="animate__animated animate__fadeOutDown"
            tag="div">
            <Comment v-for="comment in comments" :rating-stars="comment.rating"
              avt="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
              :content="comment.content"
              username="Martha" 
              :key="comment._id"/>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .fade-leave-active,
.fade-enter-active,
.fade-move {
  transition: all .5s ease-in-out;
} */

.v-move {
  transition: all .5s ease-in-out;
}
/* 
.fade-leave-active {
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>