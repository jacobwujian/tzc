export default {
  path: 'deal',
  name: 'transactionManagement',
  meta: {
    title: '交易管理',
    icon: 'interaction'
  },
  order: 4,
  component: () => import('@/views/deal/management.vue')
  // component: () => import('@/views/deal/manage.vue')
  // children: [
  //   {
  //     path: 'detail/:id',
  //     props: true,
  //     component: () => import('@/views/deal/detail.vue'),
  //     name: 'dealdetail',
  //     meta: { title: '交易详情' },
  //     hidden: true
  //   }
  // ]
}
