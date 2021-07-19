<template>
  <div id="box">
    <nav-bar>
      <template v-slot="center">编辑地址</template>
    </nav-bar>
    <div class="edit-content">
      <van-address-edit
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
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
export default {
  name: "AddressEdit",
  components:{
    NavBar
  },
  setup(){
    let searchResult = ref([])
    const onSave =()=> {
      Toast('save');
    }
    const onDelete=()=> {
      Toast('delete');
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
      onDelete,
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