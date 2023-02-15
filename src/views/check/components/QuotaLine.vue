<template>
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
export default {
  name: 'QuotaLine',
  props: {
    id: {
      type: String,
      default: ''
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

      quotaByMth: []
    }
  },

  mounted() {
    this.getCarbonQuotasLine()
  },
  methods: {
    getCarbonQuotasLine() {
      this.$api.carbonEmissions
        .getCarbonQuotasLine({
          id: this.plantId,
          queryType: this.dimension.queryType,
          dimensionDate: this.dimension.yeartime,
          dimensionDateMth: this.dimension.monthtime
        })
        .then(res => {
          this.quotaByMth = []
          for (const item of res) {
            if (item == null) {
              this.quotaByMth.push(0)
            } else {
              this.quotaByMth.push(item.quotaByMth)
            }
          }
          this.initChart(this.quotaByMth)
        })
    },

    initChart(quotaByMth) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'line'
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '实际配额量',
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
            data: quotaByMth,
            type: 'line'
          }
        ],

        // 提示框
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        }
        // 图例多种形式图表一起显示
        // legend: {
        //   data: ['消耗燃料总和', '二氧化碳排放总和']
        // },

        // series: [
        //   {
        //     name: '消耗燃料总和',
        //     type: 'bar',
        //     data: TotalFuelConsumption
        //   },
        //   {
        //     name: '二氧化碳排放总和',
        //     type: 'bar',
        //     data: DioxideEmissions
        //   }
        // ]
      })
    }
  }
}
</script>

<style></style>
