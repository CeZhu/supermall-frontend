<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      class="tab-control2"
      @tabClick="tabClick"
      ref="tabControl2"
      v-show="isFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banner="banner" @imgLoad="imgLoad"></home-swiper>
      <home-recommand-view :recommend="recommend"></home-recommand-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl1"
      ></tab-control>
      <goods-list :goodsList="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="back2Top" v-show="isShowBackTop"></back-top>
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
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultiData, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";
export default {
  components: {
    NavBar,
    TabControl,
    Scroll,
    HomeSwiper,
    HomeRecommandView,
    FeatureView,
    GoodsList,
    BackTop
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
      },
      isShowBackTop: false,
      isFixed: false,
      offsetTop: 50
    };
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("goodsItemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.$store.state.scrollY,0);
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    back2Top() {
      //console.log("click");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //console.log(position.y);
      this.isShowBackTop = -position.y > 1000;

      this.isFixed = -position.y > this.offsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    imgLoad() {
      this.offsetTop = this.$refs.tabControl1.$el.offsetTop;
      //console.log(this.offsetTop);
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
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.tab-control2 {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
