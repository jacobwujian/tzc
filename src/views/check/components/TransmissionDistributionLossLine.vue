<template>
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
import resize from '@/mixins/resize'
export default {
  name: 'TransmissionDistributionLossLine',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'TransmissionDistributionLossLine'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    plantId: {
      type: Number,
      default: 0
    },
    dimension: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 图表
      chart: null,
      // 燃料总和
      TotalFuelConsumption: [],
      // 二氧化碳总和
      DioxideEmissions: []
    }
  },
  mounted() {
    this.getElectricLossLineData()
  },
  methods: {
    getElectricLossLineData() {
      this.$api.carbonEmissions
        .getElectricLossLine({
          id: this.plantId,
          queryType: this.dimension.queryType,
          dimensionDate: this.dimension.yeartime,
          dimensionDateMth: this.dimension.monthtime
        })
        .then(res => {
          this.TotalFuelConsumption = []
          this.DioxideEmissions = []
          for (const item of res.data) {
            if (item == null) {
              this.TotalFuelConsumption.push(null)
              this.DioxideEmissions.push(null)
            } else {
              this.TotalFuelConsumption.push(item.totalFuelConsumption)
              this.DioxideEmissions.push(item.dioxideEmissions)
            }
          }
          this.initChart(this.TotalFuelConsumption, this.DioxideEmissions)
        })
    },

    initChart(TotalFuelConsumption, DioxideEmissions) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        // 提示框
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        // 图例多种形式图表一起显示
        legend: {
          data: ['消耗燃料总和', '二氧化碳排放总和']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            // 指示器类型 阴影
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '消耗燃料',
            // min: 0,
            // max: 250,
            // 强制设置坐标轴分割间隔
            // interval: 50,
            // 刻度标签的内容格式器
            axisLabel: {
              formatter: '{value} t'
            }
          }
        ],
        series: [
          {
            name: '消耗燃料总和',
            type: 'bar',
            data: TotalFuelConsumption
          },
          {
            name: '二氧化碳排放总和',
            type: 'bar',
            data: DioxideEmissions
          }
        ]
      })
    }
  }
}
</script>

<style></style>
