<template>
  <div class="GoodsListItem" @click="itemClick">
    <img :src="goodsItem.show.img" @load="imageLoad" />
    <p>{{ goodsItem.title }}</p>
    <span class="price">{{ goodsItem.price }}</span>
    <span class="fav">{{ goodsItem.cfav }}</span>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("goodsItemImageLoad");
    },
    itemClick(){
      this.$router.push("/detail/"+this.goodsItem.iid);
    }
  }
};
</script>

<style>
.GoodsListItem {
  /* flex:1; */
  width: 48%;
  font-size: 14px;
  text-align: center;
}

.GoodsListItem img {
  width: 100%;
  border-radius: 6px;
}

.GoodsListItem p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.GoodsListItem .price {
  color: var(--color-tint);
  margin-right: 20px;
}

.GoodsListItem .fav::before {
  content: "";
  background-image: url("~assets/img/common/collect.svg");
  display: inline-block;
  width: 14px;
  height: 14px;
  background-size: cover;
  vertical-align: top;
}
</style>
