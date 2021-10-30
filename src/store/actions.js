export default {
  addToCart(context,item){
    const existItem = context.state.cartList.find(o=>o.iid===item.iid);
    if(existItem){
      context.commit('addNumber',{existItem,item});
    }else{
      context.commit('addToCart',item);
    }
  },
  checkItems(context,payload){
    payload.map(o=>context.commit('reverseChecked',o));
  }
}