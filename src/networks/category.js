import {request} from "./requires";

export function getCategoryALLData(){
    return request({
        url:'/api/goods'
    })
}
export function getCategoryGoodsByOrder(orderType='price',cid=0,page=1){
    return request({
        url:'/api/goods?'+orderType+"=1&category_id="+cid+"&page="+page
    })
}