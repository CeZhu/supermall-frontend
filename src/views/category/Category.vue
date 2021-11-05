<template>
  <div id="category"> 
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category-content">
      <category-side-bar :category-list="categoryList" @categoryClick="categoryClick"></category-side-bar>
      <div class="right">
        <sub-category :subCategoryList="subCategoryList"></sub-category>
        <tab-control  :titles="titles" @tabClick="tabClick"></tab-control>
        <goods-list :goodsList="goods[currentType]"></goods-list>
      </div>

    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CategorySideBar from './childComps/CategorySideBar.vue'
import {getCategory,getSubcategory,getCategoryDetail} from "network/category.js"
import SubCategory from './childComps/SubCategory.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
export default {
  components: { NavBar,CategorySideBar, SubCategory, TabControl, GoodsList },
  data(){
    return {
      categoryList:[],
      subCategoryList:[],
      titles:['综合','新品','销量'],
      goods: {
        pop: [],
        new: [],
        sell: []
      },
      currentType: 'pop'
    }
  },
  created() {
    getCategory().then(res=>{
      this.categoryList = res.data.data.category.list;
    });
  },
  methods: {
    categoryClick(index){
      getSubcategory(this.categoryList[index].maitKey).then(res=>{
        this.subCategoryList=res.data.data.list;
      });
      getCategoryDetail(this.categoryList[index].miniWallkey,'pop').then(res=>{
        this.goods.pop=res.data;
      });
      getCategoryDetail(this.categoryList[index].miniWallkey,'new').then(res=>{
        this.goods.new=res.data;
      });
      getCategoryDetail(this.categoryList[index].miniWallkey,'sell').then(res=>{
        this.goods.sell=res.data;
      });
    },
    tabClick(index){
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
    }
    
  },

}
</script>

<style scoped>
.category-nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  position: sticky;
  top:0;
}
.category-content{
  display: flex;
}
.right{
  width: 275px;
}

</style>