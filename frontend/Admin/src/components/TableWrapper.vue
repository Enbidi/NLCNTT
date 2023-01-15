<script>
export default {
  mounted() {
    this.$el.querySelectorAll(".form-outline")
      .forEach(input => new mdb.Input(input).init())
  }
}
</script>

<template>
  <div>
    <h1 class="mt-4">Sản phẩm</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Dữ liệu các sản phẩm</li>
    </ol>
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Bảng Dữ Liệu
      </div>
      <div class="card-body">
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>