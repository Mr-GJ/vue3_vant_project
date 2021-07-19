<template>
  <div class="nav-bar">
    <div class="left" @click="goback">
      <slot name="left">
        <img src="~assets/css/back.png" alt="">
      </slot>
    </div>
    <div class="center">
      <slot>图书馆</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  name: "NavBar",
  setup(){
    const router = useRouter();
    const goback = ()=>{
      router.go(-1);
    }
    return {
      goback,
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  background: var(--color-tint);
  color: #FFFFFF;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(100, 100, 100, 0.2);
}

.left, .right {
  width: 60px;
}

.center {
  flex: 1;
}
.left img{
  width: 45px;
  padding: 12px;
}
</style>