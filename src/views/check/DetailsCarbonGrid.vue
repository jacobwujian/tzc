<template>
  <!-- 电网碳排详情 -->
  <div class="CarbonAccounting-container">
    <!-- 表头查询 -->
    <a-form-model layout="inline" class="formModle">
      <a-row :gutter="[15, 0]" class="oneRow">
        <a-col :span="6">
          <a-form-model-item label="机构名称:">
            {{ plantData.plantName }}
          </a-form-model-item>
        </a-col>

        <a-col :span="6">
          <a-form-model-item label="机构类型:">
            {{ plantData.plantType }}
          </a-form-model-item>
        </a-col>

        <a-col :span="6">
          <a-form-model-item label="所属地区:">
            {{ plantData.area }}
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- 按钮 -->
      <a-row :gutter="[10, 0]" class="twoRow">
        <a-col class="timeBtn2">
          <a-form-model-item label="碳排放总量:">
            {{ plantData.carbonEmission }}
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row class="twoRow1">
        <a-col :span="2" class="queryBtn">
          <a-space>
            <a-button type="primary" :disabled="loading" class="queryButton" @click="conditionsQuery">
              查询
            </a-button>
            <a-button class="resetButton" :disabled="loading" @click="reset">
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form-model>

    <!-- 表格 -->
    <a-form-model layout="inline">
      <!-- 设备使用相关表格 -->
      <a-row>
        <a-card title="设备使用相关" :bordered="false">
          <a-col :span="5" class="fossilConsumptionSum">
            <a-form-model-item label="设备消耗六氟化硫合计:">
              {{ this.consumptionSum }}
            </a-form-model-item>
          </a-col>
          <a-col :span="5" class="fossilConsumptionSum">
            <a-form-model-item label="设备碳排放合计:">
              {{ this.emissionsSum }}
            </a-form-model-item>
          </a-col>
          <a-button type="primary" class="rightButton" @click="handleDownload(EquipmentUseTable.data().columns, 'equipmentUseList', '设备消耗六氟化硫合计')">
            导出表格
          </a-button>
          <EquipmentUseTable :equipment-use-list="equipmentUseList" :loading="loading" />
        </a-card>
      </a-row>
      <!-- 输配电损耗相关 -->
      <a-row>
        <a-card title="输配电损耗相关" :bordered="false">
          <a-col :span="5" class="fossilConsumptionSum">
            <a-form-model-item label="输配电损耗电量合计:">
              {{ this.lossConsumptionSum }}
            </a-form-model-item>
          </a-col>
          <a-col :span="5" class="fossilConsumptionSum">
            <a-form-model-item label="输配电损耗碳排放合计:">
              {{ this.lossEmissionsSum }}
            </a-form-model-item>
          </a-col>
          <a-button type="primary" class="rightButton" @click="handleDownload(TransmissionDistributionLossTable.data().columns, 'electricLossList', '输配电损耗碳排放合计')">
            导出表格
          </a-button>
          <TransmissionDistributionLossTable :electric-loss-list="electricLossList" :loading="loading" />
        </a-card>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { codeToText } from '@/utils/cascader-address-options'
import EquipmentUseTable from './components/EquipmentUseTable.vue'
import TransmissionDistributionLossTable from './components/TransmissionDistributionLossTable.vue'
export default {
  components: {
    EquipmentUseTable,
    TransmissionDistributionLossTable
  },
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      EquipmentUseTable: EquipmentUseTable,
      TransmissionDistributionLossTable: TransmissionDistributionLossTable,
      // 解析地址数字串工具
      codeToText,
      // 查看当前详情的电厂id
      plantId: 0,
      // 设备使用数据
      equipmentUseList: [],
      consumptionSum: null,
      emissionsSum: null,
      // 电损耗
      electricLossList: [],
      lossConsumptionSum: null,
      lossEmissionsSum: null,
      // 表格加载中
      loading: false,

      // 把管理员父传子过来的值/把普通用户通过接口查到的值
      plantData: {}
    }
  },
  created() {
    this.queryDetails()
  },
  methods: {
    handleDownload(col, datas, name) {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = col.map(e => {
          return e.title
        })
        const data = this[datas].map(v => col.map(j => v[j.dataIndex]))
        excel.export_json_to_excel({
          header: tHeader,
          data: [data],
          filename: name
        })
      })
    },
    // 获取电损耗数据
    getElectricLoss() {
      this.loading = true
      this.electricLossList = []
      this.lossConsumptionSum = null
      this.lossEmissionsSum = null
      this.$api.carbonEmissions
        .getElectricLossByPlantId({
          id: this.plantData.plantId,
          year: this.plantData.year
        })
        .then(res => {
          if (res) {
            this.electricLossList = res
            this.electricLossList.forEach(item => {
              this.lossConsumptionSum += item.consumption
              this.lossEmissionsSum += item.emissions
            })
          }
        })
        .finally(() => {
          this.lossConsumptionSum = this.lossConsumptionSum.toFixed(2)
          this.lossEmissionsSum = this.lossEmissionsSum.toFixed(2)
        })
    },
    // 获取设备使用表格数据
    getEquipmentUse() {
      this.loading = true
      this.equipmentUseList = []
      this.consumptionSum = null
      this.emissionsSum = null
      this.$api.carbonEmissions
        .getEquipmentUseByPlantId({
          id: this.plantData.plantId,
          year: this.plantData.year
        })
        .then(res => {
          if (res) {
            this.equipmentUseList = res
            this.equipmentUseList.forEach(item => {
              this.consumptionSum += item.consumption
              this.emissionsSum += item.emissions
            })
          }
        })
        .finally(() => {
          this.consumptionSum = this.consumptionSum.toFixed(2)
          this.emissionsSum = this.emissionsSum.toFixed(2)
          this.loading = false
        })
    },
    // 默认查询
    queryDetails() {
      if (this.detail != undefined) {
        this.plantData = this.detail
        this.getEquipmentUse()
        this.getElectricLoss()
      }
    },

    // 重置
    reset() {
      this.conditionsQuery()
    },
    // 条件查询
    conditionsQuery() {
      // 表格
      this.getEquipmentUse()
      this.getElectricLoss()
    }
  }
}
</script>

<style lang="less" scoped>
.CarbonAccounting-container {
  margin-top: 30px;
}
.CarbonAccounting-container {
  .returnButton {
    position: absolute;
    left: 6%;
    top: 22px;
  }
}

.CarbonAccounting-container {
  .formModle {
    .oneRow {
      position: relative;
      left: 18%;
      width: 100%;
      line-height: 50px;
    }
    .twoRow {
      height: 50px;
      width: 100%;
    }
    .carTable {
      margin-top: 80px;
      margin-left: 2%;
      width: 95%;
    }
  }
}

.twoRow1 {
  .queryBtn {
    position: absolute;
    z-index: 9;
    left: 68%;
    top: -35px;
  }
}
.twoRow {
  .timeBtn {
    position: absolute;
    left: 18%;
    bottom: 0;
  }
  .timeBtn1 {
    position: absolute;
    left: 43%;
    bottom: 0;
  }
  .timeBtn2 {
    position: absolute;
    left: 18%;
    top: 20%;
  }
}
.rightButton {
  margin-left: 39%;
}
.twoRow {
  .queryButton {
    width: 80px;
    height: 35px;
  }
  .resetButton {
    width: 80px;
    height: 35px;
    margin-left: 10px;
  }
}

.fossilConsumptionSum {
  margin-left: 4%;
}
</style>
