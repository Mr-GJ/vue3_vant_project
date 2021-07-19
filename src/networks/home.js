import {request} from "./requires";

export function getHomeALLData(){
    return request({
        url:'/api/index'
    })
}

export function getHomeGoodsData(type='sales',page=1){
    return request({
        url:'/api/index'+"?"+type+"=1"+"&page="+page,
    })
}