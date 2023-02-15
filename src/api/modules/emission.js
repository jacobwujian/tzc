import request from '@/utils/request'
const obj = {}

/**
 * 查询实际配额参数表
 * @method
 * @name queryQuotaParam
 * @param data
 */
obj.queryQuotaParam=function(data) {
    return request({
        url: '/api/carbon/emission/queryQuotaParam',
        method: 'post',
        data
    })
}


/**
 * 查询化石燃料碳排放计算参数
 * @method
 * @name queryFuelParam
 * @param data
 */
obj.queryFuelParam=function(data) {
    return request({
        url: '/api/carbon/emission/queryFuelParam',
        method: 'post',
        data
    })
}

/**
 * 查询脱硫剂碳排放计算参数
 * @method
 * @name queryDesulfurizationParam
 * @param data
 */
obj.queryDesulfurizationParam=function(data) {
    return request({
        url: '/api/carbon/emission/queryDesulfurizationParam',
        method: 'post',
        data
    })
}

/**
 * 查询净购入使用电力碳排放计算参数
 * @method
 * @name queryPurchaseEParam
 * @param v
 */
obj.queryPurchaseEParam=function(data) {
    return request({
        url: '/api/carbon/emission/queryPurchaseEParam',
        method: 'post',
        data
    })
}

/**
 * 查询输配电损耗碳排参数表
 * @method
 * @name plantLossParamVo
 * @param data
 */
obj.queryLossParam=function(data) {
    return request({
        url: '/api/carbon/emission/queryLossParam',
        method: 'post',
        data
    })
}

/**
 * 查询六硫化氟排放参数表
 * @method
 * @name plantEquipmentParamVo
 * @param data
 */
obj.queryEquipmentParam=function(data) {
    return request({
        url: '/api/carbon/emission/queryEquipmentParam',
        method: 'post',
        data
    })
}
/**
 * 实际配额计算
 * @method
 * @name quotaCalc
 * @param data
 */
obj.quotaCalc=function(data) {
    return request({
        url: '/api/carbon/emission/quotaCalc',
        method: 'post',
        data
    })
}

/**
 * 化石燃料碳排放计算
 * @method
 * @name fuelCalc
 * @param data
 */
obj.fuelCalc=function(data) {
    return request({
        url: '/api/carbon/emission/fuelCalc',
        method: 'post',
        data
    })
}

/**
 * 脱硫剂碳排放计算
 * @method
 * @name desulfurizationCalc
 * @param data
 */
obj.desulfurizationCalc=function(data) {
    return request({
        url: '/api/carbon/emission/desulfurizationCalc',
        method: 'post',
        data
    })
}

/**
 * 净购入使用电力碳排放计算
 * @method
 * @name purchaseECalc
 * @param data
 */
obj.purchaseECalc=function(data) {
    return request({
        url: '/api/carbon/emission/purchaseECalc',
        method: 'post',
        data
    })
}


/**
 * 输电损耗碳排放计算
 * @method
 * @name listPlantLossEParamVos
 * @param data
 */
obj.lossECalc=function(data) {
    return request({
        url: '/api/carbon/emission/lossECalc',
        method: 'post',
        data
    })
}

/**
 * 六硫化氟排放计算
 * @method
 * @name listPlantEquipmentEParamVos
 * @param data
 */
obj.equipmentECalc=function(data) {
    return request({
        url: '/api/carbon/emission/equipmentECalc',
        method: 'post',
        data
    })
}

/**
 * 保存化石燃料碳排放计算结果
 * @method
 * @name saveFuelResult
 * @param data
 */
obj.saveFuelResult=function(data) {
    return request({
        url: '/api/carbon/emission/saveFuelResult',
        method: 'post',
        data
    })
}

/**
 * 保存脱硫剂碳排放计算结果
 * @method
 * @name saveDesulfurizationResult
 * @param data
 */
obj.saveDesulfurizationResult=function(data) {
    return request({
        url: '/api/carbon/emission/saveDesulfurizationResult',
        method: 'post',
        data
    })
}

/**
 * 保存净购入使用电力碳排放计算结果
 * @method
 * @name savePurchaseEResult
 * @param data
 */
obj.savePurchaseEResult=function(data) {
    return request({
        url: '/api/carbon/emission/savePurchaseEResult',
        method: 'post',
        data
    })
}

/**
 * 保存碳排放结果
 * @method
 * @name savePurchaseEResult
 * @param data
 */
obj.saveCarbonEmissionResult=function(data) {
    return request({
        url: '/api/carbon/emission/saveCarbonEmissionResult',
        method: 'post',
        data
    })
}
/**
 * 保存实际配额计算结果
 * @method
 * @name savePurchaseEResult
 * @param data
 */
obj.saveQuotaResult=function(data) {
    return request({
        url: '/api/carbon/emission/saveQuotaResult',
        method: 'post',
        data
    })
}

export default obj