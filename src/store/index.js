import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

const context = require.context('./modules', false, /\.js$/)
//获取moudules文件下所有js文件；
const moduleStores = {}

context.keys().forEach((key) => {
  const fileName = key.slice(2, -3)
  moduleStores[fileName] = context(key).default
})

Vue.use(Vuex)
export default new Vuex.Store({
  modules: moduleStores,
  getters
})
