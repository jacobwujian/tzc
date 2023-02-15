export default {
  path: 'quota',
  component: () => import('@/views/quota/manage.vue'),
  name: 'quotaManagement',
  meta: {
    title: '配额管理',
    icon: 'barcode'
    // noTouch: true
  },
  order: 5,
  children: [
    {
      path: 'detail/:id',
      props: true,
      component: () => import('@/views/quota/detail.vue'),
      name: 'quotaDetail',
      meta: { title: '配额详情' },
      hidden: true
    }
  ]
}
