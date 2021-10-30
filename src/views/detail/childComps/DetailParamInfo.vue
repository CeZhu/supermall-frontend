<template>
  <div id="param-info" v-if="Object.keys(goodsParam).length!==0">
    <div class="info">
      <div v-for="(item,index) in goodsParam.sizes[0]" class="item-rule" :key="index">
          <div v-for="n in item">{{n}}</div>
      </div>
    </div>
    <div id="item-info" v-for="item in goodsParam.infos">
       <div class="key">{{item.key}}</div>
       <div class="value">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    goodsParam:{
      type:Object,
      default(){
        return {};
      }
    }
  },
};
</script>

<style scoped>
#param-info{
  font-size:14px;
  border-bottom: 5px solid #f2f5f8;
  margin-bottom: 20px;
}
.item-rule{
  display: flex;
  margin:10px 20px;
}
.item-rule div{
  padding:10px 0;
  flex:1;
  border-bottom: 1px solid #eee;
}

#item-info{
  display: flex;
  margin:10px 20px;
}
#item-info div{
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.key{
  width: 25%;
}
.value{
  width: 75%;
  color:#eb4868;
}
</style>
