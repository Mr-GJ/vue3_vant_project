<template>
  <div class="homeSwiper">
    <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banners" :key="index">
        <img v-lazy="item.img_url" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 160px;
  z-index: 2;
  img{
    height: auto !important;
    width: 100%;
  }
}

</style>