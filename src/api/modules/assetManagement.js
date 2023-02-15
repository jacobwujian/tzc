import request from '@/utils/request'
const obj = {}

/**
 * 清算资产申请
 * @method
 * @name clearQuota
 */
obj.clearQuota=function(params) {
  return request({
    url: '/api/asstes/clearQuota',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 资产详情
 * @method
 * @name assetsDetail
 */
obj.assetsDetail=function(params) {
  return request({
    url: '/api/asstes/myCarbonEmissionResultDetails',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 资产信息
 * @method
 * @name assetManagement
 */
obj.assetManagement=function(params) {
  return request({
    url: '/api/asstes/myCarbonEmissionResultList',
    method: 'post',
    params,
    domain: 'cw'
  })
}

/**
 * 录入资产申请
 * @method
 * @name clearQuota
 */
 obj.inputQuota=function(params) {
  return request({
    url: '/api/asstes/inputQuota',
    method: 'get',
    params,
    domain: 'cw'
  })
}

export default obj