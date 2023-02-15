import Storage from 'vue-ls'
import Vue from 'vue'

let options = {
  namespace: '_', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'session' // 存储名称: session, local, memory
}

Vue.use(Storage, options)
