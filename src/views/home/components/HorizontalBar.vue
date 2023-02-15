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
  name: 'HorizontalBar',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'HorizontalBar'
    },
    className: {
      type: String,
      default: 'horizonta-bar'
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
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        grid: {
          top: 0,
          left: '5%',
          right: '5%',
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            fontSize: 16,
            color: 'rgba(0, 0, 0, .45)'
          }
        },
        yAxis: {
          type: 'category',
          data: this.labels,
          axisLabel: {
            color: 'rgba(0, 0, 0, .6)',
            fontSize: 16
          },
          inverse: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#D9D9D9'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: this.values,
            type: 'bar',
            barWidth: 21,
            barCategoryGap: 24,
            itemStyle: {
              color: function({ dataIndex }) {
                const colors = {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#153896' },
                    { offset: 1, color: '#309ca7' }
                  ]
                }

                switch (dataIndex) {
                  case 0:
                    colors.colorStops[0].color = '#FF7171'
                    colors.colorStops[1].color = '#FBAC8F'
                    break
                  case 1:
                    colors.colorStops[0].color = '#FDD48F'
                    colors.colorStops[1].color = '#FFAA65'
                    break
                  case 2:
                    colors.colorStops[0].color = '#FFC862'
                    colors.colorStops[1].color = '#FFEC9A'
                    break
                  default:
                    colors.colorStops[0].color = '#00CADF'
                    colors.colorStops[1].color = '#BBFFB1'
                    break
                }

                return colors
              }
            },
            label: {
              show: true,
              position: 'right',
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
