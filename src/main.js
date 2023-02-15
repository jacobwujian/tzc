require('@babel/polyfill')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import {cPath} from '@/utils/constant'
import api from '@/api'
import '@/plugins'
import '@/styles/index.less'
import './permission'

Vue.prototype.$dayjs = moment
Vue.prototype.$api = api
Vue.prototype.$cPath = cPath

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

export default vm
