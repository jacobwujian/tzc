export default {
  path: 'statistical',
  name: 'statisticalManagement',
  meta: {
    title: '监控大屏管理',
    icon: 'security-scan'
  },
  order: 6,
  component: () => import('@/views/statistical/manage.vue'),
  children: []
}
