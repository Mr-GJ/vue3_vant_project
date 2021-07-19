<template>
  <div class="goods-item" @click="itemClick(good.id)">
    <img v-lazy="good.cover_url" alt="">
    <div class="goods-info">
      <p>{{ good.title }}</p>
      <span class="price"><small>￥</small>{{ good.price }}</span>
      <span class="collect">{{ good.collects_count }}</span>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: "GoodListItem",
  props:{
    good:{
      type:Array,
      default(){
        return []
      }

    }
  },
  setup(){
    const router = useRouter()
    return {
      itemClick:(id)=>{
        router.push({path:"/detail",query:{id: id}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-item{
  width: 46%;
  height: auto;
  padding-bottom: 40px;
  position: relative;
  .goods-info{
    font-size: 12px;
    position:absolute;
    bottom: 5px;
    left:0;
    right: 0;
    overflow: hidden;
    text-align: center;
    p{
      overflow: hidden;
      text-overflow: ellipsis;//文本...缩放形式
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price{
      color: red;
      margin-right: 20px;

    }
    .collect{
      position: relative;
    }
    .collect::before{
      content: '';
      position: absolute;
      left: -15px;
      width: 14px;
      height: 14px;
      bottom: 1px;
      background: url("~assets/images/collect.png") 0 0/14px 14px;
    }
  }
  img{
    width: 100%;
    border-radius: 10px;
  }
}

</style>