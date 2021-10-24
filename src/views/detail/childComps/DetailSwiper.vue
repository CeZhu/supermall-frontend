<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in imageList">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  components: { Swiper, SwiperItem },
  props:{
    imageList:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
