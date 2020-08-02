import Vue from 'vue'
import App from './App'
import http from './utils/http.js'

Vue.config.productionTip = false
Vue.prototype.request = http

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
