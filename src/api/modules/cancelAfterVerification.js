import request from '@/utils/request'
const obj = {}

/**
 * 核销审核
 * @method
 * @name getWriteOffInfoCheck
 * @param {} checkDto -checkDto
 */
obj.getWriteOffInfoCheck=function(data) {
  return request({
    url: '/api/writeOffInfo/getWriteOffInfoCheck',
    method: 'post',
    data,
    domain: 'cw'
  })
}

/**
 * 核销详情
 * @method
 * @name getWriteOffOfPowerPlantDetail
 * @param {integer} id -id
 */
obj.getWriteOffOfPowerPlantDetail=function(params) {
  return request({
    url: '/api/writeOffInfo/getWriteOffInfoDetail',
    method: 'get',
    params,
    domain: 'cw'
  })
}

/**
 * 条件查询核销列表
 * @method
 * @name getWriteOffOfPowerPlantList
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {string} companyName -核销企业
 * @param {string} startTime -开始时间
 * @param {string} endTime -结束时间
 * @param {integer} status -核销状态：0待审核 1审核通过 2审核拒绝
 * @param {string} relateProject -关联项目
 */
obj.getWriteOffOfPowerPlantList=function(params) {
  return request({
    url: '/api/writeOffInfo/getWriteOffInfoList',
    method: 'get',
    params,
    domain: 'cw'
  })
}

export default obj