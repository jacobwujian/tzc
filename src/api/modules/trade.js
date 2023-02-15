import request from '@/utils/request'
const obj = {}

/**
 * 拥有资产数量详情
 * @method
 * @name assetAmountDetail
 * @param {array} statusList -
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetId -资产Id
 * @param {integer} projectId -项目Id
 * @param {string} projectName -项目名称
 * @param {string} companyName -公司名称
 * @param {integer} companyId -公司Id
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {string} buyTimeStart -买入开始时间
 * @param {string} buyTimeEnd -买入结束时间
 * @param {string} verificationTimeStart -核销开始时间
 * @param {string} verificationTimeEnd -核销结束时间
 * @param {integer} ownerId -
 */
obj.assetAmountDetail=function(params) {
  return request({
    url: '/api/trade/assetAmountDetail',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 发布资产详情
 * @method
 * @name assetSaleDetail
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -查明细时 只需要传： 售卖资产id
 * @param {string} companyName -
 * @param {string} projectName -项目名称
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {integer} projectId -项目Id
 * @param {string} resourceChainTimeStart -生产开始时间
 * @param {string} resourceChainTimeEnd -生产结束时间
 * @param {string} publishTimeStart -发布开始时间
 * @param {string} publishTimeEnd -发布结束时间
 * @param {string} saleTimeStart -卖出开始时间
 * @param {string} saleTimeEnd -卖出结束时间
 * @param {integer} publishStatus -发布资产状态
 * @param {integer} authenticationLevel -认证等级
 * @param {integer} amount -总数量
 * @param {integer} soldAmount -在售数量
 * @param {integer} sellerId -
 * @param {integer} companyId -
 */
obj.assetSaleDetail=function(params) {
  return request({
    url: '/api/trade/assetSaleDetail',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 发布资产数量详情
 * @method
 * @name assetSaleDetailAmount
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -查明细时 只需要传： 售卖资产id
 * @param {string} companyName -
 * @param {string} projectName -项目名称
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {integer} projectId -项目Id
 * @param {string} resourceChainTimeStart -生产开始时间
 * @param {string} resourceChainTimeEnd -生产结束时间
 * @param {string} publishTimeStart -发布开始时间
 * @param {string} publishTimeEnd -发布结束时间
 * @param {string} saleTimeStart -卖出开始时间
 * @param {string} saleTimeEnd -卖出结束时间
 * @param {integer} publishStatus -发布资产状态
 * @param {integer} authenticationLevel -认证等级
 * @param {integer} amount -总数量
 * @param {integer} soldAmount -在售数量
 * @param {integer} sellerId -
 * @param {integer} companyId -
 */
obj.assetSaleDetailAmount=function(params) {
  return request({
    url: '/api/trade/assetSaleDetailAmount',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 发布绿证记录
 * @method
 * @name assetSaleRecordDetail
 * @param {integer} id -序号
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -查明细时 只需要传： 售卖资产id
 * @param {integer} recordId -流水号
 * @param {string} createTime -发布时间
 * @param {integer} quantity -数量
 * @param {integer} price -单价
 * @param {integer} status -状态 0 在售 1 已售出 2 发布撤回 3 发布中
 * @param {integer} symbol -数据操作形式: 0加  1减
 */
obj.assetSaleRecordDetail=function(params) {
  return request({
    url: '/api/trade/assetSaleRecordDetail',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 资产操作记录列表
 * @method
 * @name assetSaleRecordList
 * @param {array} statusList -
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetId -资产Id
 * @param {integer} projectId -项目Id
 * @param {string} projectName -项目名称
 * @param {string} companyName -公司名称
 * @param {integer} companyId -公司Id
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {string} buyTimeStart -买入开始时间
 * @param {string} buyTimeEnd -买入结束时间
 * @param {string} verificationTimeStart -核销开始时间
 * @param {string} verificationTimeEnd -核销结束时间
 * @param {integer} ownerId -
 */
obj.assetSaleRecordList=function(params) {
  return request({
    url: '/api/trade/assetSaleRecordList',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 资产售卖交易记录
 * @method
 * @name assetSaleTradeRecord
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -售卖资产商品Id
 * @param {integer} orderStatus -
 */
obj.assetSaleTradeRecord=function(params) {
  return request({
    url: '/api/trade/assetSaleTradeRecord',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 核销资产申请
 * @method
 * @name assetWriteOffApplication
 * @param {} assetWriteOffApplicationDto -assetWriteOffApplicationDto
 */
obj.assetWriteOffApplication=function(data) {
  return request({
    url: '/api/trade/assetWriteOffApplication',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 下单购买
 * @method
 * @name buy
 * @param {} buyOrderDto -buyOrderDto
 */
obj.buy=function(data) {
  return request({
    url: '/api/trade/buy',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 刷新资产
 * @method
 * @name flushAsset
 * @param {} flushAssetDto -flushAssetDto
 */
obj.flushAsset=function(data) {
  return request({
    url: '/api/trade/flushAsset',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 首页售卖资源列表
 * @method
 * @name homePageAssetSale
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -查明细时 只需要传： 售卖资产id
 * @param {string} companyName -
 * @param {string} projectName -项目名称
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {integer} projectId -项目Id
 * @param {string} resourceChainTimeStart -生产开始时间
 * @param {string} resourceChainTimeEnd -生产结束时间
 * @param {string} publishTimeStart -发布开始时间
 * @param {string} publishTimeEnd -发布结束时间
 * @param {string} saleTimeStart -卖出开始时间
 * @param {string} saleTimeEnd -卖出结束时间
 * @param {integer} publishStatus -发布资产状态
 * @param {integer} authenticationLevel -认证等级
 * @param {integer} amount -总数量
 * @param {integer} soldAmount -在售数量
 * @param {integer} sellerId -
 * @param {integer} companyId -
 */
obj.homePageAssetSale=function(params) {
  return request({
    url: '/api/trade/homePageAssetSale',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 首页售卖发布资产详情
 * @method
 * @name homePageAssetSaleDetail
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -查明细时 只需要传： 售卖资产id
 * @param {string} companyName -
 * @param {string} projectName -项目名称
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {integer} projectId -项目Id
 * @param {string} resourceChainTimeStart -生产开始时间
 * @param {string} resourceChainTimeEnd -生产结束时间
 * @param {string} publishTimeStart -发布开始时间
 * @param {string} publishTimeEnd -发布结束时间
 * @param {string} saleTimeStart -卖出开始时间
 * @param {string} saleTimeEnd -卖出结束时间
 * @param {integer} publishStatus -发布资产状态
 * @param {integer} authenticationLevel -认证等级
 * @param {integer} amount -总数量
 * @param {integer} soldAmount -在售数量
 * @param {integer} sellerId -
 * @param {integer} companyId -
 */
obj.homePageAssetSaleDetail=function(params) {
  return request({
    url: '/api/trade/homePageAssetSaleDetail',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 拥有资产详情
 * @method
 * @name ownAssetDetail
 * @param {array} statusList -
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetId -资产Id
 * @param {integer} projectId -项目Id
 * @param {string} projectName -项目名称
 * @param {string} companyName -公司名称
 * @param {integer} companyId -公司Id
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {string} buyTimeStart -买入开始时间
 * @param {string} buyTimeEnd -买入结束时间
 * @param {string} verificationTimeStart -核销开始时间
 * @param {string} verificationTimeEnd -核销结束时间
 * @param {integer} ownerId -
 */
obj.ownAssetDetail=function(params) {
  return request({
    url: '/api/trade/ownAssetDetail',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 拥有资产列表
 * @method
 * @name ownAssetList
 * @param {array} statusList -
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetId -资产Id
 * @param {integer} projectId -项目Id
 * @param {string} projectName -项目名称
 * @param {string} companyName -公司名称
 * @param {integer} companyId -公司Id
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {string} buyTimeStart -买入开始时间
 * @param {string} buyTimeEnd -买入结束时间
 * @param {string} verificationTimeStart -核销开始时间
 * @param {string} verificationTimeEnd -核销结束时间
 * @param {integer} ownerId -
 */
obj.ownAssetList=function(params) {
  return request({
    url: '/api/trade/ownAssetList',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 发布资产
 * @method
 * @name publishAsset
 * @param {} publishAssetDto -publishAssetDto
 */
obj.publishAsset=function(data) {
  return request({
    url: '/api/trade/publishAsset',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 充值
 * @method
 * @name recharge
 * @param {} rechargeDto -rechargeDto
 */
obj.recharge=function(data) {
  return request({
    url: '/api/trade/recharge',
    method: 'post',
    data,
    domain: 'wx'
  })
}


/**
 * 发布资产列表
 * @method
 * @name saleAssetList
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetSaleId -查明细时 只需要传： 售卖资产id
 * @param {string} companyName -
 * @param {string} projectName -项目名称
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {integer} projectId -项目Id
 * @param {string} resourceChainTimeStart -生产开始时间
 * @param {string} resourceChainTimeEnd -生产结束时间
 * @param {string} publishTimeStart -发布开始时间
 * @param {string} publishTimeEnd -发布结束时间
 * @param {string} saleTimeStart -卖出开始时间
 * @param {string} saleTimeEnd -卖出结束时间
 * @param {integer} publishStatus -发布资产状态
 * @param {integer} authenticationLevel -认证等级
 * @param {integer} amount -总数量
 * @param {integer} soldAmount -在售数量
 * @param {integer} sellerId -
 * @param {integer} companyId -
 */
obj.saleAssetList=function(params) {
  return request({
    url: '/api/trade/saleAssetList',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 核销操作记录列表
 * @method
 * @name verificationRecordList
 * @param {array} statusList -
 * @param {integer} id -id
 * @param {integer} pageNum -起始页
 * @param {integer} pageSize -每页显示条数
 * @param {integer} assetId -资产Id
 * @param {integer} projectId -项目Id
 * @param {string} projectName -项目名称
 * @param {string} companyName -公司名称
 * @param {integer} companyId -公司Id
 * @param {integer} energyType -能源类型: 0 光伏 1 风电 2 水电
 * @param {string} buyTimeStart -买入开始时间
 * @param {string} buyTimeEnd -买入结束时间
 * @param {string} verificationTimeStart -核销开始时间
 * @param {string} verificationTimeEnd -核销结束时间
 * @param {integer} ownerId -
 */
obj.verificationRecordList=function(params) {
  return request({
    url: '/api/trade/verificationRecordList',
    method: 'get',
    params,
    domain: 'wx'
  })
}

/**
 * 撤回发布资产
 * @method
 * @name withDrawPublishAsset
 * @param {} saleAssetWithdrawDto -saleAssetWithdrawDto
 */
obj.withDrawPublishAsset=function(data) {
  return request({
    url: '/api/trade/withDrawPublishAsset',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 提现
 * @method
 * @name withdraw
 * @param {} withdrawDto -withdrawDto
 */
obj.withdraw=function(data) {
  return request({
    url: '/api/trade/withdraw',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 磋商上传
 * @method
 * @name protocolUpload
 * @param data
 */
obj.protocolUpload=function(data) {
  return request({
    url: '/api/trade/protocolUpload',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 交易上传
 * @method
 * @name tradeUpload
 * @param data
 */
obj.tradeUpload=function(data) {
  return request({
    url: '/api/trade/tradeUpload',
    method: 'post',
    data,
    domain: 'wx'
  })
}

/**
 * 磋商交易上传
 * @method
 * @name tradeVoucherUpload
 * @param data
 */
obj.tradeVoucherUpload=function(data) {
  return request({
    url: '/api/exchange/tradeVoucherUpload',
    method: 'post',
    data,
    domain: 'wx'
  })
}

export default obj