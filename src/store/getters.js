const getters={
  getCheckedItems(state){
    return state.cartList.filter(o=>o.checked===true);
  },
  isAllChecked(state){
    const obj = state.cartList.find(o=>o.checked===false);
    return obj===undefined && state.cartList.length!=0;
  },
  getUncheckedItems(state){
    return state.cartList.filter(o=>o.checked===false);
  }
}
export default getters