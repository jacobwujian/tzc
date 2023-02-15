<template>
  <!-- 电厂碳排详情 -->
  <div class="CarbonAccounting-container">
    <a-form-model layout="inline" class="formModle">
      <!-- 表头查询 -->
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

      <a-row :gutter="[10, 0]" class="twoRow">
        <!--  -->
        <a-col class="timeBtn">
          <!-- 下拉框 -->
          <a-form-model-item label="查询维度" prop="conditions">
            <a-select v-model="conditions" style="width: 150px" @change="selectChange">
              <a-select-option v-for="item in conditionList" :key="item.id" :value="item.value">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- 月 -->
        <a-col class="timeBtn1">
          <a-form-model-item v-if="conditions == '按月查询'" label="碳排放年月" prop="monthtime">
            <a-month-picker v-model="dimension.monthtime" :default-value="moment(new Date(), 'YYYY-MM')" />
          </a-form-model-item>
          <!-- 年 -->
          <a-form-model-item v-else label="碳排放年月">
            <a-date-picker v-model="dimension.yeartime" :default-value="moment(new Date(), 'YYYY')" mode="year" placeholder="请选择您要查询的年份" format="YYYY" :open="yearShowOne" @openChange="openChangeOne" @panelChange="panelChangeOne" />
          </a-form-model-item>
        </a-col>

        <a-col class="timeBtn2">
          <a-form-model-item label="碳排放总量:">
            {{ plantData.carbonEmission }}
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row class="twoRow1">
        <a-col :span="2" class="queryBtn">
          <a-space>
            <a-button type="primary" :disabled="loadingFossil" class="queryButton" @click="conditionsQuery">
              查询
            </a-button>
            <a-button class="resetButton" :disabled="loadingFossil" @click="reset">
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form-model>

    <a-form-model layout="inline">
      <!-- 化石表格 -->
      <a-row>
        <a-card title="化石燃料相关" :bordered="false">
          <!-- 化石燃料消耗合计 -->
          <a-col :span="6" class="fossilConsumptionSum">
            <a-form-model-item label="化石燃料消耗合计:">
              {{ this.FossilConsumptionSum }}
            </a-form-model-item>
          </a-col>
          <a-button type="primary" class="rightButton" @click="handleDownload(FossilConsumptionTable.data().columns[0].children, 'consumptionFossilList', '化石燃料消耗合计')">
            导出表格
          </a-button>
          <FossilConsumptionTable :consumption-fossil-list="consumptionFossilList" :loading="loadingFossil" />

          <!-- 化石燃料碳排放合计 -->
          <a-col :span="6" class="fossilConsumptionSum1">
            <a-form-model-item label="化石燃料碳排放合计:">
              {{ this.FossilEmissionsSum }}
            </a-form-model-item>
          </a-col>
          <a-button type="primary" class="rightButton1" @click="handleDownload(FossilEmissionsTable.data().columns[0].children, 'consumptionFossilList', '化石燃料碳排放合计')">
            导出表格
          </a-button>
          <FossilEmissionsTable :consumption-fossil-list="consumptionFossilList" :loading="loadingFossil" />
        </a-card>
      </a-row>
      <!-- 化石图表 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card title="碳排总量柱状图" :bordered="false">
            <FossilLine ref="FossilLineRef" :plant-id="plantId" :dimension="dimension" />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :bordered="false" :tab-list="FossilTabList" @tabChange="key => onTabChange(key, 'Fossil')">
            <FossilConsumptionPar v-if="FossilBtn == 'FossilConsumption'" ref="FossilConsumptionParRef" :plant-id="plantId" :dimension="dimension" />
            <FossilEmissionsPar v-else-if="FossilBtn == 'FossilEmission'" ref="FossilEmissionsParRef" :plant-id="plantId" :dimension="dimension" />
          </a-card>
        </a-col>
      </a-row>

      <!-- 购电表格 -->
      <a-row :gutter="16">
        <a-card title="净购入电使用相关" :bordered="false">
          <!-- 净购入电购入合计 -->
          <a-col :span="6" class="fossilConsumptionSum">
            <a-form-model-item label="净购入电购入合计:">
              {{ this.PowerPurchaseConsumptionSum }}
            </a-form-model-item>
          </a-col>
          <!-- 净购入电碳排放合计 -->
          <a-col :span="6" class="fossilConsumptionSum">
            <a-form-model-item label="净购入电碳排放合计:">
              {{ this.PowerPurchaseEmissionsSum }}
            </a-form-model-item>
          </a-col>
          <a-button type="primary" style="margin-left: 500px;" @click="handleDownload(PowerTable.data().columns, 'consumptionPowerPurchaseList', '净购入电碳排放合计')">
            导出表格
          </a-button>
          <PowerTable id="Table3" :consumption-power-purchase-list="consumptionPowerPurchaseList" :loading="loadingPowerPurchase" />
        </a-card>
      </a-row>
      <!-- 购电图表 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card title="碳排总量柱状图" :bordered="false">
            <PowerLine ref="PowerLineRef" :plant-id="plantId" :dimension="dimension" />
          </a-card>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import FossilConsumptionTable from './components/FossilConsumptionTable.vue'
import FossilEmissionsTable from './components/FossilEmissionsTable.vue'
import FossilLine from './components/FossilLine.vue'
import FossilConsumptionPar from './components/FossilConsumptionPar.vue'
import FossilEmissionsPar from './components/FossilEmissionsPar.vue'
import PowerTable from './components/PowerTable.vue'
import PowerLine from './components/PowerLine.vue'
import { codeToText } from '@/utils/cascader-address-options'
import moment from 'moment'
export default {
  name: 'CarbonAccounting',
  components: {
    FossilConsumptionTable,
    FossilEmissionsTable,
    FossilLine,
    FossilConsumptionPar,
    FossilEmissionsPar,
    PowerTable,
    PowerLine
  },
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      FossilConsumptionTable: FossilConsumptionTable,
      FossilEmissionsTable: FossilEmissionsTable,
      PowerTable: PowerTable,
      conditions: '按年查询',
      conditionList: [
        { id: 1, value: '按月查询' },
        { id: 2, value: '按年查询' }
      ],
      // 年限
      yearShowOne: false,
      dimension: {
        monthtime: null,
        yeartime: null,
        queryType: 2
      },

      // 化石数据
      consumptionFossilList: [],
      FossilConsumptionSum: null,
      FossilEmissionsSum: null,
      FossilBtn: 'FossilConsumption',
      FossilTabList: [
        { key: 'FossilConsumption', tab: '消耗' },
        { key: 'FossilEmission', tab: '排放' }
      ],

      // 购电数据
      consumptionPowerPurchaseList: [],
      PowerPurchaseConsumptionSum: null,
      PowerPurchaseEmissionsSum: null,

      // 表格加载中
      loadingFossil: false,
      loadingPowerPurchase: false,
      // 解析地址数字串工具
      codeToText,
      // 把管理员父传子过来的值赋给它用于渲染电厂信息 把普通用户通过接口查到的值赋给它用于同上
      plantData: {},
      // 查看当前详情的电厂id
      plantId: 0
    }
  },
  created() {
    this.queryDetails()
  },
  methods: {
    moment,
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
    selectChange() {
      this.dimension.yeartime = null
      this.dimension.monthtime = null
      if (this.conditions == '按年查询') {
        this.dimension.queryType = this.conditionList[1].id
      } else if (this.conditions == '按月查询') {
        this.dimension.queryType = this.conditionList[0].id
      }
    },
    // 年份
    // 弹出日历和关闭日历的回调
    openChangeOne(status) {
      //status是打开或关闭的状态
      if (status) {
        this.yearShowOne = true
      } else {
        this.yearShowOne = false
      }
    },
    // 得到年份选择器的值
    panelChangeOne(value) {
      this.dimension.yeartime = value
      this.yearShowOne = false
    },
    // 默认查询
    queryDetails() {
      if (this.detail != undefined) {
        this.plantData = this.detail
        this.plantId = this.plantData.plantId
        this.getFossilByPlantId()
        this.getPowerPurchaseByPlantId()
      }
    },
    // 条件查询
    conditionsQuery() {
      this.getFossilByPlantId()
      this.getPowerPurchaseByPlantId()
      if (this.$refs.FossilLineRef) this.$refs.FossilLineRef.getFossilLineDate()
      if (this.$refs.PowerLineRef) this.$refs.PowerLineRef.getPowerLineDate()
      if (this.FossilBtn == 'FossilConsumption') {
        if (this.$refs.FossilConsumptionParRef) this.$refs.FossilConsumptionParRef.getFossilConsumptionDate()
      } else if (this.FossilBtn == 'FossilEmission') {
        if (this.$refs.FossilEmissionsParRef) this.$refs.FossilEmissionsParRef.getFossilEmissionsDate()
      }
    },
    // 重置
    reset() {
      this.dimension.monthtime = null
      this.dimension.yeartime = null
      this.conditionsQuery()
    },
    // 饼图标签页切换回调函数
    onTabChange(key, type) {
      if (type == 'Fossil') {
        this.FossilBtn = key
      }
    },
    // 通过plantId查找化石data
    getFossilByPlantId() {
      this.loadingFossil = true
      this.FossilConsumptionSum = null
      this.FossilEmissionsSum = null
      this.$api.carbonEmissions
        .getFossilConsumptionEmissionListByPlantId({
          id: this.plantId,
          queryType: this.dimension.queryType,
          dimensionDate: this.dimension.yeartime,
          dimensionDateMth: this.dimension.monthtime
        })
        .then(res => {
          this.consumptionFossilList = res
          this.consumptionFossilList.forEach(item => {
            this.FossilConsumptionSum += item.carbonConsumption
            this.FossilEmissionsSum += item.carbonEmissions
          })
        })
        .finally(() => {
          if (this.FossilConsumptionSum != null && this.FossilEmissionsSum != null) {
            this.FossilConsumptionSum = this.FossilConsumptionSum.toFixed(2)
            this.FossilEmissionsSum = this.FossilEmissionsSum.toFixed(2)
          }
          this.loadingFossil = false
        })
    },

    // 通过plantId查找购电data
    getPowerPurchaseByPlantId() {
      this.loadingPowerPurchase = true
      this.PowerPurchaseConsumptionSum = null
      this.PowerPurchaseEmissionsSum = null
      this.$api.carbonEmissions
        .getPowerPurchaseConsumptionEmissionListByPlantId({
          id: this.plantId,
          queryType: this.dimension.queryType,
          dimensionDate: this.dimension.yeartime,
          dimensionDateMth: this.dimension.monthtime
        })
        .then(res => {
          this.consumptionPowerPurchaseList = res
          this.consumptionPowerPurchaseList.forEach(item => {
            this.PowerPurchaseConsumptionSum += item.consumption
            this.PowerPurchaseEmissionsSum += item.emissions
          })
        })
        .finally(() => {
          if (this.PowerPurchaseConsumptionSum != null && this.PowerPurchaseEmissionsSum != null) {
            this.PowerPurchaseConsumptionSum = this.PowerPurchaseConsumptionSum.toFixed(2)
            this.PowerPurchaseEmissionsSum = this.PowerPurchaseEmissionsSum.toFixed(2)
          }
          this.loadingPowerPurchase = false
        })
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
      // position: absolute;
      // z-index: 1;
      height: 50px;
      width: 100%;
      // border: 1px solid;
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
    position: relative;
    // right: 10%;
    // right: 10%;
    // border: 1px solid;
    left: 68%;
    margin-top: 25px;
    // bottom: 0;
  }
}
.twoRow {
  .timeBtn {
    position: absolute;
    left: 18%;
    bottom: 0;
    // width: 100%;
    // border: 1px solid;
  }
  .timeBtn1 {
    position: absolute;
    left: 43%;
    bottom: 0;
    // border: 1px solid;
  }
  .timeBtn2 {
    position: absolute;
    left: 68%;
    top: 20%;
  }
}
.rightButton {
  margin-left: 60%;
}
.rightButton1 {
  margin-top: 2%;
  margin-left: 60%;
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
.fossilConsumptionSum1 {
  margin-top: 2%;
  margin-left: 4%;
}
</style>
