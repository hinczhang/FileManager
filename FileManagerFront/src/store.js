import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    User: localStorage.getItem("User")? localStorage.getItem("User"): ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, value) {
      state.Authorization = value;
      localStorage.setItem('Authorization', value);
    },
    changeUsername(state, value) {
        state.User = value;
        localStorage.setItem('User', value);
    }
  }
});
 
export default store;