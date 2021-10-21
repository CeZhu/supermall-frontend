<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banner="banner"></home-swiper>
      <home-recommand-view :recommend="recommend"></home-recommand-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goodsList="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="back2Top"></back-top>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommandView from "./childComps/HomeRecommandView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue"

import { getHomeMultiData, getHomeGoods } from "network/home.js";
export default {
  components: {
    NavBar,
    TabControl,
    Scroll,
    HomeSwiper,
    HomeRecommandView,
    FeatureView,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      keywords: "",
      dKeyword: "",
      recommend: {},
      banner: {},
      titles: ["流行", "新款", "精选"],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      }
    };
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /* 事件相关方法 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
    },
    back2Top(){
      //console.log("click");
      this.$refs.scroll.scrollTo(0,0);
    },
    /* 网络请求相关方法 */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.keywords = res.data.data.keywords;
        this.dKeyword = res.data.data.dKeyword;
        this.recommend = res.data.data.recommend;
        this.banner = res.data.data.banner;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.data.list);
      });
      this.goods[type].page++;
    }
  }
};
</script>

<style>
#home{
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 49px;
  left:0;
  right: 0;
}
</style>
