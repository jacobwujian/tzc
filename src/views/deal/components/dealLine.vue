<template>
  <div>
    <!-- <a-spin tip="Loading..." :delay="1" :spinning="spinning"> -->
    <a-button class="detailsBtn" type="link" @click="$router.push(`/orderManagement`)">
      查看交易详情
    </a-button>
    <div :id="id" :style="{ width, height }" />
    <!-- </a-spin> -->
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
import resize from '@/mixins/resize'
export default {
  name: 'DealLine',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'dealLine'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    // plantId: {
    //   type: Number,
    //   default: 0
    // },
    dimension: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 图表
      chart: null,
      solds: [],
      buys: []
      // spinning: Boolean
    }
  },
  mounted() {
    this.getdealLine()
  },
  methods: {
    getdealLine() {
      // this.spinning = true
      this.$api.deal
        .selectAmountSoldLine({
          // plantId: this.plantId,
          dimensionYear: this.dimension.yeartime
        })
        .then(res => {
          this.solds = []
          this.buys = []
          for (const item of res.soldList) {
            if (item == null) {
              this.solds.push(null)
            } else {
              this.solds.push(item.count)
            }
          }
          for (const item of res.buyList) {
            if (item == null) {
              this.buys.push(null)
            } else {
              this.buys.push(item.count)
            }
          }
        })
        .finally(() => {
          this.initChart(this.solds, this.buys)
          // this.spinning = false
        })
    },

    initChart(solds, buys) {
      let doc = document.getElementById(this.id)
      if(doc){
        this.chart = echarts.init(doc)
      }else {
        return
      }

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
        legend: {
          data: ['售出量', '购入量']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: ''
          }
        ],
        series: [
          {
            name: '售出量',
            type: 'bar',
            data: solds
          },
          {
            name: '购入量',
            type: 'bar',
            data: buys
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detailsBtn {
  z-index: 99;
  border: 1px solid;
  position: absolute;
  right: 10%;
}
</style>
