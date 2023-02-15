import request from '@/utils/request'
const obj = {}

/**
 * 交易详情
 * @method
 * @name getExchangeDetail
 * @param {integer} id -id
 */
obj.getExchangeDetail=function(params) {
  return request({
    url: '/api/exchange/getExchangeDetail',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 条件查询交易列表
 * @method
 * @name getExchangeList
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {string} tradingSide -交易方
 * @param {string} tradingTimeStart -开始时间
 * @param {string} tradingTimeEnd -结束时间
 * @param {integer} energyType -能源类型
 * @param {string} relateCompany -关联企业
 */
obj.getExchangeList=function(params) {
  return request({
    url: '/api/exchange/getExchangeList',
    method: 'get',
    params,
    domain: 'cw'
  })
}


/**
 * 订单审批
 * @method
 * @name approveOrder

 */
obj.approveOrder=function(data) {
  return request({
    url: '/api/exchange/checkProtocolOrder',
    method: 'post',
    data
  })
}

export default obj