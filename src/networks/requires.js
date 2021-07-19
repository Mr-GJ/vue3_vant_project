import axios from "axios";
import {Notify, Toast} from "vant";
import router from "@/router";

export function request(config){
    const instance = axios.create({
        //基本请求URL,一定是URL
        baseURL:'https://api.shop.eduwork.cn',
        timeout:5000
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
        const token = window.localStorage.getItem('token')
        if(token)
            config.headers.Authorization='Bearer '+token
        //直接放行
        return config;
    },error => {

    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data?res.data:res;
    },error => {
        if(error.response.status === 401){
            Toast.fail("请先登录")
            router.push({path:'/login'})
        }

        Notify(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]);
    })
    return instance(config);
}