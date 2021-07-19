<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
    </nav-bar>
    <div class="wrapper_register">
      <ul class="content">
        <van-image
            width="100"
            height="100"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <van-form @submit="onSubmit">
          <van-field
              v-model="name"
              name="name"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
              v-model="password_confirmation"
              type="password"
              name="password_confirmation"
              label="确认密码"
              placeholder="确认密码"
              :rules="[{ required: true, message: '请确认密码' }]"
          />
          <van-field
              v-model="email"
              name="email"
              label="邮箱"
              placeholder="@qq.com"
              :rules="[{ required: true, message: '请填写邮箱' }]"
          />
          <div style="margin: 16px;">
            <div class="login-link" @click="$router.push({path:'login'})">
              已有账号，立即登录

            </div>
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {nextTick, onMounted, reactive, ref, toRefs, watchEffect} from "vue";
import BetterScroll from "better-scroll";
import {createUser} from "@/networks/user";
import {Notify, Toast} from "vant";
import {useRouter} from "vue-router";

export default {
  name: "Register",
  components: {
    NavBar,

  },
  setup() {
    const router = useRouter()
    let bs = reactive({})
    const userInfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: ''
    })
    const onSubmit = (values) => {
      console.log(userInfo);
      createUser(userInfo).then(res => {
        console.log(res);
        if(res.status == 201){
          Toast('成功注册用户信息');
          userInfo.name = ''
          userInfo.password = ''
          setTimeout(() => {
            router.push({path: '/login'})
          }, 1000)
        }

      })
    }
    /*
     watch
   */
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        bs && bs.refresh()
      })

    })
    /*
      onMounted()
     */
    onMounted(() => {
      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;
      bs = new BetterScroll(document.querySelector('.wrapper_register'), {
        probeType: 3,
        click: true,
        pullUpLoad: true
      })
      bs.on('scroll', (position) => {

      })
      bs.on('pullingUp', () => {

        //等待数据请求结束
        bs.finishPullUp();
        bs.refresh()
      })
    })
    return {
      onSubmit,
      ...toRefs(userInfo)
    }
  }

}
</script>

<style scoped>
.wrapper_register {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.login-link {
  margin-bottom: 20px;
  color: var(--color-tint);
  text-align: left;
}
</style>