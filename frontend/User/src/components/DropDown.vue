<script>
export default {
  props: ['btnName'],
  mounted() {
    this.toggleBtn = new mdb.Dropdown(this.$refs.dropdownBtn)
  }
}
</script>
<template>
  <div mdbDropdown class="btn-group">
    <button type="button" class="btn btn-primary dropdown-toggle" ref="dropdownBtn" @click="toggleBtn.toggle()" mdbDropdownToggle aria-expanded="false">
      {{ btnName }}
    </button>
    <ul mdbDropdownMenu class="dropdown-menu">
      <slot/>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <slot name="footer" />
    </ul>
  </div>
</template>