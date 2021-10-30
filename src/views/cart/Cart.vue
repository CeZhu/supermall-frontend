<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list" :cartList="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import BottomBar from './childComps/BottomBar.vue';
export default {
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length;
    },
    cartList(){
      return this.$store.state.cartList;
    }
  }
};
</script>

<style scoped>
.cart-nav-bar {
  color: #fff;
  background-color: var(--color-tint);
  position:fixed;
  top:0;
  right:0;
  left:0;
  z-index: 9;
}
.cart-list{
  margin-top:50px;
  margin-bottom:100px;
}
</style>
