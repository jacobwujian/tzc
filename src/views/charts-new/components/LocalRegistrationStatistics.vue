<template>
  <!-- 各省机构注册统计 -->
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
export default {
  name: 'LocalRegistrationStatistics',
  props: {
    id: {
      type: String,
      default: 'LocalRegistrationStatistics'
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
    labels() {
      return this.chartData.map(item => item.name)
    },
    values() {
      return this.chartData.map(item => item.value)
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
          trigger: 'axis'
        },
        grid: {
          left: '60px'
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: this.labels,
          axisLabel: {
            margin: 10,
            interval: 0,
            rotate: 25
          },
          inverse: true,
          axisLine: {
            show: true
          },
          axisTick: {
            show: true,
            alignWithLabel: true
          }
        },
        series: [
          {
            data: this.values,
            type: 'bar',
            itemStyle: {
              color: '#5AD8A6'
            }
            // label: {
            //   show: true,
            //   position: 'right'
            // }
          }
        ]
      })
    }
  }
}
</script>
