<template>
  <div id="nav-bar">
    <nav-bar>
      <div slot="left"><img src="~assets/img/common/back.svg" class="back-image" @click="backClick"></div>
      <div slot="center" class="nav-center">
        <div v-for="(item,index) in titles" :key="index" @click="navClick(index)" :class="{active:index===currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  components: { NavBar },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods: {
    navClick(index){
      this.currentIndex=index;
      this.$emit('titleClick',index);
    },
    backClick(){
      this.$router.back();
    }
  },

}
</script>

<style scoped>
.nav-center{
  display: flex;
  font-size: 14px;
}
.nav-center div{
  flex:1;
}
.back-image{
  vertical-align: middle;
}
.active{
  color:var(--color-tint);
}
</style>