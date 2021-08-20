<template>
  <div>
    <nav-bar>
      <template v-slot="center">订单预览</template>
    </nav-bar>
    <div class="order-preview">
      <div class="content">
        <div class="preview-body">
          <!--联系信息-->
          <van-contact-card
              type="edit"
              :name="currentAddress.name"
              :tel="currentAddress.phone"
              @click="onEdit"
          />
          <!--订单信息-->
          <van-card
              v-for="(item,index) in currentContact.carts"
              :key="index"
              :num="item.num"
              :price="item.goods.price"
              :desc="item.goods.cover"
              :title="item.goods.title"
              :thumb="item.goods.cover_url"
          />
        </div>
        <!--结算信息-->
        <van-submit-bar class="submit-all" :price="pay*100" button-text="生成订单" @submit="onsubmit">
          <div>商品金额</div>
        </van-submit-bar>

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
          <van-image :style="{width:'150px',height:'150px' }" :src="currentContact.aliyun" />
        </van-grid-item>
        <van-grid-item>
          微信二维码
          <van-image :style="{width:'150px',height:'150px' }" :src="currentContact.weChat" />
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from "vue";
import BetterScroll from "better-scroll";
import {Toast} from "vant";
import NavBar from "@/components/common/navbar/NavBar";
import {checkOrderStatus, createOrder, getOrderPreviewInfo, payForOrder} from "@/networks/order";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "OrderPreview",
  components: {
    NavBar,
  },
  setup() {
    let show = ref(false)
    const router = useRouter()
    const store = useStore()
    let bs = reactive({})
    let currentAddress = ref({})
    let currentContact = reactive({
      address: [],
      carts: [],
      name: '张三',
      tel: '13000000000',
      aliyun:'',
      weChat:'',
    })
    const orderInfo = reactive({})
    const onEdit = () => {
      Toast('更改物流地址');
      router.push('/')
    }
    const closePay = ()=>{
      Toast("关闭支付页面")
      show.value = false
      router.push({path:'/orderDetail',query:{id:orderInfo.value.id}})
    }
    const pay = computed(() => {
      let price = 0;
      currentContact.carts.forEach(item => {
        price += parseInt(item.num) * parseFloat(item.goods.price)
      })
      return price
    })
    //创建订单
    const onsubmit = () => {
      console.log("创建订单")
      if (currentContact.address.length === 0) {
        Toast.fail("请选择地址")
        return;
      } else {
        const params = {
          address_id: '' + currentAddress.value.id
        }
        createOrder(params).then(res => {
          Toast.success("订单已生成")
          store.dispatch('updateCart')
          show.value = true
          orderInfo.value = res
          payForOrder(orderInfo.value.id,{type:'aliyun'}).then(res=>{
            console.log(res);
            currentContact.aliyun = res.qr_code_url;
            currentContact.weChat = res.qr_code_url;
          })
          const timer = setInterval(()=>{
            checkOrderStatus(orderInfo.value.id).then(res=>{
              if(res === 2){
                clearInterval(timer);
                router.push({path:'/orderDetail',query:{id:orderInfo.value.id}})
              }
            })
          },2000)

        })

      }
    }
    onMounted(() => {
      console.log("订单预览")
      getOrderPreviewInfo().then(res => {
        console.log(res);
        currentContact.address = res.address;
        currentContact.carts = res.carts;
        currentContact.address.filter(item => {
          if (item.is_default === 1) {
            currentAddress.value = item
          }
        })
      })

      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;
      bs = new BetterScroll(document.querySelector('.order-preview'), {
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
      currentContact,
      onEdit,
      currentAddress,
      pay,
      onsubmit,
      show,
      closePay
    }
  }
}
</script>

<style scoped lang="scss">
.order-preview {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;

  .preview-body {
    position: relative;
    left: 0;
    right: 0;
    width: 100%;
  }

  .submit-all {
    position: relative;
  }
}


</style>