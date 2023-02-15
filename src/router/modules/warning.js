export default {
        path: 'warning',
        name: 'warningManagement',
        meta: {
          title: '预警管理',
          icon: 'setting',
          noTouch: true
        },
        order: 10,
        component: () => import('@/views/base/index.vue'),
        children: [
          {
            path: 'warningParam',
            component: () => import('@/views/warningManagement/warningParamManagement.vue'),
            name: 'warningParamManagement',
            meta: { title: '预警参数管理' }
          },
          {
            path: 'warningInfo',
            component: () => import('@/views/warningManagement/warningInfoManagement.vue'),
            name: 'warningInfoManagement',
            meta: { title: '预警信息管理' }
          }
        ]
      }

