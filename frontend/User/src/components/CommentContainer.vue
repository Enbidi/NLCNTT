<script>
import Comment from './Comment.vue'
import Rating from './Rating.vue'
import RatingInput from './RatingInput.vue'
import { useAuthStore } from '../stores/auth'
export default {
  components: {
    Comment,
    Rating,
    RatingInput
  },
  props: ['productId'],
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
              v-model="typingComment" />
            <button class="btn btn-primary" type="button" @click="addComment(typingComment)">
              Thêm bình luận
            </button>
          </div>
          <form>
            <RatingInput />
          </form>
          <Comment 
            v-for="t in comments"
            :rating-stars="t.rating"
            avt="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
            content="Type your note, and hit enter to add it" username="Martha" />

        </div>
      </div>
    </div>
  </div>
</template>