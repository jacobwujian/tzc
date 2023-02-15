import request from '@/utils/request'
const obj = {}

obj.companyTotal = function(params) {
  return request({
    url: '/api/chartsNew/companyTotal',
    method: 'get',
    params
  })
}

obj.getMonthlyEmissionsConsumption = function(params) {
  return request({
    url: '/api/chartsNew/getMonthlyEmissionsConsumption',
    method: 'get',
    params
  })
}

obj.CarbonEmissionAndActualQuota = function(params) {
  return request({
    url: '/api/chartsNew/CarbonEmissionAndActualQuota',
    method: 'get',
    params
  })
}

obj.CarbonAndQuotaByTopTen = function(params) {
  return request({
    url: '/api/chartsNew/CarbonAndQuotaByTopTen',
    method: 'get',
    params
  })
}

export default obj
