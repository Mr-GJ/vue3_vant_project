import {request} from "@/networks/requires";

export function getHomeALLData(){
    return request({
        url:'/api/index',
        method:'get'
    })
}