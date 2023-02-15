<template>
  <div>
    <a-spin tip="Loading..." :delay="1" :spinning="spinning">
      <a-form-model layout="inline" class="formModle">
        <a-row class="twoRow">
          <a-col :span="6" class="oneCol">
            <a-form-model-item label="年月">
              <a-date-picker v-model="dimension.yeartime" :default-value="moment(new Date(), 'YYYY')" mode="year" placeholder="请选择您要查询的年份" format="YYYY" :open="yearShowOne" @openChange="openChangeOne" @panelChange="panelChangeOne" />
            </a-form-model-item>
          </a-col>

          <a-col :span="3" class="twoCol">
            <a-space>
              <a-button type="primary" class="queryButton" @click="conditionsQuery">
                查询
              </a-button>
              <a-button class="resetButton" @click="reset">
                重置
              </a-button>
            </a-space>
          </a-col>
        </a-row>

        <a-row>
          <a-col>
            <!-- <a-card :bordered="false" :tab-list="cardTabList" :active-tab-key="cardChange" @tabChange="key => onTabChange(key, 'change')">
            <DealLine v-if="cardChange == 'deal'" ref="DealLineRef" :plant-id="plantId" :dimension="dimension" />
            <ConsultationLine v-else-if="cardChange == 'consultation'" ref="ConsultationLineRef" :plant-id="plantId" :dimension="dimension" />
          </a-card> -->

            <a-card :bordered="false" title="交易情况">
              <!-- :plant-id="plantId" -->
              <DealLine ref="DealLineRef" :dimension="dimension" />
            </a-card>
            <a-card :bordered="false" title="磋商情况">
              <!-- :plant-id="plantId" -->
              <ConsultationLine ref="ConsultationLineRef" :dimension="dimension" />
            </a-card>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import DealLine from './components/dealLine.vue'
import ConsultationLine from './components/consultationLine.vue'
import moment from 'moment'
export default {
  components: {
    DealLine,
    ConsultationLine
  },
  data() {
    return {
      spinning: false,
      moment,
      // cardChange: 'deal',
      // cardTabList: [
      //   { key: 'deal', tab: '交易' },
      //   { key: 'consultation', tab: '磋商' }
      // ],
      // plantId: 0,
      dimension: {
        yeartime: null
      },
      yearShowOne: false
    }
  },
  // created() {
  // this.conditionsQuery()
  // },
  methods: {
    // onTabChange(key, type) {
    //   this.cardChange = key
    // },
    reset() {
      this.dimension.yeartime = null
      this.conditionsQuery()
    },
    // getPlantId() {
    //   this.$api.user
    //     .accountDetail()
    //     .then(res => {
    //       this.plantId = res.plant_id
    //     })
    //     .finally(() => {
    //       this.conditionsQuery()
    //     })
    // },
    conditionsQuery() {
      this.spinning = true
      if (this.$refs.DealLineRef) this.$refs.DealLineRef.getdealLine()
      if (this.$refs.ConsultationLineRef) this.$refs.ConsultationLineRef.getConsultationLine()
      this.colseSpin()

      // if (this.cardChange == 'deal') {
      //   this.$refs.DealLineRef.getdealLine()
      // } else if (this.cardChange == 'consultation') {
      //   this.$refs.ConsultationLineRef.getConsultationLine()
      // }
    },
    colseSpin() {
      const that = this
      setTimeout(() => {
        that.spinning = false
      }, 1700)
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
    }
  }
}
</script>

<style lang="less" scoped>
.oneCol {
  left: 20%;
}
.twoCol {
  position: absolute;
  bottom: 0;
  left: 65%;
}
</style>
