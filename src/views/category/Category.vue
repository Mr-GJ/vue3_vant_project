<template>
  <div class="home">
    <nav-bar>
      <template v-slot="center">图书分类</template>
    </nav-bar>
    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="价格排序"></van-tab>
          <van-tab title="销量排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="(item,index) in categories.slice(0,5)" :key="index" :title="item.name"
                             :name="item.name">
            <van-sidebar-item @click="getGoods(child.id)" v-for="child in item.children" :key="child.id"
                              :title="child.name"/>
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>


      <div class="goodlist">
        <div class="content">
          <van-card
              @click="itemClick(item.id)"
              v-for="item in showGoods" :key="item.id"
              :num="item.comments_count"
              :tag="item.sales"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :origin-price="item.price"
              :lazy-load="true"
          />
        </div>
      </div>
    </div>
    <!--在组件上加事件需要加.native-->
    <back-top @btop="btop" v-show="isBack"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue'
import {getCategoryALLData, getCategoryGoodsByOrder} from "@/networks/category";
import BetterScroll from 'better-scroll'
import BackTop from "@/components/common/backtop/BackTop";
import {useRouter} from 'vue-router'
export default {
  name: "Category",
  components: {
    NavBar,
    BackTop
  },
  setup() {
    const goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []},
    })
    const router = useRouter()
    let isBack = ref(false)
    let bs = reactive({})
    let activeKey = ref(0)
    let activeName = ref(1)
    let active = ref(2)

    let categories = ref([])
    let recommend_goods = ref([])
    let currentOrder = ref('price')
    let currentId = ref(0)

    const tabClick = (index) => {
      let orderType = ['price','sales',  'comments_count']
      currentOrder.value = orderType[index]
      init()
      nextTick(() => {
        //重新计算高度
        bs && bs.refresh()
      })
    }
    const getGoods = (id) => {
      currentId.value = id
      init()
      nextTick(() => {
        //重新计算高度
        bs && bs.refresh()
      })
    }
    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    })
    const init = () => {
      getCategoryGoodsByOrder('sales', currentId.value).then(res => {
        goods.sales.list = res.goods.data
      })
      getCategoryGoodsByOrder('price', currentId.value).then(res => {
        goods.price.list = res.goods.data
      })
      getCategoryGoodsByOrder('comments_count', currentId.value).then(res => {
        goods.comments_count.list = res.goods.data
      })
    }
    const btop = () => {
      bs.scrollTo(0, 0, 500)
    }
    /*
    onMounted
     */
    onMounted(() => {
      //获取分类目录
      getCategoryALLData().then(res => {
        categories.value = res.categories
      })
      init()
      //滚动条事件,外层容器必须给定给高度，并设置overflow: hidden;返回变量类型let
      bs = new BetterScroll(document.querySelector('.goodlist'), {
        probeType: 3,
        click: true,
        pullUpLoad: true
      })
      bs.on('scroll', (position) => {
        isBack.value = 100 < (-position.y)
      })
      bs.on('pullingUp', () => {
        const page = goods[currentOrder.value].page + 1;
        getCategoryGoodsByOrder(currentOrder.value, currentId.value,page).then(res => {
          goods[currentOrder.value].list.push(...res.goods.data)
          goods[currentOrder.value].page += 1
        })
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
      activeKey,
      categories,
      activeName,
      active,
      tabClick,
      getGoods,
      showGoods,
      bs,
      btop,
      isBack,
      itemClick:(id)=>{
        router.push({path:'/detail',query:{id:id}})
      },

    }
  }
}
</script>

<style scoped lang="scss">
#mainbox {
  display: flex;
  margin-top: 45px;

  .ordertab {
    height: 45px;
    float: right;
    flex: 1;
    position: fixed;
    right: 0;
    top: 45px;
    left: 130px;
    z-index: 9;
  }

  .leftmenu {
    position: fixed;
    top: 110px;
    left: 0;
    width: 130px;
    overflow: hidden;
  }

  .goodlist {
    flex: 1;
    position: absolute;
    top: 85px;
    left: 130px;
    right: 0;
    bottom: 55px;
    padding-top: 20px;
    overflow: hidden;
  }
}
</style>