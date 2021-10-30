<template>
  <div class="check-button" :class="{ selected: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 2px #ccc;
  background-color: #fff;
}
.selected {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
