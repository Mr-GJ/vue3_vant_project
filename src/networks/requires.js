import axios from "axios";

export function request(config){
    const instance = axios.create({
        //基本请求URL
        baseUrl:'https://api.shop.eduwork.cn/',
        timeout:5000
    })
    //请求拦截
    instance.interceptors.request.use(config=>{

        //直接放行
        return config;
    },error => {

    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data?res.data:res;
    },error => {

    })
    return instance;
}