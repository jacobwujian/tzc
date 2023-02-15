import request from '@/utils/request'
const obj = {}

/**
 * 电厂修改信息审核
 * @method
 * @name checkPlant
 * @param data
 */
obj.checkPlant = function(data) {
  return request({
    url: '/api/plant/checkPlant',
    method: 'post',
    data
  })
}

/**
 * 电厂详情
 * @method
 * @name baseInfoPlant
 * @param params
 */
obj.baseInfoPlant = function(params) {
  return request({
    url: '/api/plant/baseInfoPlant',
    method: 'get',
    params
  })
}

/**
 * 通过条件查询电厂信息
 * @method
 * @name findPlant
 * @param params
 */
obj.findPlant = function(params) {
  return request({
    url: '/api/plant/findPlant',
    method: 'get',
    params
  })
}

/**
 * 电厂信息修改
 * @method
 * @name updatePlant
 * @param data
 */
obj.updatePlant = function(data) {
  return request({
    url: '/api/plant/updatePlant',
    method: 'post',
    data
  })
}

/**
 * 通过条件查询电厂交易信息
 * @method
 * @name findPlantChange
 * @param params
 */
obj.getPlantAssets = function(params) {
  return request({
    url: '/api/plant/getPlantAssets',
    method: 'get',
    params
  })
}

obj.findPlantChange = function(params) {
  return request({
    url: '/api/plant/findPlantChange',
    method: 'get',
    params
  })
}

/**
 * 通过id查询电厂交易信息
 * @method
 * @name findPlantChangeDetail
 * @param params
 */
obj.findPlantChangeDetail = function(params) {
  return request({
    url: '/api/plant/findPlantChangeDetail',
    method: 'get',
    params
  })
}
export default obj
