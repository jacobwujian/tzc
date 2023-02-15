export default {
        path: 'systerm',
        name: 'systemManagement',
        meta: {
          title: '系统管理',
          icon: 'setting',
          noTouch: true
        },
        order: 12,
        component: () => import('@/views/base/index.vue'),
        children: [
          {
            path: 'permission',
            component: () => import('@/views/systerm/permission.vue'),
            name: 'rolePermissionManagement',
            meta: { title: '角色权限' }
          },
          {
            path: 'account',
            component: () => import('@/views/systerm/account.vue'),
            name: 'accountManagement',
            meta: { title: '账户管理' }
          },
          {
            path: 'parameters',
            component: () => import('@/views/systerm/parameters.vue'),
            name: 'basicParametersConfiguration',
            meta: { title: '基本参数' }
          }
        ]
      }

