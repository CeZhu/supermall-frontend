<template>
  <div id="home-swiper">
    <swiper>
      <swiper-item v-for="item in banner.list" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  components: { Swiper, SwiperItem },
  props:{
    banner:{},
    default(){
      return {};
    }
  }
}
</script>

<style>
#home-swiper{
  margin-top: 44px;
}
</style>