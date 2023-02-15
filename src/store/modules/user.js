/*
 * @created: Monday, 2020-08-03 11:46:46
 * @author: baix@shumei.ai
 * ---------
 * @desc 用户数据
 */

import vm from '@/main'
import api from '@/api'
import {cPath, accessToken} from '@/utils/constant'

export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  getters: {
    userInfo: (state) => state.userInfo
  },
  mutations: {
    SET_USER_INFO: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    logout({ commit, state }) {
      vm.$ls.remove(accessToken)
      state.userInfo = null
      if(vm.$route.path.indexOf(cPath) === 0){
        vm.$router.replace(cPath + '/login')
      }else{
        vm.$router.replace('/login')
      }
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.user
          .accountDetail()
          .then((res) => {
            if (res.status === 0){
              res.permissionCodes =['plantEdit', 'plantDetail', 'dealDetail']
            }
            commit('SET_USER_INFO', res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
