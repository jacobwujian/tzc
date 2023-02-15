//机组类型
export const unitType = [
  {
    name: '300MW等级以上常规燃煤机组',
    value: 1
  }, {
    name: '300MW等级及以下常规燃煤机组',
    value: 2
  }, {
    name: '燃煤矸石、水煤浆等非常规燃煤机组（含燃煤循环流化床机组）',
    value: 3
  }, {
    name: '燃气机组',
    value: 4
  }
]

//冷却方式
export const coolingMethod = [
  {
    name: '空冷',
    value: 1
  }, {
    name: '水冷',
    value: 2
  }, {
    name: '无',
    value: 3
  }
]

//发电类型
export const eleType = [
  {
    name: '纯凝发电',
    value: 1
  }, {
    name: '热电联产',
    value: 2
  }
]

//预警参数类型
export const warningType = [
  {
    name: '燃煤消耗量',
    value: 1
  }, {
    name: '燃煤低位发热值',
    value: 2
  }, {
    name: '燃煤单位热值含碳量',
    value: 3
  }
]

//预警参数类型
export const warningInfoType = [
  {
    name: '燃煤消耗量',
    value: 1
  }, {
    name: '燃煤低位发热值',
    value: 2
  }, {
    name: '燃煤单位热值含碳量',
    value: 3
  }, {
    name: '配额预警',
    value: 99
  }
]

//电厂类型
export const plantTypeT = [
  {
    name: '发电企业',
    value: 1
  }, {
    name: '电网企业',
    value: 2
  }
]

//预警状态
export const warningStatus = [
  {
    name: '异常',
    value: 1
  }, {
    name: '无异常',
    value: 2
  }, {
    name: '确认无异常',
    value: 3
  }
]

// 能源类型
export const energyType = [
{
    name: '光伏',
    value: 0
  }, {
    name: '风电',
    value: 1
  }, {
    name: '水电',
    value: 2
  }
]

//管理主管部门
export const managementDepartment = [
  {
      name: '浙江省生态环境厅',
      value: 1
    },
  {
    name: '安徽省生态环境厅',
    value: 2
  },
  {
    name: '福建省生态环境厅',
    value: 3
  },
  {
    name: '江西省生态环境厅',
    value: 4
  },
  {
    name: '江苏省生态环境厅',
    value: 5
  },
  {
    name: '山东省生态环境厅',
    value: 6
  }, {
    name: '广东省生态环境厅',
    value: 7
  },
  {
    name: '河南省生态环境厅',
    value: 8
  },
  {
    name: '湖南省生态环境厅',
    value: 9
  },
  {
    name: '湖北省生态环境厅',
    value: 10
  }
  ]


// 行业类别
export const plantType = [
  {
    name: '火电',
    value: 1
  }, {
    name: '水电',
    value: 2
  }, {
    name: '核电',
    value: 3
  }, {
    name: '风电',
    value: 4
  }, {
    name:'热电联产',
    value:5
  }

]

// 电厂性质
export const plantArr = [
  {
    name: '独立电厂',
    value: 1
  }, {
    name: '自备电厂',
    value: 2
  }
]

// 电厂性质
export const epCode = [
  {
    name: '省公司购电',
    value: 1
  }, {
    name: '地（市）公司购电',
    value: 2
  }, {
    name: '县公司购电',
    value: 3
  }
]

//单位性质
export const unitProperty = [
  {
    name: '外资企业',
    value: 1
  }, {
    name: '国营企业',
    value: 2
  }, {
    name: '私营企业',
    value: 3
  }
]

//单位性质
export const enterpriseType = [
  {
    name: '发电企业',
    value: 1
  }, {
    name: '电网企业',
    value: 2
  }
]

//清算状态
export const flagType = [
  {
    name: '未清算',
    value: 1
  }, {
    name: '清算完成',
    value: 2
  }
]

//供电基本类型
export const powerSupplyReferenceType = [
  {
    name: '300MW等级以上常规燃煤机组',
    value: 1
  }, {
    name: '300MW等级及以下常规燃煤机组',
    value: 2
  }, {
    name: '燃煤矸石、水煤浆等非常规燃煤机组（含燃煤循环流化床机组）',
    value: 3
  }, {
    name: '燃气机组',
    value: 4
  }
]

//供热基本类型
export const heatingReferenceType = [
  {
    name: '300MW等级以上常规燃煤机组',
    value: 1
  }, {
    name: '300MW等级及以下常规燃煤机组',
    value: 2
  }, {
    name: '燃煤矸石、水煤浆等非常规燃煤机组（含燃煤循环流化床机组）',
    value: 3
  }, {
    name: '燃气机组',
    value: 4
  }
]

//冷却方式
export const coolingType = [
  {
    name: '空冷',
    value: 1
  }, {
    name: '水冷',
    value: 2
  }, {
    name: '无',
    value: 3
  }
]

//供热量修正系数
export const heatingType = [
  {
    name: '供热量修正系数 --- 燃煤机组',
    value: 1
  }, {
    name: '供热量修正系数 --- 燃气机组',
    value: 2
  }
]

//燃料类型
export const fuelType = [
  {
    name: '燃煤',
    value: 1
  }, {
    name: '原油',
    value: 2
  }, {
    name: '燃料油',
    value: 3
  }, {
    name: '汽油',
    value: 4
  }, {
    name: '煤油',
    value: 5
  }, {
    name: '柴油',
    value: 6
  }, {
    name: '液化石油气',
    value: 7
  }, {
    name: '炼厂干气',
    value: 8
  }, {
    name: '天然气',
    value: 9
  }, {
    name: '焦炉煤气',
    value: 10
  }, {
    name: '高炉煤气',
    value: 11
  }, {
    name: '转炉煤气',
    value: 12
  }, {
    name: '其他煤气',
    value: 13
  }
]

//脱硫剂类型
export const desulfurizerType = [
  {
    name: 'CaCO3',
    value: 1
  }, {
    name: 'MgCO3',
    value: 2
  }, {
    name: 'Na2CO3',
    value: 3
  }, {
    name: 'BaCO3',
    value: 4
  }, {
    name: 'Li2CO3',
    value: 5
  }, {
    name: 'K2CO3',
    value: 6
  }, {
    name: 'SrCO3',
    value: 7
  }, {
    name: 'NaHCO3',
    value: 8
  }, {
    name: 'FeCO3',
    value: 9
  }
]

//购入区域
export const purchaseArea = [
  {
    name: '东北',
    value: 1
  }, {
    name: '华北',
    value: 2
  }, {
    name: '华东',
    value: 3
  }, {
    name: '华中',
    value: 4
  }, {
    name: '西北',
    value: 5
  }, {
    name: '南方电网',
    value: 6
  }
]

// 审核状态
export const checkStatus = [
  {
    name: '全部',
    value: ''
  }, {
    name: '待审核',
    value: 0
  }, {
    name: '审核通过',
    value: 1
  }, {
    name: '审核拒绝',
    value: 2
  }
]
// 机组类型
export const dealType = [
  {
    name: 'B型',
    value: 0
  }, {
    name: 'F型',
    value: 1
  }, {
    name: 'E型',
    value: 2
  }, {
    name:'分布式',
    value:3
  }
]
// 交易状态
export const dealStatus = [
  {
    name: '全部',
    value: ''
  }, {
    name: '未交易',
    value: 0
  }, {
    name: '待审核',
    value: 1
  }, {
    name: '处理成功',
    value: 2
  }, {
    name: '处理中',
    value: 3
  }, {
    name: '处理失败',
    value: 4
  }
]

// 磋商状态
export const protocolStatus = [
  {
    name: '全部',
    value: ''
  }, {
    name: '未磋商',
    value: 0
  }, {
    name: '待审核',
    value: 1
  }, {
    name: '磋商成功',
    value: 2
  }, {
    name: '磋商失败',
    value: 3
  }
]
// 启用、停用状态
export const switchStatus = [
  {
    name: '全部',
    value: ''
  }, {
    name: '启用',
    value: 1
  }, {
    name: '停用',
    value: 0
  }
]
// 账户状态
export const accountStatus = [
  {
    name: '未生效',
    value: 0
  }, {
    name: '启用',
    value: 1
  }, {
    name: '停用',
    value: 2
  }
]

export const assetsStatus = [
  {
    name: '未核销',
    value: 1
  }, {
    name: '已核销',
    value: 2
  }, {
    name: '核销审批中',
    value: 3
  }, {
    name: '核销失败',
    value: 4
  }
]
// 上链状态
export const chainStatus = [
  {
    name: '未上链',
    value: 'notKey'
  },
  {
    name: '上链中',
    value: 0
  }, {
    name: '上链成功',
    value:1
  }, {
    name: '上链失败',
    value: 2
  }
]

export const orgTypes = [
  {
    name: '超级管理员',
    value: 0
  }, {
    name: '耗能企业',
    value: 1
  }, {
    name: '能源企业',
    value: 2
  }
]

export const reviewType = [
  {
    name: '通过',
    value: 1
  }, {
    name: '驳回',
    value: 0
  }
]

export const verificationType = [
  {
    name: '待审核',
    value: 0
  },
  {
    name: '审核通过',
    value: 1
  },
  {
    name: '审核拒绝',
    value: 2
  }
]


// 交易类型
export const orderType = [
 {
    name: '直接交易订单',
    value: 1
  }, {
    name: '磋商协议订单',
    value: 2
  }

]

// 浙江城市code
export const cityCode = [
  {
    name: '杭州市',
    value: 3301
  }, {
    name: '宁波市',
    value: 3302
  }, {
    name: '温州市',
    value: 3303
  }, {
    name: '嘉兴市',
    value: 3304
  }, {
    name: '湖州市',
    value: 3305
  }, {
    name: '绍兴市',
    value: 3306
  }, {
    name: '金华市',
    value: 3307
  }, {
    name: '衢州市',
    value: 3308
  }, {
    name: '舟山市',
    value: 3309
  }, {
    name: '台州市',
    value: 3310
  }, {
    name: '丽水市',
    value: 3311
  }
]


export const EnumMap = (arr, key) => {
  if ((!arr || !key) && key !== 0) return null

  let map = new Map()
  arr.forEach(
    ({ value, name }) => map.set(value, name)
  )
  return map.get(key)
}