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

const Colors = ['#3BA0FF', '#FFCF2C', '#FA6400', '#34BAAC']

export default {
  name: 'Rose',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'Rose'
    },
    className: {
      type: String,
      default: 'rose'
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
      const that = this
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: 0,
          top: 'center',
          data: this.labels,
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          formatter: function(name) {
            if (that.chartData && that.chartData.length) {
              for (const item of that.chartData) {
                if (name !== item.name) continue
                return (
                  `{name|${name}}{line|}{value|${item.percentage}%}`
                )
              }
            }
          },
          textStyle: {
            rich: {
              name: {
                padding: [0, 20, 0, 0],
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: 16,
                fontWeight: 400
              },
              line: {
                width: 1,
                height: 15,
                backgroundColor: '#D9D9D9'
              },
              value: {
                padding: [0, 0, 0, 10],
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: 16
              }
            }
          }
        },
        series: [
          {
            name: '绿色电力积分能源占比',
            type: 'pie',
            roseType: 'radius',
            radius: '60%',
            center: ['42%', '50%'],
            data: this.chartData,
            zlevel: 1,
            right: 120,
            label: {
              fontSize: 12,
              formatter: '{b}: {d}%',
              fontSize: 18,
              fontWeight: 400,
              color: '#000'
            },
            labelLine: {
              length: 10,
              length2: 0,
              showAbove: false
            },
            itemStyle: {
              color: function({ dataIndex }) {
                return Colors[dataIndex]
              }
            }
          }
        ]
      })
    }
  }
}
</script>
