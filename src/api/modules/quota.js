import request from '@/utils/request'
const obj = {}

// 配额管理 默认查询
obj.getQuotaManageList = function(data) {
  return request({
    url: '/api/quotaManage/getQuotaManageList',
    method: 'post',
    data
  })
}

// 配额详情
obj.getWriteOffInfoDetail = function(data) {
  return request({
    url: '/api/quotaManage/getWriteOffInfoDetail',
    method: 'post',
    data
  })
}

// 配额
obj.distributeQuota = function(params) {
  return request({
    url: '/api/quotaManage/distributeQuota',
    method: 'get',
    params
  })
}

export default obj
