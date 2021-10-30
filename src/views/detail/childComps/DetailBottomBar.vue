<template>
  <div id="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <p>客服</p>
      </div>
      <div>
        <i class="icon shop"></i>
        <p>店铺</p>
      </div>
      <div>
        <i class="icon collect"></i>
        <p>收藏</p>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cartClick(){
      this.$emit('cartClick');
    }
  },
};
</script>

<style scoped>
#bottom-bar {
  height: 59px;
  display: flex;
  position: fixed;
  bottom:0;
  left:0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}
#bottom-bar>div{
  flex:1;
  display: flex;
}
#bottom-bar>div>div{
  flex: 1;
  text-align: center;
}

.bar-left{
  font-size: 14px;
}
.bar-right>div{
  line-height: 59px;
}
.icon {
  display: block;
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.shop{
  background-position: 0 -98px;
}
.service{
  background-position: 0 -54px;
}
.cart{
  background-color: #ffe817;
  color: #333;
}
.buy{
  background-color: #f69;
  color:#fff;
}
</style>
