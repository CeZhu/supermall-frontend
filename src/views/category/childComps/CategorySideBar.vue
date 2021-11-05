<template>
  <div id="category-side-bar">
    <div
      class="category"
      @click="categoryClick(index)"
      v-for="(item, index) in categoryList"
      :key="index"
      :class="{ categoryActive: currentIndex == index }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    categoryClick(index) {
      this.currentIndex = index;
      this.$emit('categoryClick',index);
    }
  }
};
</script>

<style scoped>
.category {
  width: 100px;
  height: 45px;
  background-color: #f6f6f6;
  line-height: 45px;
  text-align: center;
}
.categoryActive {
  font-weight: 700;
  background-color: #fff;
  color: var(--color-tint);
  border-left: 2px solid var(--color-tint);
}
</style>
