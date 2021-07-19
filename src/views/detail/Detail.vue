<template>
  <div>
    <nav-bar>
      <template v-slot="center">详情{{ good_id }}</template>
    </nav-bar>
    <div class="dscroll">
      <ul class="content">
      <van-image
          class="vImg"
          lazy-load
          :src="details.cover_url"
      />
      <van-card
          class="vCard"
          :num="details.stock"
          :price="details.price"
          :desc="details.description"
          :title="details.title"
      >
        <template #tags>
          <van-tag plain type="warning">类别{{ details.category_id }}</van-tag>
          <van-tag plain type="warning">{{ details.collects_count }}次收藏</van-tag>
        </template>
        <template #footer>
          <van-button type="danger" @click="handleAddChart">加入购物车</van-button>
          <van-button type="danger" @click="gotoCart">立即购买</van-button>
        </template>
      </van-card>
      <van-tabs v-model="active">
        <van-tab title="概述">
          <div class="book_info" v-html="details.details"></div>
        </van-tab>
        <van-tab title="热评">内容 2</van-tab>
        <van-tab title="相关图书">
          <good-list :goods="book.like_goods"></good-list>
        </van-tab>
      </van-tabs>
      </ul>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {useRoute, useRouter} from 'vue-router'
import {nextTick, onMounted, reactive, ref, toRefs, watchEffect} from "vue"
import {getDetailDataById} from "@/networks/detail";
import GoodList from "@/components/content/goods/GoodList";
import BetterScroll from 'better-scroll'
import {getHomeGoodsData} from "@/networks/home";
import {addCart} from "@/networks/shopCart";
import {Toast} from "vant";
import {useStore} from "vuex";
export default {
  name: "Detail",
  components: {
    NavBar,
    GoodList
  },
  setup() {
    let bs = reactive({})
    let active = ref(0)
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let good_id = ref(1)
    const book = reactive({
      details: {},
      like_goods: {}
    })

    const handleAddChart = ()=>{
      addCart({goods_id:good_id.value,num:1}).then(res=>{
        if(res.status == 204 || res.status == 201){
          Toast.success("添加成功")
          store.dispatch('updateCart')
        }
      })
    }
    //立即购买
    const gotoCart=()=>{
      addCart({goods_id:good_id.value,num:1}).then(res=>{
        if(res.status == 204 || res.status == 201){
          Toast.success("添加成功,在购物车内结账购买")
          store.dispatch('updateCart')
          router.push({path:'/shopCar'})
        }
      })
    }
    /*
    on
     */
    onMounted(() => {
      good_id.value = route.query.id;
      getDetailDataById(good_id.value).then(res => {
        book.details = res.goods
        book.like_goods = res.like_goods
      })
      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;
      bs = new BetterScroll(document.querySelector('.dscroll'), {
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
      good_id,
      ...toRefs(book),
      active,
      book,
      handleAddChart,
      gotoCart
    }

  }
}
</script>

<style scoped lang="scss">
.dscroll{
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.vImg {
  width: 100%;
}

.vCard {
  text-align: left;
}

.book_info {
  padding: 10px;
}
</style>