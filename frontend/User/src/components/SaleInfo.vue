
<template>
  <div class="alert alert-info alert-coupon">
    <h4><slot/></h4>
    <!-- <p>{{ content }}</p> -->
  </div>
</template>

<style scoped>
.alert-coupon {
  border: 1px dashed;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
}

p:last-child {
  margin-bottom: 0;
}
</style>