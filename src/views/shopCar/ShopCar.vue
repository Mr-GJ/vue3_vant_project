<template>
  <div>
    <nav-bar>
      <template v-slot="center">购物车</template>
    </nav-bar>
    <div class="cart-box">
      <div class="content">
        <!--商品信息-->
        <div class="cart-body">
          <van-checkbox-group ref="checkBoxGroup" @change="onChange" v-model="checkResult">
            <van-swipe-cell right-width="80" v-for="(item,index) in list" :key="index">
              <div class="good-item">
                <van-checkbox :name="item.id"/>
                <div class="good-img">
                  <img :src="item.goods.cover_url" alt="">
                </div>
                <div class="good-desc">
                  <div class="good-title">
                    <span>{{ item.goods.title }}</span>
                    <span>库存:{{ item.goods.stock }}</span>
                  </div>
                  <div class="good-btn">
                    <div class="price">
                      <small>￥</small>{{ item.goods.price }}
                    </div>
                    <van-stepper @change="onChangeForNum" integer :min="1" :max="item.goods.stock"
                                 :model-value="item.num" :name="item.id" async-change/>
                  </div>
                </div>
              </div>
              <template #right>
                <van-button @click="deleteGood(item.id)" class="delete-button" square icon="delete" type="danger"
                            text="删除"/>
              </template>
            </van-swipe-cell>
          </van-checkbox-group>
        </div>
        <!--结算信息-->
        <van-submit-bar class="submit-all" :price="pay*100" button-text="提交订单" @submit="onsubmit">
          <van-checkbox @click="allCheck" v-model="isChecked">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>

    <div class="empty" v-if="!list.length">
      <img src="~assets/images/emptyCart.png" alt="空的购物车">
      <div class="title">购物车空空如也</div>
      <van-button round color="#1baee" type="primary" block @clock="goToShouYe">前往选购</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {computed, nextTick, onMounted, reactive, ref, toRefs, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import {deleteCartItem, getCartList, modifyCart, modifyCheckedGoodsInCart} from "@/networks/shopCart";
import BetterScroll from "better-scroll";
import {useStore} from "vuex";

export default {
  name: "ShopCar",
  components: {
    NavBar,
  },
  setup() {
    let isChecked = ref(false);
    let bs = reactive({})
    const router = useRouter()
    const store = useStore()
    //数据模型
    const books = reactive({
      list: [],
      checkResult: [],
      isAllChecked: true
    })
    const goToShouYe = () => {
      router.push({path: '/home'})
    }
    const init = () => {
      Toast.loading({message: "正在加载中...", forbidClick: true})
      getCartList("include=goods").then(res => {
        console.log(res);
        books.list = res.data
        books.checkResult = res.data.filter(n => n.is_checked === 1).map(item => item.id)
        Toast.clear()
      })
    }
    //修改数量
    const onChangeForNum = (value, detail) => {
      Toast.loading({message: "修改中...", forbidClick: true})
      modifyCart(detail.name, {num: value}).then(res => {
        books.list.forEach(item => {
          if (item.id == detail.name) {
            item.num = value;
          }
        })
        Toast.clear()
      })
    }
    //改变复选框
    const onChange = (checkResult) => {
      if (checkResult.length === books.list.length) {
        isChecked.value = books.isAllChecked = true;
      } else {
        isChecked.value = books.isAllChecked = false;
      }
      Toast.loading({message: "修改中...", forbidClick: true})
      books.checkResult = checkResult
      modifyCheckedGoodsInCart({cart_ids: checkResult}).then(res => {
        Toast.clear()
      })
    }
    const allCheck = () => {
      if (!books.isAllChecked) {
        books.checkResult = books.list.map(item => item.id)
        books.isAllChecked = !books.isAllChecked;
      } else {
        books.checkResult = []
        books.isAllChecked = !books.isAllChecked;
      }
      isChecked.value = books.isAllChecked
    }
    const deleteGood = (good_id) => {
      deleteCartItem(good_id).then(res => {
        init()
        store.dispatch('updateCart')
      })
    }
    const pay = computed(() => {
      let price = 0;
      books.list.filter(n => books.checkResult.includes(n.id)).forEach(item => {
        price += parseInt(item.num) * parseFloat(item.goods.price)
      })
      return price
    })
    //创建订单
    const onsubmit = () => {
      if(books.checkResult.length == 0){
        Toast.fail("请选择商品进行结算")
        return;
      }else{
        router.push({path:'/createOrder'})
      }


    }
    /*
      onMounted
     */
    onMounted(() => {
      init()
      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;
      bs = new BetterScroll(document.querySelector('.cart-box'), {
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
    /*
       watch
    */
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        bs && bs.refresh()
      })
    })
    return {
      ...toRefs(books),
      goToShouYe,
      onChangeForNum,
      onChange,
      allCheck,
      deleteGood,
      pay,
      isChecked,
      onsubmit
    }
  }
}
</script>

<style scoped lang="scss">
.cart-box {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;

  .cart-body {
    position: relative;
    left: 0;
    right: 0;
    width: 100%;

    .good-item {
      margin: 0;
      background-color: white;

      .good-title {
        line-height: 30px;
      }

      .good-btn {
      }

      .good-img {
        float: left;
        width: 90px;
        height: 90px;
        margin-left: 20px;
      }
    }

    .delete-button {
      height: 100%;
    }

  }

  .submit-all {
    position: relative;
  }
}

</style>