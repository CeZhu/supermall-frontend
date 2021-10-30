<template>
  <div class="bottom-bar">
    <check-button
      class="check-button"
      @click.native="allCheckClick"
      :isChecked="isAllChecked"
    ></check-button>
    <div class="right-side">
      <span>全选</span>
      <span>合计：￥{{ totalPrice }}</span>
      <span>去计算({{ totalNum }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue";
export default {
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      let list = this.$store.getters.getCheckedItems;
      if (list.length == 0) return 0;
      return list
        .reduce((preValue, item) => {
          return preValue + item.price * item.number;
        }, 0)
        .toFixed(2);
    },
    totalNum() {
      return this.$store.getters.getCheckedItems.length;
    },
    isAllChecked() {
      return this.$store.getters.isAllChecked;
    }
  },
  methods: {
    allCheckClick() {
      if (this.isAllChecked) {
        this.$store.dispatch("checkItems", this.$store.state.cartList);
      } else {
        this.$store.dispatch(
          "checkItems",
          this.$store.getters.getUncheckedItems
        );
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  background-color: #eee;
  width: 100%;
  height: 44px;
  bottom: 50px;

  display: flex;
  align-items: center;
}
.bottom-bar .right-side {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.check-button {
  display: inline-block;
  margin-right: 5px;
}
.bottom span {
  display: block;
  height: 44px;
}
</style>
