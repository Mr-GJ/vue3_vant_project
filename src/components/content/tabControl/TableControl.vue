<template>
  <div class="table-control">
    <div class="table-control-item " :class="{active:index === currentIndex}" @click="focuseOn(index)" v-for="(item,index) in titles" :key="index">
      <span>{{ item }}</span>
    </div>

  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "TableControl",
  props:{
    titles:{
      type:Array,
      default() {
        return [];
      }
    },
  },
  setup(props,{emit}){
    let currentIndex = ref(0);
    const focuseOn = (index)=>{
      currentIndex.value=index;
      emit("tableClick",index)
    }
    return {
      currentIndex,
      focuseOn
    }
  }
}
</script>

<style scoped lang="scss">
.table-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #EEE;
  width: 100%;
  position: sticky;
  top: 44px;//防止与导航框重合
  z-index: 10;
  .table-control-item{
    flex: 1;
    span{
        padding: 5px;
    }
  }
  .active{
    color: var(--color-tint);
    span{
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>