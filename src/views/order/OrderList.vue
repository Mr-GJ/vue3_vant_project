<template>
  <div>
    <nav-bar>
      <template v-slot="center">我的订单</template>
    </nav-bar>
    <van-tabs v-model="active" ref="tabs" class="order-table" @click="tabClick">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="发货"></van-tab>
      <van-tab title="交易完成"></van-tab>
      <van-tab title="过期"></van-tab>
    </van-tabs>
    <div class="order-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <div @click="gotoDetail(item.id)" class="order-item-box" v-for="item in list" :key="item.id">
            <div class="order-item-header" style="background: lemonchiffon;text-align: left">
              <span style="line-height:30px">订单号:{{ item.order_no }}<br>创建时间:{{ item.created_at }}</span>
            </div>
            <van-card
                v-for="child in item.orderDetails.data"
                :num="child.num"
                :price="child.price"
                :desc="child.goods.description"
                :title="child.goods.title"
                :thumb="child.goods.cover_url"
            />
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa',}"/>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {nextTick, onMounted, reactive, ref, toRefs, watchEffect} from "vue";
import BetterScroll from "better-scroll";
import {getOrderList} from "@/networks/order";
import router from "@/router";
import {useRouter} from "vue-router";

export default {
  name: "OrderList",
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter()
    const list_Status = reactive({
      list: [{
        orderDetails: {
          data: []
        }
      }],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      totalPage: 0,
      status: 0,
    })
    let active = ref(2)
    const tabClick = (index) => {
      list_Status.status = index
      onRefresh()
    }
    const onRefresh = () => {
      list_Status.loading = true;
      list_Status.finished = false;
      list_Status.refreshing = true;
      list_Status.page = 1;
      onLoad()
    }

    function lodeData() {
      console.log(list_Status.page);
      getOrderList({page: list_Status.page, status: list_Status.status, include: 'orderDetails.goods'}).then(res => {
        console.log(res);
        list_Status.list = list_Status.list.concat(res.data)
        list_Status.loading = false


        list_Status.totalPage = res.meta.pagination.total_pages
        if(list_Status.page >= res.meta.pagination.total_pages){
          list_Status.finished = true;
        }
        console.log(list_Status.totalPage+"##################");
        console.log(list_Status.page+"@@@@@@@@@@@@@@@@");

      })
    }

    const onLoad = () => {
      if(!list_Status.refreshing && list_Status.page < list_Status.totalPage){
        list_Status.page += 1
      }

      if (list_Status.refreshing) {
        list_Status.list = []
        list_Status.refreshing = false
      }
      lodeData()
    }
    const init = () => {

    }
    const gotoDetail = (id)=>{
      router.push({path:'/orderDetail',query:{id:id}})
    }
    onMounted(() => {
      onRefresh()
      init()

    })

    return {
      ...toRefs(list_Status),
      active,
      list_Status,
      onRefresh,
      onLoad,
      tabClick,
      gotoDetail
    }
  }
}
</script>

<style scoped lang="scss">
.order-table {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  width: 100%;
  height: 30px;
  z-index: 10;
}

.order-content {
  position: absolute;
  top:100px;
  left: 0;
  right: 0;
  bottom: 55px;
}
</style>