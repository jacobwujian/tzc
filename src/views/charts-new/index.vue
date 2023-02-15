<template>
  <div class="charts-wrap">
    <div class="loginTime">
      上次刷新时间：{{ this.refreshTime }}
      <a-button type="link" @click="refreshChart">
        刷新图表
      </a-button>
    </div>
    <a-row :gutter="[16, 0]" class="charts-row">
      <a-col :span="12">
        <a-card title="各省机构注册统计" class="card" :bordered="false">
          <a-button class="bigView" type="link" @click="showModal(0)">
            <img class="FullBtn" src="../../static/home/全屏按钮.png" alt="全屏" />
          </a-button>
          <LocalRegistrationStatistics :chart-data="companyData" />
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="各机构本年度碳排总量前十情况统计" class="card" :bordered="false">
          <a-button class="bigView" type="link" @click="showModal(1)">
            <img class="FullBtn" src="../../static/home/全屏按钮.png" alt="全屏" />
          </a-button>
          <CarbonAndQuotaByTopTen :id="CarbonAndQuotaByTopTen" :chart-data="CarbonQuotaTopTenData" />
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="各省机构碳排总量与实际配额总量情况统计" class="card" :bordered="false">
          <a-button class="bigView" type="link" @click="showModal(2)">
            <img class="FullBtn" src="../../static/home/全屏按钮.png" alt="全屏" />
          </a-button>
          <CarbonEmissionAndActualQuota :id="CarbonAndQuota" :chart-data="CarbonQuotaData" />
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="各月份碳排量与实际配额情况统计" class="card" :bordered="false">
          <a-button class="bigView" type="link" @click="showModal(3)">
            <img class="FullBtn" src="../../static/home/全屏按钮.png" alt="全屏" />
          </a-button>
          <MonthlyEmissionConsumptionStatistics :chart-data="MonthlyEmissionsConsumption" />
        </a-card>
      </a-col>
    </a-row>

    <a-modal v-model="modalVisible" :title="modalTitle" :width="1800" :footer="null" :destroy-on-close="true">
      <LocalRegistrationStatistics v-if="modalCpt == 0" :id="ModalNameRef" :width="widthRef" :height="heightRef" :chart-data="companyData" />
      <CarbonAndQuotaByTopTen v-else-if="modalCpt == 1" :id="ModalNameRef" :width="widthRef" :height="heightRef" :chart-data="CarbonQuotaTopTenData" />
      <CarbonEmissionAndActualQuota v-else-if="modalCpt == 2" :id="ModalNameRef" :width="widthRef" :height="heightRef" :chart-data="CarbonQuotaData" />
      <MonthlyEmissionConsumptionStatistics v-else-if="modalCpt == 3" :id="ModalNameRef" :width="widthRef" :height="heightRef" :chart-data="MonthlyEmissionsConsumption" />
    </a-modal>
  </div>
</template>

<script>
import LocalRegistrationStatistics from './components/LocalRegistrationStatistics.vue'
import MonthlyEmissionConsumptionStatistics from './components/MonthlyEmissionConsumptionStatistics.vue'
import CarbonEmissionAndActualQuota from './components/CarbonEmissionAndActualQuota.vue'
import CarbonAndQuotaByTopTen from './components/CarbonAndQuotaByTopTen.vue'

import { ProvincesAndCities } from '@/utils/cascader-address-options'
export default {
  name: 'Charts',
  components: {
    LocalRegistrationStatistics,
    MonthlyEmissionConsumptionStatistics,
    CarbonEmissionAndActualQuota,
    CarbonAndQuotaByTopTen
  },
  data() {
    return {
      modalCpt: null,
      modalTitle: '',
      ModalNameRef: 'ModalNameRef',
      widthRef: '100%',
      heightRef: '720px',
      modalVisible: false,
      ProvincesAndCities,
      companyData: [],
      MonthlyEmissionsConsumption: [],
      CarbonQuotaData: [],
      CarbonQuotaTopTenData: [],
      refreshTime: [],
      CarbonAndQuotaByTopTen: 'CarbonAndQuotaByTopTen',
      CarbonAndQuota: 'CarbonAndQuota'
    }
  },
  created() {
    this.getCompanyData()
    this.getMonthlyEmissionsConsumption()
    this.getCarbonEmissionAndActualQuota()
    this.getCarbonAndQuotaByTopTen()
    this.refreshTime = this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    showModal(e) {
      if (e == 0) {
        this.modalCpt = e
        this.modalTitle = '各省机构注册统计'
      } else if (e == 1) {
        this.modalCpt = e
        this.modalTitle = '各机构本年度碳排总量前十情况统计'
      } else if (e == 2) {
        this.modalCpt = e
        this.modalTitle = '各省机构碳排总量与实际配额总量情况统计'
      } else if (e == 3) {
        this.modalCpt = e
        this.modalTitle = '各月份碳排量与实际配额情况统计'
      }
      this.modalVisible = true
    },
    close() {
      this.modalVisible = false
    },
    // 刷新图表
    refreshChart() {
      this.companyData = []
      this.MonthlyEmissionsConsumption = []
      this.CarbonQuotaData = []
      this.CarbonQuotaTopTenData = []
      this.refreshTime = []
      this.getCompanyData()
      this.getMonthlyEmissionsConsumption()
      this.getCarbonEmissionAndActualQuota()
      this.getCarbonAndQuotaByTopTen()
      this.refreshTime = this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    getCompanyData() {
      this.$api.chartsNew.companyTotal().then(res => {
        this.companyData = []
        res.forEach(item => {
          if (item.area != null) {
            this.companyData.push({
              name: item.area && ProvincesAndCities(item.area),
              value: item.companyCount
            })
          }
        })
      })
    },

    getMonthlyEmissionsConsumption() {
      this.$api.chartsNew.getMonthlyEmissionsConsumption().then(res => {
        res.forEach(item => {
          if (item != null) {
            this.MonthlyEmissionsConsumption.push({
              consumption: item.consumption,
              emission: item.emission
            })
          } else {
            this.MonthlyEmissionsConsumption.push({
              consumption: null,
              emission: null
            })
          }
        })
      })
    },

    getCarbonEmissionAndActualQuota() {
      this.$api.chartsNew.CarbonEmissionAndActualQuota().then(res => {
        res.forEach(item => {
          if (item.area != null) {
            this.CarbonQuotaData.push({
              area: item.area && ProvincesAndCities(item.area),
              carbonEmission: item.carbonEmission,
              actualQuota: item.actualQuota
            })
          }
        })
      })
    },

    getCarbonAndQuotaByTopTen() {
      this.$api.chartsNew.CarbonAndQuotaByTopTen().then(res => {
        res.forEach(item => {
          this.CarbonQuotaTopTenData.push({
            plantName: item.plantName,
            carbonEmission: item.carbonEmission,
            actualQuota: item.actualQuota
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.FullBtn {
  width: 20px;
  height: 20px;
}
.card {
  height: 385px;
}
.monthLine {
  width: 202%;
}
.bigView {
  z-index: 99;
  position: absolute;
  right: 0;
}
.charts-wrap {
  position: relative;
  /deep/.ant-card-head {
    height: 25px;
    line-height: 25px;
    padding-top: 24px;
    border-bottom: 0;
    color: #000;
    font-size: 18px;
    font-weight: 400;
    .ant-card-head-title {
      padding: 0;
    }
  }
  /deep/.ant-card-body {
    padding: 0 24px 18px;
  }
  .charts-row {
    > .ant-col {
      margin-bottom: 25px;
    }
  }
  .loginTime {
    height: 30px;
    position: absolute;
    top: -35px;
    right: 0;
    z-index: 1;
  }
}
</style>
