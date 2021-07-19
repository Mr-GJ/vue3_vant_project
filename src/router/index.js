import {createRouter, createWebHistory} from 'vue-router'
import store from "../store";
import {Notify} from "vant";

import Login from "@/views/profile/Login";
const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Detail = () => import('../views/detail/Detail');
const Profile = () => import('../views/profile/Profile');
const ShopCar = () => import('../views/shopCar/ShopCar');
const Register = () => import('../views/profile/Register');
const Address = ()=> import('../views/profile/Address');
const AddressEdit = ()=> import('../views/profile/AddressEdit');
const AddressNew = ()=> import('../views/profile/AddressNew');

const routes = [
    {
        path: '',
        name: 'DefaultHome',
        component: Home,
        meta:{
            title:'图书商城-首页'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
            title:'图书商城-首页'
        }
    },
    {
        path: '/category',
        name: 'Category',
        component: Category,
        meta:{
            title:'图书商城-分类'
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta:{
            title:'图书商城-详情'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta:{
            title:'图书商城-信息注冊'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            title:'图书商城-游客登录'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta:{
            title:'图书商城-个人中心',
            isAuth:true
        }
    },
    {
        path: '/shopCar',
        name: 'ShopCar',
        component: ShopCar,
        meta:{
            title:'图书商城-购物车',
            isAuth:true
        }
    },
    {
        path: '/address',
        name: 'Address',
        component: Address,
        meta:{
            title:'图书商城-地址管理',
            isAuth:true
        }
    },
    {
        path: '/addressEdit',
        name: 'AddressEdit',
        component: AddressEdit,
        meta:{
            title:'图书商城-地址编辑',
            isAuth:true
        }
    },
    {
        path: '/addressNew',
        name: 'AddressNew',
        component: AddressNew,
        meta:{
            title:'图书商城-新增地址',
            isAuth:true
        }
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    //没有登录，在这里做跳板
    console.log(to.meta.isAuth)
    console.log(store.state.user.isLogin)
    if(to.meta.isAuth && store.state.user.isLogin === false){
        Notify("请先登录")
        next('/login')
    }else if(to.path === '/shopCar'){
        store.dispatch('updateCart')
        next()
    }else {
        next();
    }

    document.title = to.meta.title;
})
export default router
