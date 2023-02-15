<template>
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
          <a-form-model-item label="实际配额总量:">
            {{ plantData.actualQuota }}
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row class="twoRow1">
        <a-col :span="2" class="queryBtn">
          <a-space>
            <a-button type="primary" :disabled="spinning" class="queryButton" @click="conditionsQuery">
              查询
            </a-button>
            <a-button class="resetButton" :disabled="spinning" @click="reset">
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form-model>
    <!-- tip="Loading..." -->
    <a-spin :delay="1" :spinning="spinning">
      <a-form-model layout="inline">
        <a-row>
          <a-card title="实际配额相关" :bordered="false">
            <a-col :span="6" class="fossilConsumptionSum">
              <a-form-model-item label="供电量合计:">
                {{ this.supplySum }}
              </a-form-model-item>
            </a-col>

            <a-col :span="6" class="fossilConsumptionSum1">
              <a-form-model-item label="供热量合计:">
                {{ this.heatingLoadSum }}
              </a-form-model-item>
            </a-col>
            <a-button type="primary" class="rightButton" @click="handleDownload(QuotaTable.data().columns, 'quotaTableDataSource', '配额合计')">
              导出表格
            </a-button>
            <!-- :loading="loading" -->
            <QuotaTable :quota-table-data-source="quotaTableDataSource" />
          </a-card>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-card title="各月实际配额量统计" :bordered="false">
              <!-- :plant-id="plantId" -->
              <QuotaLine :id="lineID.QuotaLine" ref="QuotaLineRef" :plant-id="this.detail.plantId" :dimension="dimension" />
            </a-card>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import moment from 'moment'
import QuotaTable from './components/QuotaTable.vue'
import QuotaLine from './components/QuotaLine.vue'
export default {
  components: {
    QuotaTable,
    QuotaLine
  },
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      lineID: {
        QuotaLine: 'QuotaLine'
      },
      QuotaTable: QuotaTable,
      supplySum: null,
      heatingLoadSum: null,
      spinning: false,
      quotaTableDataSource: [],
      plantData: {},
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
      }
    }
  },
  created() {
    this.queryDetails()
  },
  methods: {
    moment,
    queryDetails() {
      if (this.detail != undefined) {
        this.plantData = this.detail
        this.getCarbonQuotas()
      }
    },
    conditionsQuery() {
      this.getCarbonQuotas()
      if (this.$refs.QuotaLineRef) this.$refs.QuotaLineRef.getCarbonQuotasLine()
    },
    getCarbonQuotas() {
      this.spinning = true
      this.supplySum = null
      this.heatingLoadSum = null
      this.$api.carbonEmissions
        .getCarbonQuotas({
          id: this.plantData.id,
          queryType: this.dimension.queryType,
          dimensionDate: this.dimension.yeartime,
          dimensionDateMth: this.dimension.monthtime
        })
        .then(res => {
          this.quotaTableDataSource = res
          this.quotaTableDataSource.forEach(item => {
            item.yearMth = item.year + '年' + item.mth + '月'
            this.supplySum += item.supply
            this.heatingLoadSum += item.heat
          })
        })
        .finally(() => {
          if (this.supplySum != null && this.heatingLoadSum != null) {
            this.supplySum = this.supplySum.toFixed(2)
            this.heatingLoadSum = this.heatingLoadSum.toFixed(2)
          }
          this.spinning = false
        })
    },
    reset() {
      this.dimension.monthtime = null
      this.dimension.yeartime = null
      this.conditionsQuery()
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
    selectChange() {
      this.dimension.yeartime = null
      this.dimension.monthtime = null
      if (this.conditions == '按年查询') {
        this.dimension.queryType = this.conditionList[1].id
      } else if (this.conditions == '按月查询') {
        this.dimension.queryType = this.conditionList[0].id
      }
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
.carTable {
  margin-top: 80px;
}
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
  margin-left: 35%;
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
