<template>
  <div id="detail" @scroll="scroll" ref="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="navBar"
    ></detail-nav-bar>
    <back-top
      v-show="isShowBackTop"
      class="detail-back-top"
      @click.native="back2Top"
    ></back-top>

    <detail-swiper :imageList="topImages" class="detail-swiper"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
    <detail-param-info :goodsParam="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info
      :commentInfo="commentInfo"
      ref="comment"
    ></detail-comment-info>
    <detail-recommend-info
      :recommendList="recommendList"
      ref="recommend"
      class="recommend-info"
    ></detail-recommend-info>
    <detail-bottom-bar @cartClick="cartClick"></detail-bottom-bar>
    <van-dialog
      v-model="show"
      title="数量"
      show-cancel-button
      @confirm="cartConfirm"
    >
      <div class="cart-num">
        <van-button
          type="default"
          icon="minus"
          class="cart-num-item"
          @click="minusClick"
        ></van-button>
        <van-field
          v-model.number="number"
          type="digit"
          input-align="center"
          class="cart-num-item"
        />
        <van-button
          type="default"
          icon="plus"
          class="cart-num-item"
          @click="plusClick"
        ></van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import BackTop from "components/content/backTop/BackTop.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailcommentInfo.vue";
import DetailRecommendInfo from "./childComps/DetailrecommendInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
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
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      paramInfo: {},
      detailInfo: {},
      isShowBackTop: false,
      commentInfo: {},
      recommendList: [],
      scrollTops: [],
      show: false,
      number: 1
    };
  },
  methods: {
    scroll() {
      let scrollY = this.$refs.detail.scrollTop;
      this.isShowBackTop = scrollY > 1000;

      if (Math.ceil(scrollY) >= this.scrollTops[3]) {
        this.$refs.navBar.currentIndex = 3;
      } else if (Math.ceil(scrollY) >= this.scrollTops[2]) {
        this.$refs.navBar.currentIndex = 2;
      } else if (Math.ceil(scrollY) >= this.scrollTops[1]) {
        this.$refs.navBar.currentIndex = 1;
      } else {
        this.$refs.navBar.currentIndex = 0;
      }

      // console.log(this.scrollTops);
      // console.log(scrollY);
    },
    back2Top() {
      this.$refs.detail.scrollTop = 0;
    },
    titleClick(index) {
      this.$refs.detail.scrollTop = this.scrollTops[index];
    },
    cartClick() {
      this.show = true;
    },
    plusClick() {
      this.number++;
    },
    minusClick() {
      this.number = this.number > 1 ? this.number - 1 : 1;
    },
    cartConfirm() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.realPrice;
      obj.number = this.number;
      // 3.添加到Store中
      if (this.number > 0) {
        obj.checked=false;
        this.$store.dispatch("addToCart", obj);
      }
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

      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      getRecommend().then(res => {
        this.recommendList = res.data.data.list;
      });
    });
  },
  mounted() {},
  updated() {
    this.scrollTops = [];
    this.scrollTops.push(0);
    this.scrollTops.push(this.$refs.params.$el.offsetTop);
    this.scrollTops.push(this.$refs.comment.$el.offsetTop);
    this.scrollTops.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.scrollTops);
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
.detail-nav-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: #fff;
}
.detail-swiper {
  margin-top: 44px;
}
.detail-back-top {
  position: fixed;
  right: 8px;
  bottom: 60px;
}
.recommend-info {
  padding-bottom: 59px;
}
.cart-num {
  display: flex;
}
</style>
