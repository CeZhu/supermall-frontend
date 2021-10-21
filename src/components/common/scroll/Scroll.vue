<template>
  <div ref="wrapper">
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(Pullup);
BScroll.use(ObserveDOM);

export default {
  components: {},
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time);
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      pullUpLoad: true,
      observeDOM: true,
      click: true
    });
  },
  updated() {
    this.scroll.refresh();
  }
};
</script>

<style scoped></style>
