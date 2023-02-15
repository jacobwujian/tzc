import request from '@/utils/request'
const obj = {}

/**
 * 通过条件查询预警参数
 * @method
 * @name plantWarningParamVo
 * @param data
 */
obj.getWarningParamList=function(data) {
  return request({
    url: '/api/plantWarningParam/getWarningParamList',
    method: 'post',
    data
  })
}

/**
 * 通过条件修改预警参数
 * @method
 * @name plantWarningParamVos
 * @param data
 */
obj.updatePlantWarningParam=function(data) {
  return request({
    url: '/api/plantWarningParam/updatePlantWarningParam',
    method: 'post',
    data
  })
}

/**
 * 通过条件查询预警信息
 * @method
 * @name plantWarningInfoVo
 * @param data
 */
obj.getWarningInfoList=function(data) {
  return request({
    url: '/api/plantWarningInfo/getWarningInfoList',
    method: 'post',
    data
  })
}

/**
 * 通过条件修改预警信息
 * @method
 * @name plantWarningInfoVos
 * @param data
 */
obj.updatePlantWarningInfo=function(data) {
  return request({
    url: '/api/plantWarningInfo/updatePlantWarningInfo',
    method: 'post',
    data
  })
}

/**
 * 查询未确认信息和异常信息总数
 * @method
 */
obj.count=function(data) {
  return request({
    url: '/api/plantWarningInfo/count',
    method: 'get',
    data
  })
}

export default obj