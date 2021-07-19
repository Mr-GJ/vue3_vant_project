<template>
  <div class="recommend">
    <div class="recommend-item" @click="goDetail(item.id)" v-for="item in recommends.slice(0,4)" :key="item.id" >
      <a href="">
        <img v-lazy="item.cover_url">
        <div>
          {{item.title}}
        </div>
      </a>
    </div>

  </div>
</template>

<script>
import {useRouter} from "vue-router";
export default {
  name: "RecommendView",
  props:{
    recommends: {
      type:Array,
      default(){
        return [];
      }
    }
  },

  setup(){
    const router = useRouter();
    const goDetail=(id)=>{
      router.push({path:'/detail',query:{id:id}})
    }
    return {
      goDetail,
    }
  }

}
</script>

<style scoped lang="scss">
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 15px;
  border-bottom: 8px solid #EEE;
  font-size: 12px;
}
.recommend-item{
  flex: 1;
  img{
    width: 85px;
    height: 85px;
  }
}
</style>