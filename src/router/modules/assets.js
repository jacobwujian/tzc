export default {
    path: 'assets',
    component: () => import('@/views/assets/manage.vue'),
    name: 'assetsManagement',
    meta: {
      title: '资产管理',
      icon: 'interaction'
    },
    order: 9,
    children: [
      {
        path: 'detail/:id',
        props: true,
        component: () => import('@/views/assets/detail.vue'),
        name: 'assetsDetail',
        meta: { title: '资产详情' },
        hidden: true
      }
    ]
  }

