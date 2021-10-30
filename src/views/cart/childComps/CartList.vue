<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :itemInfo="item" :key="item.iid"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue"
export default {
  components:{
    CartListItem
  },
  props:{
    cartList:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style scoped>

</style>