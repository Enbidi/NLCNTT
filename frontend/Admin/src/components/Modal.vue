<script>
export default {
  inheritAttrs: false,
  mounted() {
    this.$refs.modal.querySelectorAll(".form-outline").forEach(
      formOutline => new mdb.Input(formOutline).init()
    )
    let modalRef = this.$refs.modal
    this.instance = mdb.Modal.getInstance(modalRef)
    if (this.instance == undefined) {
      this.instance = new mdb.Modal(modalRef)
    }
  }
}
</script>

<template>

  <Teleport to="body">
    <!-- Modal -->
    <div class="modal fade" :id="$attrs.id" tabindex="-1" :aria-labelledby="`${$attrs.id}Label`"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${id}Label`">
              <slot name="modalTitle" />
            </h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>