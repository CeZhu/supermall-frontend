<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button class="check-btn" @click.native="checkBtnClick(itemInfo)" v-model="itemInfo.checked" :isChecked="itemInfo.checked"></check-button>
    </div>

    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue";
export default {
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkBtnClick(item){
      this.$store.commit('reverseChecked',item);
    }
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  margin: 5px 0;
  border-bottom: 2px solid #eee;
}

.item-selector {
  display: flex;
  align-items: center;
  margin: auto 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title{
  font-weight: 700;
}
.item-desc,
.item-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
