<template>
  <div
    :id="id"
    :class="className"
    :style="{ width, height }"
  />
</template>

<script>
import echarts from '@/plugins/echarts'
import resize from '@/mixins/resize'

export default {
  name: 'VerticalBar',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'VerticalBar'
    },
    className: {
      type: String,
      default: 'vertical-bar'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return{
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
      this.$nextTick(() => {
        this.chart.dispose()
        this.chart = null
        this.initChart()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      let that = this
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: that.labels,
          axisLabel: {
            color: 'rgba(0, 0, 0, .65)',
            margin: 15
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#D9D9D9'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#D9D9D9'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, .65)'
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: that.values,
            type: 'bar',
            barWidth: 23,
            barCategoryGap: 31,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#86FFF2' },
                  { offset: 1, color: '#1F69FF' }
                ]
              }
            },
            label: {
              show: true,
              position: ['-50%', -26],
              color: '#000',
              fontSize: 14,
              formatter: function({ value }) {
                return value
              }
            }
          }
        ]
      })
    }
  }
}
</script>
