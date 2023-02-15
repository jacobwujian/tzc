export default {
  path: 'check',
  name: 'checkManagement',
  meta: {
    title: '核查管理',
    icon: 'layout',
    noTouch: true
  },
  order: 3,
  component: () => import('@/views/base/index.vue'),
  children: [
    {
      path: 'carbonAccountingReport',
      component: () => import('@/views/check/accountingReportView/index.vue'),
      name: 'carbonAccountingReport',
      meta: { title: '碳排填报' }
    },
    {
      path: 'WriteLimit',
      component: () => import('@/views/check/WriteLimit/index.vue'),
      name: 'WriteLimit',
      meta: { title: '配额填报' }
    },
    {
      path: 'CarbonAccounting',
      component: () => import('@/views/check/CarbonAccounting.vue'),
      name: 'carbonAccounting',
      meta: { title: '碳排核算' }
    },
    {
      path: 'DetailsCarbon',
      component: () => import('@/views/check/DetailsCarbon.vue'),
      name: 'carbonAccountingParticulars',
      meta: { title: '碳核算详情' },
      hidden: true
    },
    {
      path: 'DetailsCarbonGrid',
      component: () => import('@/views/check/DetailsCarbonGrid.vue'),
      name: 'gridAccountingDetails',
      meta: { title: '碳核算详情' },
      hidden: true
    }
  ]
}
