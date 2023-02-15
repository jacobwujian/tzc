<template>
  <div class="FossilConsumptionTable-container">
    <!-- :scroll="{ y: 'calc(100vh - 570px)' }" -->
    <a-table size="middle" :columns="columns" :bordered="true" :pagination="false" :loading="loading" :data-source="consumptionFossilList" :row-key="consumptionFossilList => consumptionFossilList.mthId" />
  </div>
</template>

<script>
export default {
  name: 'FossilConsumptionTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 父传子接收数据
    consumptionFossilList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          title: '化石燃料消耗情况',
          children: [
            {
              title: '年月',
              dataIndex: 'month',
              align: 'center'
            },
            {
              title: '燃煤',
              align: 'center',
              dataIndex: 'coalConsumption'
            },
            {
              title: '原油',
              align: 'center',
              dataIndex: 'crudeOilConsumption'
            },
            {
              title: '燃料油',
              align: 'center',
              dataIndex: 'fuelOilConsumption'
            },
            {
              title: '汽油',
              align: 'center',
              dataIndex: 'gasolineConsumption'
            },
            {
              title: '煤油',
              align: 'center',
              dataIndex: 'keroseneConsumption'
            },
            {
              title: '柴油',
              align: 'center',
              dataIndex: 'dieselConsumption'
            },
            {
              title: '液化石油气',
              align: 'center',
              dataIndex: 'liquefiedPetroleumGasConsumption'
            },
            {
              title: '炼厂干气',
              align: 'center',
              dataIndex: 'refineryDryGasConsumption'
            },
            {
              title: '天然气',
              align: 'center',
              dataIndex: 'naturalGasConsumption'
            },
            {
              title: '焦炉煤气',
              align: 'center',
              dataIndex: 'cokeOvenGasConsumption'
            },
            {
              title: '高炉煤气',
              align: 'center',
              dataIndex: 'blastFurnaceGasConsumption'
            },
            {
              title: '转炉煤气',
              align: 'center',
              dataIndex: 'converterGasConsumption'
            },
            {
              title: '其他煤气',
              align: 'center',
              dataIndex: 'otherGasConsumption'
            },
            {
              title: '消耗总量',
              align: 'center',
              dataIndex: 'carbonConsumption'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
