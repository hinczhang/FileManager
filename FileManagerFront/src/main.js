// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.prototype.$axios=Axios;
// 跨域相关
// url基础前缀

Axios.defaults.headers.post['Content-Type']='application/json';

if (process.env.NODE_ENV === 'production') {
  Axios.defaults.baseURL="https://fileapi.standardserve.org/api"
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
  components: { App },
  template: '<App/>'
})
