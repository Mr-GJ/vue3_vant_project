import {request} from "./requires";

//增
export function createOrder(data){
    return request({
        url:'/api/orders',
        method:'post',
        data
    })
}

//删
//改
//查
export function getOrderPreviewInfo(){
    return request({
        url:'/api/orders/preview',
        method:'get',
    })
}

export function getOrderList(params){
    return request({
        url:'/api/orders',
        method:'get',
        params
    })
}

export function getOrderDetail(orderId){
    return request({
        url:`/api/orders/${orderId}`,
        method:'get',
        params:{
            include:"address,user,orderDetails.goods"
        }
    })
}

export function checkExpressForOrder(orderId){
    return request({
        url:`/api/orders/${orderId}/express`,
        method:'get'
    })
}

//支付订单,返回支付二维码,params用于http追加参数
export function payForOrder(orderId,params){
    return request({
        url:`/api/orders/${orderId}/pay`,
        method:'get',
        params
    })
}
//订单状态
export function checkOrderStatus(orderId){
    return request({
        url:`/api/orders/${orderId}/status`,
        method:'get'
    })
}
//确认订单
export function confirmOrder(orderId){
    return request({
        url:`/api/orders/${orderId}/confirm`,
        method:'patch'
    })
}

//评价
export function makeCommentForOrder(orderId){
    return request({
        url:`api/orders/${orderId}/comment`,
        method:'post'
    })
}