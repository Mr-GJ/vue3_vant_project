import {request} from "./requires";

//添加购物车
export function addCart(data){
    return request({
        url:'/api/carts',
        method:'post',
        data
    })
}
//修改购物车
export function modifyCart(cart_id,data){
    return request({
        url:`/api/carts/${cart_id}`,
        method:'put',
        data
    })
}
//选择商品状态cheked
export function modifyCheckedGoodsInCart(data){
    return request({
        url:'/api/carts/checked',
        method:'PATCH',
        data
    })
}
//获取购物车列表
export function getCartList(data=''){
    return request({
        url:'/api/carts?'+data,
    })
}
//删除购物车
export function deleteCartItem(id){
    return request({
        url:`/api/carts/${id}`,
        method:'DELETE'
    })
}