import router, {asyncRoutes, resetRouter} from './router'
import store from './store'
import NProgress from 'nprogress'
import Vue from 'vue'
import 'nprogress/nprogress.css'
import api from '@/api'
import {cPath, accessToken} from '@/utils/constant'
import clonedeep from 'lodash.clonedeep'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', cPath+'/login', '/screen']

const redirect404 = [{ path: '*', redirect: '/404', hidden: true }]

function reLogin(to, next) {
  // const redirect = whiteList.includes(from.path) ? '' : `?redirect=${window.location.href}`
  if(to.path.indexOf(cPath) === 0){
    next({
      path: `${cPath}/login`,
      replace: true
    })
  }else{
    next({
      path: `/login`,
      replace: true
    })
  }
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '碳排放辅助管理平台'
  NProgress.start()
  const getToken = Vue.ls.get(accessToken)
  if (whiteList.includes(to.path)) {
    next()
    return NProgress.done()
  }
  if (getToken) {
      const hasRoles = store.state.user && store.state.user.userInfo
      if (hasRoles) {
        if (!router.getRoutes().some((item) => { if (item.path.includes('plant')){ return true } }) ) {
          loadMunes(to, next, from)
        }else {
          next()
        }
      } else {
        store
          .dispatch('user/getUserInfo')
          .then(() => {
            if(to.path.indexOf(cPath) === 0){
              loadMunes(to, next, from)
            }else{
              router.addRoutes(redirect404)
              next({ ...to, replace: true })
            }
          })
          .catch((e) => {
            console.error(e)
            NProgress.done()
            Vue.ls.remove(accessToken)
            reLogin(to, next)
          })
      }
  } else if (to && to.meta && to.meta.noPermission) {
    next()
  } else {
    reLogin(to, next)
  }
})

export const loadMunes = (to, next, from) => {
  api.menu.getUserMenu().then((res) => {
    if(!res.childMenu) res.childMenu = []
    const resList = res.childMenu
    let list = []
    let asyncRoutesList = clonedeep(asyncRoutes)
    asyncRoutesList[0].children.forEach(item => {
      if(item.children){
        const findResItem = resList.find(it => it.menuCode === item.name || item.name === 'charts')
        if(!findResItem) return false
        const childList = []
        const resItem = findResItem.childMenu || []
        item.children.forEach(ii => {
          if(resItem.some(it => it.menuCode === ii.name) || ii.hidden){
            childList.push(ii)
          }
        })
        item.children = childList
      }
      if (store.getters && store.getters.userInfo&&store.getters.userInfo.status === 0){
        if(resList.some(it => (it.menuItem ==='机构管理' ||it.menuItem ==='系统管理') && it.menuCode === item.name || item.name === 'charts')){
          list.push(item)
        }
      } else {
        if(resList.some(it => it.menuCode === item.name || item.name === 'charts')){
          list.push(item)
        }
      }
    })
    asyncRoutesList[0].children = list
    store.dispatch('menu/set_menulist', asyncRoutesList)
    const routeList = asyncRoutesList.concat(redirect404)
    resetRouter()
    router.addRoutes(routeList)
    next({ ...to, replace: true })
  })
  .catch((e) => {
    console.error(e)
    reLogin(to, next)
  })
}

router.afterEach((to) => {
  if(to.path.indexOf(cPath) === 0){
    store.commit('permission/set_breadcrumb', to.matched)
  }
  NProgress.done()
})
