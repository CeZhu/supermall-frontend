<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" @click="itemClick(index)">
      <span :class="{active:index==currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    titles:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
  height:40px;
  line-height: 40px;
}
.tab-control div{
  flex:1;
  background-color: #fff;
}
.tab-control span{
  padding:5px;
}

.active{
  color:var(--color-tint);
  border-bottom: solid 1px var(--color-tint);
}
</style>