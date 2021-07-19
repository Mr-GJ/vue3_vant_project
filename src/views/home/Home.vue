<template>
  <div class="home">
    <nav-bar>
      <template v-slot:default>图书商城</template>
    </nav-bar>
    <table-control v-show="isTableFixed" @tableClick="tableClick" :titles="['畅销','新书','精选']"></table-control>
    <div class="wrapper">
      <ul class="content">
        <div ref="banref">
          <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <table-control @tableClick="tableClick" :titles="['畅销','新书','精选']"></table-control>
        <good-list :goods="showGood"></good-list>
      </ul>
    </div>
    <!--在组件上加事件需要加.native-->
    <back-top @btop="btop" v-show="isTableFixed"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import RecommendView from "@/views/home/comps/RecommendView";
import TableControl from "@/components/content/tabControl/TableControl";
import GoodList from "@/components/content/goods/GoodList";
import {getHomeALLData, getHomeGoodsData} from "@/networks/home";
import {onMounted, ref, reactive, computed, watchEffect, nextTick} from 'vue';
import BetterScroll from 'better-scroll'
import BackTop from "@/components/common/backtop/BackTop";
import HomeSwiper from "@/views/home/comps/HomeSwiper";

export default {
  name: "Home",
  components: {
    BackTop,
    NavBar,
    RecommendView,
    TableControl,
    GoodList,
    HomeSwiper
  },
  setup() {
    let isTableFixed = ref(false)
    let banref = ref(null)
    const banners = ref([])
    const recommends = ref([]);
    let types = ['sales', 'new', 'recommend']
    const tableClick = (index) => {
      currentGood.value = types[index]
      nextTick(() => {
        //重新计算高度
        bs && bs.refresh()
      })
    }
    const goods = reactive({
      sales: {page: 1, list: []},
      recommend: {page: 1, list: []},
      new: {page: 1, list: []},
    })

    let currentGood = ref('sales')
    const showGood = computed(() => {
      return goods[currentGood.value].list
    })
    let bs = reactive({})

    /*
      onMounted()
     */
    onMounted(() => {
      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;
      bs = new BetterScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        click: true,
        pullUpLoad: true
      })
      bs.on('scroll', (position) => {
        isTableFixed.value = banref.value.offsetHeight < (-position.y)
      })
      bs.on('pullingUp', () => {
        const page = goods[currentGood.value].page + 1;
        getHomeGoodsData(currentGood.value, page).then(res => {
          goods[currentGood.value].list.push(...res.goods.data)
          goods[currentGood.value].page += 1
        })
        //等待数据请求结束
        bs.finishPullUp();
        bs.refresh()
      })
      getHomeALLData().then(res => {
        recommends.value = res.goods.data;
        banners.value = res.slides;
        //檢查信息
        // console.log(recommends.value);
      })
      getHomeGoodsData('sales', 1).then(res => {
        goods.sales.list = res.goods.data
      })
      getHomeGoodsData('recommend', 1).then(res => {
        goods.recommend.list = res.goods.data
      })
      getHomeGoodsData('new', 1).then(res => {
        goods.new.list = res.goods.data
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
    const btop = () => {
      bs.scrollTo(0, 0, 500)
    }
    /*
      return
     */
    return {
      recommends,
      tableClick,
      showGood,
      goods,
      isTableFixed,
      banref,
      BackTop,
      btop,
      banners
    }
  }
}
</script>

<style scoped>
.banners img {
  width: 100%;
  height: auto;
}

.home {
  position: relative;
  height: 100vh;
}

.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>