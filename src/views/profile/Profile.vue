<template>
  <div id="box">
    <nav-bar>
      <template v-slot="center">个人中心</template>
    </nav-bar>
    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img src="~assets/images/user.jpg">
          <div class="user-desc">
            <span>昵称：{{ user.name }}</span>
            <span>登录名：{{user.email}}</span>
            <span class="name">个性签名：控制敌人，掌控自己</span>

          </div>
        </div>
      </div>
      <div class="user-list">
        <li class="van-hairline--bottom" @click="goTo('/collect')">
          <span>我的收藏</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline--bottom" @click="goTo('/orderList')">
          <span>我的订单</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline--bottom" @click="goTo('/setting')">
          <span>账号管理</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline--bottom" @click="goTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline--bottom" @click="goTo('/about')">
          <span>关于我们</span>
          <van-icon name="arrow"/>
        </li>
      </div>
    </div>
    <div style="margin: 15px">
      <van-button @click="toLogOut" round block color="#44BA80">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getUserInfo, logOut} from "@/networks/user";
import {Notify} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted, reactive, ref, toRefs} from "vue";

export default {
  name: "Profile",
  components: {
    NavBar,
  },
  setup() {
    //reactive内置自定义对象
    const user_Info = reactive({
      user:{},
    })
    const myinfo = ref(["我的收藏", "我的订单", "账号管理", "地址管理", "关于我们"])
    const store = useStore()
    const router = useRouter()
    const toLogOut = () => {
      logOut().then(res => {
        window.localStorage.setItem('token', '')
        if (res.status == '204') {
          Notify("已退出账户")
          //vuex
          store.commit('setIsLogin', false)
          setTimeout(() => {
            router.push({path: '/login'})
          }, 5000)
        }
      })
    }
    const goTo = (path,query)=>{
      router.push({path:path,query:query||{}})
    }
    /*
      onMounted
     */
    onMounted(()=>{
      getUserInfo().then(res=>{
        user_Info.user = res
        console.log(user_Info);
      })
    })
    return {
      toLogOut,
      myinfo,
      ...toRefs(user_Info),
      goTo
    }
  }

}
</script>

<style scoped lang="scss">
#box {
  background: white;
  height: 100vh;
}

.user-box {
  margin-top: 60px;

  .user-info {
    width: 94%;
    height: 115px;
    margin: 10px;
    background: linear-gradient(90deg, #31c7A7, #A1c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    text-align: left;

    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }

      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;

        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
    }
  }

  .user-list {
    padding: 0 8px;
    margin-top: 40px;

    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .van-icon-arrow {
        margin-top: 13px;
      }

      margin: 20px 0;
      background: #FFFFFF;
      border-radius: 3px;
    }
  }
}

</style>