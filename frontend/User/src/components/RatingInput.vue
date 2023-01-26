<template>
  <div class="rating">
    <label>
      <input type="radio" name="rating" value="1" @change="$emit('ratingChange', 1)"/>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
    </label>
    <label>
      <input type="radio" name="rating" value="2" @change="$emit('ratingChange', 2)" />
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
    </label>
    <label>
      <input type="radio" name="rating" value="3" @change="$emit('ratingChange', 3)"/>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
    </label>
    <label>
      <input type="radio" name="rating" value="4" @change="$emit('ratingChange', 4)" />
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
    </label>
    <label>
      <input type="radio" name="rating" value="5" @change="$emit('ratingChange', 5)"/>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
      <span class="icon"><i class="fa-regular fa-star"></i></span>
    </label>
  </div>
</template>

<style scoped>
.rating {
  display: inline-block;
  position: relative;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
}

.rating label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  cursor: pointer;
}

.rating label:last-child {
  position: static;
}

.rating label:nth-child(1) {
  z-index: 5;
}

.rating label:nth-child(2) {
  z-index: 4;
}

.rating label:nth-child(3) {
  z-index: 3;
}

.rating label:nth-child(4) {
  z-index: 2;
}

.rating label:nth-child(5) {
  z-index: 1;
}

.rating label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.rating label .icon {
  float: left;
  color: transparent;
  transition: all .5s ease-in-out;
}

.rating label .icon .fa-star{
  transition: all .3s ease-in-out;
}

.rating label:last-child .icon {
  color: #000;
}

.rating:not(:hover) label input:checked~.icon .fa-star,
.rating:hover label:hover input~.icon .fa-star{
  color: rgb(56, 50, 50);
  font-weight: 900;
  transform: scale(1.5);
}

.rating label input:focus:not(:checked)~.icon:last-child {
  color: #000;
  text-shadow: 0 0 5px #09f;
}
</style>