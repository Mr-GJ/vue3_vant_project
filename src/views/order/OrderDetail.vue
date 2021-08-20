<template>
  <div>
    <nav-bar>
      <template v-slot="center">订单详情{{ orderDetail.orderId }}</template>
    </nav-bar>
    <div class="detail-box">
      <div class="content">
        <div class="order-status">
          <div class="status-item">
            <label>订单状态:</label>
            <span>{{ payingStatus }}</span>
          </div>
          <div class="status-item">
            <label>订单编号:</label>
            <span>{{ orderDetail.info.order_no }}</span>
          </div>
          <div class="status-item">
            <label>下单时间:</label>
            <span>{{ orderDetail.info.created_at }}</span>
          </div>
          <van-button v-if="orderDetail.info.status <= 1" style="margin-bottom: 10px" color="#1baeae" block @click="paying" :disabled="toPay">去支付
          </van-button>
          <van-button v-if="orderDetail.info.status > 1" color="#1baeae" block @click="comfirmOrder">确认订单</van-button>
        </div>
        <div class="order-price">
          <div class="price-item">
            <label>商品金额:</label>
            <span>￥{{ commodityAmount }}</span>
          </div>
          <div class="price-item">
            <label>配送方式:</label>
            <span>{{ orderDetail.info.express_type ? orderDetail.info.express_type : "普通方式" }}</span>
          </div>
          <van-card
              v-for="item in orderDetail.goodsInfo" :key="item.id"
              :num="item.num"
              :price="item.price"
              :desc="item.goods.description"
              :title="item.goods.title"
              :thumb="item.goods.cover_url"
          />
          <div style="width: 100%;height: 50px"/>
        </div>
      </div>
    </div>
    <van-popup closeable
               v-model:show="show"
               position="bottom"
               :style="{ height: '40%' }"
               @close="closePay"
    >
      <van-grid :border="false" :column-num="2">
        <van-grid-item>
          支付宝二维码
          <van-image :style="{width:'150px',height:'150px' }" :src="orderDetail.aliyun"/>
        </van-grid-item>
        <van-grid-item>
          微信二维码
          <van-image :style="{width:'150px',height:'150px' }" :src="orderDetail.weChat"/>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import BetterScroll from "better-scroll";
import {Dialog, Toast} from "vant";
import {checkOrderStatus, confirmOrder, getOrderDetail, payForOrder} from "@/networks/order";

export default {
  name: "OrderDetail",
  components: {
    NavBar,
  },
  setup() {
    let show = ref(false)
    const route = useRoute()
    const router = useRouter()
    let bs = reactive({})
    const orderDetail = reactive({
      orderId: '',
      info: {
        orderDetails: {
          data: []
        }
      },
      goodsInfo: [],
      aliyun: '',
      weChat: '',
    })


    const payingStatus = computed(() => {
      const status = ['', "新订单", "支付完成", "已发货", "已确认收货", "已过期"]
      return status[orderDetail.info.status]
    })
    const commodityAmount = computed(() => {
      let sum = 0;
      orderDetail.goodsInfo.forEach(item => {
        sum += parseInt(item.num) * parseFloat(item.price)
      })
      return sum;
    })
    const toPay = computed(() => {
      return orderDetail.info.status > 1
    })
    const init = () => {
      console.log("订单详情")
      Toast.loading({message: "加载中...", forbidClick: true})
      getOrderDetail(orderDetail.orderId).then(res => {
        console.log(res);
        orderDetail.info = res;
        orderDetail.goodsInfo = res.orderDetails.data;
      })
      Toast.clear()
    }
    const closePay = () => {
      show.value = false
    }
    const paying = () => {
      show.value = true
      payForOrder(orderDetail.orderId, {type: 'aliyun'}).then(res => {
        console.log(res);
        orderDetail.aliyun = res.qr_code_url;
        orderDetail.weChat = res.qr_code_url;
      })
      //轮询查看，一定要设置timeout
      const timer = setInterval(() => {
        checkOrderStatus(orderDetail.orderId).then(res => {
          if (res === 2) {
            clearInterval(timer);
            closePay()
            router.go(0)
          }
        })
      }, 2000)
    }
    const comfirmOrder = () => {
      Dialog.confirm({
        title: "是否确认订单"
      }).then(() => {
        confirmOrder(orderDetail.orderId).then(res => {
            Toast.success("确认收货")
            init()
        })
      }).catch(() => {
        Toast.fail("暂时不能确认收货")
      })
    }
    onMounted(() => {
      orderDetail.orderId = route.query.id
      init()
      console.log(orderDetail);
      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;
      bs = new BetterScroll(document.querySelector('.detail-box'), {
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
      orderDetail,
      paying,
      show,
      closePay,
      payingStatus,
      commodityAmount,
      toPay,
      comfirmOrder,
    }
  }
}
</script>

<style scoped lang="scss">
.detail-box {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;

}
</style>