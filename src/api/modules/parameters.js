import request from '@/utils/request'
const obj = {}

/**
 * 查询化石燃料排放基本参数
 * @method
 * @name plantFuelParamVo
 * @param data
 */
obj.getFossilFuelEmissionsBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/getFossilFuelEmissionsBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 修改化石燃料排放基本参数
 * @method
 * @name plantFuelParamVo
 * @param data
 */
obj.updateFossilFuelEmissionsBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/updateFossilFuelEmissionsBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 查询净购入电力排放基本参数
 * @method
 * @name plantPurchaseEParamVo
 * @param data
 */
 obj.getNetPurchasedElectricityEmissionsBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/getNetPurchasedElectricityEmissionsBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 修改净购入电力排放基本参数
 * @method
 * @name plantPurchaseEParamVo
 * @param data
 */
obj.updateNetPurchasedElectricityEmissionsBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/updateNetPurchasedElectricityEmissionsBasicParameters',
    method: 'post',
    data
  })
}


/**
 * 查询使用六氟化硫设备修理与退役过程生产的排放基本参数
 * @method
 * @name plantEquipmentParamVo
 * @param data
 */
 obj.getSulfurHexafluorideBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/getSulfurHexafluorideBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 修改使用六氟化硫设备修理与退役过程生产的排放基本参数
 * @method
 * @name plantEquipmentParamVo
 * @param data
 */
obj.updateSulfurHexafluorideBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/updateSulfurHexafluorideBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 查询输配电线路上损耗的排放基本参数
 * @method
 * @name plantLossParamVo
 * @param data
 */
 obj.getWireLossBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/getWireLossBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 修改输配电线路上损耗的排放基本参数
 * @method
 * @name plantLossParamVo
 * @param data
 */
obj.updateWireLossBasicParameters=function(data) {
  return request({
    url: '/api/basicParameters/updateWireLossBasicParameters',
    method: 'post',
    data
  })
}

/**
 * 查询供电基准值基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.getUnitrange=function(data) {
  return request({
    url: '/api/basicParameters/getUnitrange',
    method: 'post',
    data
  })
}

/**
 * 修改供电基准值基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
obj.updateUnitrange=function(data) {
  return request({
    url: '/api/basicParameters/updateUnitrange',
    method: 'post',
    data
  })
}

/**
 * 查询供热基准值基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.getHeatingReference=function(data) {
  return request({
    url: '/api/basicParameters/getHeatingReference',
    method: 'post',
    data
  })
}

/**
 * 修改供热基准值基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.updateHeatingReference=function(data) {
  return request({
    url: '/api/basicParameters/updateHeatingReference',
    method: 'post',
    data
  })
}

/**
 * 查询冷却方式系数基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.getCoolingType=function(data) {
  return request({
    url: '/api/basicParameters/getCoolingType',
    method: 'post',
    data
  })
}

/**
 * 修改冷却方式系数基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.updateCoolingType=function(data) {
  return request({
    url: '/api/basicParameters/updateCoolingType',
    method: 'post',
    data
  })
}

/**
 * 查询供热量修正系数基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.getHeatingType=function(data) {
  return request({
    url: '/api/basicParameters/getHeatingType',
    method: 'post',
    data
  })
}

/**
 * 修改供热量修正系数基本参数
 * @method
 * @name PlantQuotaParamVo
 * @param data
 */
 obj.updateHeatingType=function(data) {
  return request({
    url: '/api/basicParameters/updateHeatingType',
    method: 'post',
    data
  })
}
export default obj