<template>
  <!-- 全国本年度各月份碳排放消耗情况统计统计 -->
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
import resize from '@/mixins/resize'
export default {
  name: 'MonthlyEmissionConsumptionStatistics',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'MonthlyEmissionConsumptionStatistics'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '335px'
    },
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    consumption() {
      return this.chartData.map(item => item.consumption)
    },
    emission() {
      return this.chartData.map(item => item.emission)
    }
  },
  watch: {
    chartData() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['碳排量', '实际配额量']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // scale: true,
            axisLabel: {
              formatter: '{value} t'
            }
          }
        ],
        series: [
          {
            name: '碳排量',
            type: 'bar',
            data: this.emission
          },
          {
            name: '实际配额量',
            type: 'bar',
            data: this.consumption
          }
        ]
      })
    }
  }
}
</script>

<style></style>
