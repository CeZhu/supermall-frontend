<template>
  <div id="detail" @scroll="scroll" ref="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <back-top v-show="isShowBackTop" class="detail-back-top" @click.native="back2Top"></back-top>

    <detail-swiper :imageList="topImages" class="detail-swiper"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
    <detail-param-info :goodsParam="paramInfo"></detail-param-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import { getDetail, Goods, Shop, GoodsParam } from "network/detail";
import BackTop from 'components/content/backTop/BackTop.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailBaseInfo,
    Scroll,
    BackTop,
    DetailParamInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      paramInfo: {},
      detailInfo: {},
      isShowBackTop: false
    };
  },
  methods: {
    scroll(){
      let scrollY=this.$refs.detail.scrollTop;
      this.isShowBackTop = scrollY>1000;
    },
    back2Top(){
      this.$refs.detail.scrollTo(0,0);
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
  mounted() {
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  overflow: scroll;
}
.detail-nav-bar{
  position: fixed;
  top:0;
  right:0;
  left:0;
  z-index: 99;
  background-color: #fff;
}
.detail-swiper{
  margin-top:44px;
}
.detail-back-top{
  position: fixed;
  right:8px;
  bottom: 40px;
}
</style>
