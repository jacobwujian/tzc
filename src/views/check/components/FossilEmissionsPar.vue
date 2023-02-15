<template>
  <div>
    <div :id="id" :style="{ width, height }" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
import resize from '@/mixins/resize'
export default {
  name: 'FossilEmissionsPar',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'FossilEmissionsPar'
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
    // 日期
    dimension: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,

      // 各燃料消耗总和
      FossilEmissionsList: [],
      // 各燃料名称
      FossilNames: []
    }
  },
  mounted() {
    this.getFossilEmissionsDate()
  },
  methods: {
    // 获取化石消耗饼图数据
    getFossilEmissionsDate() {
      this.FossilEmissionsList = []
      this.FossilNames = []
      this.$api.carbonEmissions
        .getFossilEmissionsPar({
          id: this.plantId,
          queryType: this.dimension.queryType,
          dimensionDate: this.dimension.yeartime,
          dimensionDateMth: this.dimension.monthtime
        })
        .then(res => {
          res.forEach(item => {
            if (item.value != 0) {
              this.FossilEmissionsList.push(item)
              this.FossilNames.push(item.name)
            }
          })
          // 开始生成图表
          this.initChart(this.FossilEmissionsList, this.FossilNames)
        })
    },
    // 饼图
    initChart(FossilEmissionsList, FossilNames) {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: FossilNames
        },
        series: [
          {
            name: '燃料类型',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: FossilEmissionsList,
            color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#FFA500', '#696969', '#32CD32', '#8B008B', '#F0E68C', '#D2691E', '#B22222', '#228B22', '#FFB6C1', '#191970	']
          }
        ]
      })
    }
  }
}
</script>

<style></style>
