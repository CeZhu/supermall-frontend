<template>
  <div id="category"> 
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },

}
</script>

<style scoped>
.category-nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>