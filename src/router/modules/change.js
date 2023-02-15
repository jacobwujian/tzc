export default {
        path: 'change',
        name: 'changeManagement',
        meta: {
          title: '订单管理',
          icon: 'interaction'
        },
        order: 5,
        component: () => import('@/views/change/manage.vue'),
        children: [
          {
            path: 'detail/:id',
            props: true,
            component: () => import('@/views/change/detail.vue'),
            name: 'changedetail',
            meta: { title: '订单详情' },
            hidden: true
          }
        ]
      }

