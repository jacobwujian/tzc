/*
 * @created: Monday, 2020-08-03 13:36:58
 * @author: baix@shumei.ai
 * ---------
 * @desc 路由访问权限配置
 */


/* Layout */

export default {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    count: (state) => state.count
  },
  mutations: {
    set_count(state, data) {
      state.count = data
    }
  },
  actions: {
  }
}