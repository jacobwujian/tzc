export default {
  path: 'order',
  name: 'orderManagement',
  meta: {
    title: '订单管理',
    icon: 'file',
    noTouch: true
  },
  order: 8,
  component: () => import('@/views/base/index.vue')
}

