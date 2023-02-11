<script>
import { Input, Modal } from 'mdb-ui-kit'
export default {
  props: ["id", "title"],
  inheritAttrs: false,
  mounted() {
    this.$refs.modal.querySelectorAll(".form-outline").forEach(
      formOutline => new Input(formOutline).init()
    )
    let modalRef = this.$refs.modal
    this.instance = Modal.getInstance(modalRef)
    if (this.instance == undefined) {
      this.instance = new Modal(modalRef)
    }
  },
  methods: {
    show() {
      this.instance.show()
    }
  }
}
</script>

<template>

  <Teleport to="body">
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}Label`">
              {{ title }}
            </h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>