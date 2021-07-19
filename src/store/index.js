import { createStore } from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const state = {
  user:{
    isLogin:window.localStorage.getItem('token')?true:false,
  },
  shopcar_count:0
}
export default createStore({
  mutations: mutations,
  actions: actions,
  getters:getters,
  state: state,
  modules: {
  }
})
