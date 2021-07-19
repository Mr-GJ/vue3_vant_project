/*
异步操作
 */
import {getCartList} from "@/networks/shopCart";

const actions = {
    updateCart(context){
        getCartList().then(res=>{
            context.commit('getCartCount',{count:res.data.length || 0})
        })
    }
}
export default actions;