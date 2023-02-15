import request from '@/utils/request'
const obj = {}


/**
 * 协议购买
 * @method
 * @name protocolBuy
 * @param {file} file -file
 */
obj.protocolBuy = function(data) {
  return request({
    url: '/api/trade/protocolBuy',
    method: 'post',
    data,
    domain: 'cw'
  })
}


export default obj
