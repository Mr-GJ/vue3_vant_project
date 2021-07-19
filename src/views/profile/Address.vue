<template>
  <div class="address">
    <nav-bar>
      <template v-slot:default>地址信息</template>
    </nav-bar>
    <div class="address-box">
      <div class="address-info">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
      </div>

    </div>

  </div>

</template>

<script>
import {onMounted, reactive, ref, toRefs} from "vue";
import NavBar from "components/common/navbar/NavBar";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {getAddressList} from "@/networks/adress";
export default {
  name: "Address",
  components:{
    NavBar,
  },
  setup(){
    let chosenAddressId = ref(1)
    const router = useRouter()
    const address_list = reactive({
      list:[],
      disabledList:[],

    })
    const onAdd = ()=>{
      Toast("添加地址")
      router.push({path:'/addressNew'})
    }
    const onEdit = ()=>{
      Toast("编辑地址")
      router.push({path:'/addressEdit'})
    }
    /*
      onMounted
     */
    onMounted(()=>{
      getAddressList().then(res=>{
        console.log(res);
        address_list.list = res.data.map(item=>{
          if(parseInt(item.is_default)?true:false){
            chosenAddressId.value = item.id
          }
          return {
            id:item.id,
            name:item.name,
            tel:item.phone,
            address:item.province+item.city+item.county+item.address,
            isDefault:parseInt(item.is_default)?true:false
          }
        })
      })
    })
    return {
      chosenAddressId,
      ...toRefs(address_list),
      onAdd,
      onEdit

    }
  }
}
</script>
//技巧：强制覆盖vant样式::v-deep .van-address-list__bottom
<style scoped lang="scss">
.address {
  background: white;
  height: 85vh;
  z-index: 1;
  .address-box{
    margin-top: 50px;
    margin-bottom: 50px;
    .address-info{
      position: relative;
      width: 100%;
      height: auto;
      border-radius: 6px;
      ::v-deep .van-address-list__bottom{
        bottom: 55px;
      }
    }
  }
}

</style>