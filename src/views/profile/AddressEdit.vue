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
          :address-info="editResult"
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
import {areaList} from '@vant/area-data';
import {onMounted, reactive, ref} from "vue";
import {Toast} from "vant";
import {deleteAddress, getAddressInfoById, modifyAddress} from "@/networks/adress";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "AddressEdit",
  components: {
    NavBar
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    let searchResult = reactive({})
    let editResult = ref({})
    const addressInfo = {
      id:'',
      name:'',
      address:'',
      phone:'',
      province:'',
      city:'',
      county:'',
      is_default:0
    }
    const onSave = (data) => {
      Toast('save');
      addressInfo.id = data.id;
      addressInfo.name = data.name;
      addressInfo.address = data.addressDetail;
      addressInfo.phone = data.tel;
      addressInfo.province = data.province;
      addressInfo.city = data.city;
      addressInfo.county = data.county;
      addressInfo.is_default = data.isDefault?1:0;
      modifyAddress(addressInfo.id,addressInfo).then(res=>{
        console.log(res);
        if(res.status === 204){
          Toast.success("修改成功")
          router.push('/address')
        }
      })
    }
    const onDelete = (data) => {
      Toast('delete');
      deleteAddress(data.id).then(res=>{
        if(res.status == 204){
          Toast.success("删除成功")
          router.push('/address')
        }
      })
    }
    const onChangeDetail = (val) => {
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
    onMounted(() => {
      console.log(route.query.id);
      const id = route.query.id
      getAddressInfoById(id).then(res => {
        console.log(res);
        editResult.value = {
          id: res.id,
          name: res.name,
          tel: res.phone,
          province: res.province,
          city: res.city,
          county: res.county,
          addressDetail: res.address,
          areaCode:'',
          postalCode:'000000',
          isDefault: parseInt(res.is_default) ? true : false
        }
      })

    })

    return {
      areaList,
      searchResult,
      editResult,
      onSave,
      onDelete,
      onChangeDetail
    };
  }
}
</script>

<style scoped lang="scss">
.edit-content {
  margin-top: 45px;
  width: 100%;
  height: auto;
}
</style>