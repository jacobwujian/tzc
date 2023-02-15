import Vue from 'vue'
import VueRouter from 'vue-router'
import { cPath } from '@/utils/constant'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

const baseRoute = {
  path: cPath,
  component: Layout,
  meta: {
    title: '首页'
  },
  redirect: `${cPath}/index`,
  children: []
}

const noPermissionRoute = {
  path: '/home',
  component: () => import('@/views/c-header/index.vue'),
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '/home',
      component: () => import('@/views/home/firstPage.vue'),
      name: 'home',
      meta: { title: '首页' }
    },
    {
      path: '/dating',
      component: () => import('@/views/home/index.vue'),
      name: 'dating',
      meta: { title: '交易大厅' }
    },
    {
      path: '/orderManagement',
      component: () => import('@/views/order/manage.vue'),
      name: 'orderManagement',
      meta: { title: '订单管理' }
    },
    {
      path: '/dating/detail/:id',
      props: true,
      component: () => import('@/views/deal/detail.vue'),
      name: 'dating',
      meta: { title: '交易详情' }
    }
  ]
}

const context = require.context('./modules', false, /\.js$/)
//获取moudules文件下所有js文件；
const moduleStores = []

context.keys().forEach(key => {
  const fileModule = context(key).default
  const isA = Array.isArray(fileModule)
  const list = isA ? fileModule : [fileModule]
  list.forEach(it => {
    if (it.noPermission) {
      noPermissionRoute.children.push(it)
    } else {
      baseRoute.children.push(it)
    }
  })
})

export const asyncRoutes = [...moduleStores, baseRoute]

export const constantRoutes = [
  noPermissionRoute,
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: {
      title: '登录'
    },
    redirect: `${cPath}/login`
  },
  {
    path: cPath + '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-pages/404.vue'),
    hidden: true,
    meta: {
      title: '未找到'
    }
  }
]

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
  router.options.routes = []
}

export default router
