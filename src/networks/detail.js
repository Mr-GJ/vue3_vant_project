import {request} from "./requires";

export function getDetailDataById(id){
    return request({
        url:'/api/goods/'+id
    })
}