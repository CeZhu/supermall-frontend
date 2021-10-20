<template>
  <div class="recommend">
    <div v-for="item in recommend.list" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommend:{
      type:Object,
      default(){
        return {};
      }
    }
  }
}
</script>

<style>
  .recommend{
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: solid 8px #eee;
  }

  .recommend div{
    flex:1;
    text-align: center;
    font-size: 14px;
  }

  .recommend img{
    width: 80%;
  }
</style>