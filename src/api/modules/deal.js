import request from '@/utils/request'
const obj = {}

obj.selectAmountSoldLine=function(data) {
  return request({
    url: '/api/deal/selectAmountSoldLine',
    method: 'post',
    data,
    domain: 'cw'
  })
}

obj.selectNegotiationLine=function(data) {
  return request({
    url: '/api/deal/selectNegotiationLine',
    method: 'post',
    data,
    domain: 'cw'
  })
}

obj.allRole=function(params) {
  return request({
    url: '/api/role/allRole',
    method: 'get',
    params,
    domain: 'cw'
  })
}

export default obj