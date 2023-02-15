<template>
  <!-- 各省机构碳排总量与实际配额总量情况统计 -->
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
export default {
  name: 'CarbonAndQuotaByTopTen',
  props: {
    id: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'threeCategories-Bar'
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
    plantName() {
      return this.chartData.map(item => item.plantName)
    },
    carbonEmission() {
      return this.chartData.map(item => item.carbonEmission)
    },
    actualQuota() {
      return this.chartData.map(item => item.actualQuota)
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
          data: ['碳排总量', '实际配额总量']
        },
        grid: {
          left: '90px',
          bottom: '110px'
        },
        xAxis: [
          {
            type: 'category',
            data: this.plantName,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 35
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value} t'
            }
          }
        ],
        series: [
          {
            name: '碳排总量',
            type: 'bar',
            data: this.carbonEmission
          },
          {
            name: '实际配额总量',
            type: 'bar',
            data: this.actualQuota
          }
        ]
      })
    }
  }
}
</script>
