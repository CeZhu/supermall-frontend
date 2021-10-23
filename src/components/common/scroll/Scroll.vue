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
  props:{
    probeType:{
      type: Number,
      default:0
    },
    pullUpLoad:{
      type: Boolean,
      default:false
    }

  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time);
    },
    refresh(){
      this.scroll.refresh();
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      //observeDOM: true,
      click: true
    });

    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position);
    });

    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp');
      this.scroll.finishPullUp();
    });
  },
  updated() {
    //this.scroll.refresh();
  }
};
</script>

<style scoped></style>
