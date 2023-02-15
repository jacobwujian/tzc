import request from '@/utils/request'
const obj = {}

// 碳排查询
obj.getPowerPlant = function(data) {
  return request({
    url: '/api/carbonEmissions/getPowerPlant',
    method: 'post',
    data
  })
}

// 碳核算详情中的图表查询
// 获取化石table 数据
obj.getFossilConsumptionEmissionListByPlantId = function(data) {
  return request({
    url: '/api/carbonEmissions/getFossilConsumptionEmissionListByPlantId',
    method: 'post',
    data
  })
}

// 化石Line
obj.getTotalCarbonLine = function(data) {
  return request({
    url: '/api/carbonEmissions/getTotalCarbonLine',
    method: 'post',
    data
  })
}

// 化石消耗par
obj.getFossilConsumptionPar = function(data) {
  return request({
    url: '/api/carbonEmissions/getFossilConsumptionPar',
    method: 'post',
    data
  })
}

// 化石排放par
obj.getFossilEmissionsPar = function(data) {
  return request({
    url: '/api/carbonEmissions/getFossilEmissionsPar',
    method: 'post',
    data
  })
}

// 获取购电table 数据
obj.getPowerPurchaseConsumptionEmissionListByPlantId = function(data) {
  return request({
    url: '/api/carbonEmissions/getPowerPurchaseConsumptionEmissionListByPlantId',
    method: 'post',
    data
  })
}

// 购电Line
obj.getPowerTotalCarbonLine = function(data) {
  return request({
    url: '/api/carbonEmissions/getPowerTotalCarbonLine',
    method: 'post',
    data
  })
}

// 电网相关
// 设备使用Table 数据
obj.getEquipmentUseByPlantId = function(data) {
  return request({
    url: '/api/carbonEmissions/getEquipmentUseByPlantId',
    method: 'post',
    data
  })
}

// 设备使用Line
obj.getEquipmentUseLine = function(data) {
  return request({
    url: '/api/carbonEmissions/getEquipmentUseLine',
    method: 'post',
    data
  })
}

// 电损耗Table 数据
obj.getElectricLossByPlantId = function(data) {
  return request({
    url: '/api/carbonEmissions/getElectricLossByPlantId',
    method: 'post',
    data
  })
}

// 电损耗Line
obj.getElectricLossLine = function(data) {
  return request({
    url: '/api/carbonEmissions/getElectricLossLine',
    method: 'post',
    data
  })
}

// 碳排配额表格
obj.getCarbonQuotas = function(data) {
  return request({
    url: '/api/carbonEmissions/getCarbonQuotas',
    method: 'post',
    data
  })
}

// 碳排配额Line
obj.getCarbonQuotasLine = function(data) {
  return request({
    url: '/api/carbonEmissions/getCarbonQuotasLine',
    method: 'post',
    data
  })
}

export default obj
