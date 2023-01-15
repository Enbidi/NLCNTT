<script setup>
defineProps({
  id: {
    type: String,
    require: true
  }
})
</script>

<script>
export default {
  inheritAttrs: false
}
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="`#${id}`">
    <slot name="buttonContent" />
  </button>

  <!-- Modal -->
  <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="`${id}Label`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${id}Label`">
            <slot name="modalTitle"/>
          </h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>