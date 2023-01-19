// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store.js'

Vue.prototype.$axios=Axios;
// 跨域相关
// url基础前缀

Axios.defaults.headers.post['Content-Type']='application/json';

if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_FLAG === 'pro') {
      //prod生产环境
      Axios.defaults.baseURL="http://94.16.106.19:5001/api"
  } else {
      //test 测试环境
      Axios.defaults.baseURL="https://fileapi.standardserve.org/api"
  }
} else {
  //dev 开发环境
  Axios.defaults.baseURL="/api"
}

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
