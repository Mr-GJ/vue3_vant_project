<template>
  <router-view></router-view>
<!--  <router-view v-slot="{Component}">-->
<!--    <trasition>-->
<!--      <keep-alive>-->
<!--        <component :is="Component"></component>-->
<!--      </keep-alive>-->
<!--    </trasition>-->
<!--  </router-view>-->
  <div id="nav">
    <router-link class="tab-bar-item" to="/home">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopCar">
      <div class="icon">
        <van-badge :content="$store.state.shopcar_count" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>

      </div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-yonghu"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "assets/css/basic.css";
@import "assets/css/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: #F6F6F6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  box-shadow: 0 -2px 10px rgba(100, 100, 100, 0.2);
  z-index: 20;
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    margin-top: 3px;
    vertical-align: middle;
  }

  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    display: inline-block;
  }

}
</style>
