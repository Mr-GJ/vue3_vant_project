/*
对state数据的操作方法
 */
const mutations = {
    setIsLogin(state,payload){
        state.user.isLogin = payload;
    },
    addCart(state,payload){
        state.shopcar_count += payload.count;
    },
    getCartCount(state,payload){
        state.shopcar_count = payload.count;
    },

}
export default mutations;