import Vue from 'vue'
import App from './App'
import http from './utils/http.js'
import status from "./components/status.vue"

Vue.config.productionTip = false
// 全局请求方式的封装
Vue.prototype.request = http
// 注册全局组件
Vue.component('page-status', status)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
