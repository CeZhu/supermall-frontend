<template>
  <div id="sub-category">
    <div v-for="item in subCategoryList" class="sub-category-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    subCategoryList:{
      type:Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style scoped>
#sub-category{
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px;
  align-content: flex-start;
}

#sub-category img{
  width: 65px;
  height: 65px;
}
.sub-category-item{
  /* margin: 5px; */
  padding:8px 10px;
  font-size: 12px;
  height: 100px;
  text-align: center;
}
.sub-category-item p{
  width: 60px;
}
</style>