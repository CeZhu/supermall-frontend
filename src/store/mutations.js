export default {
  setScrollY(state,x){
    state.scrollY = x;
  },
  addNumber(state,payload){
    payload.existItem.number+=payload.item.number;
  },
  addToCart(state,item){
    state.cartList.push(item);
  },
  reverseChecked(state,item){
    const a=state.cartList.find(o=>o.iid==item.iid);
    a.checked = !a.checked;
  }
}