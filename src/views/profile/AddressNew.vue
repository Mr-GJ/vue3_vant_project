<template>
  <div id="box">
    <nav-bar>
      <template v-slot="center">新增地址</template>
    </nav-bar>
    <div class="edit-content">
      <van-address-edit
          :area-list="areaList"
          show-postal
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @change-detail="onChangeDetail"
      />
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { areaList } from '@vant/area-data';
import {reactive, ref} from "vue";
import {Toast} from "vant";
import {createAddress} from "@/networks/adress";
import {useRouter} from "vue-router";
export default {
  name: "AddressNew",
  components:{
    NavBar
  },
  setup(){
    const router = useRouter()
    let searchResult = ref([])
    const addressInfo = {
      name:'',
      address:'',
      phone:'',
      province:'',
      city:'',
      county:'',
      is_default:0
    }
    const onSave =(data)=> {
      Toast('save');
      console.log(data);
      addressInfo.name = data.name;
      addressInfo.address = data.addressDetail;
      addressInfo.phone = data.tel;
      addressInfo.province = data.province;
      addressInfo.city = data.city;
      addressInfo.county = data.county;
      addressInfo.is_default = data.isDefault?1:0;
      createAddress(addressInfo).then(res=>{
        if(res.status == 201 ){
          Toast.success("新增地址成功")
          router.push({path:'/address'})
        }
      })
    }
    const onChangeDetail=(val)=> {
      if (val) {
        searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult = [];
      }
    }
    return {
      areaList,
      searchResult,
      onSave,
      onChangeDetail
    };
  }
}
</script>

<style scoped lang="scss">
.edit-content{
  margin-top: 45px;
  width: 100%;
  height: auto;
}
</style>