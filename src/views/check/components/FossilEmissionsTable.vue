<template>
  <div class="FossilEmissionsTable-container">
    <!-- :scroll="{ y: 'calc(100vh - 570px)' }" -->
    <a-table size="middle" :row-key="consumptionFossilList => consumptionFossilList.mthId" :pagination="false" :columns="columns" :bordered="true" :data-source="consumptionFossilList" :loading="loading" />
  </div>
</template>

<script>
export default {
  name: 'FossilEmissionsTable',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100px'
    },
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
          title: '化石燃料排放情况',
          children: [
            {
              title: '年月',
              dataIndex: 'month',
              align: 'center'
            },
            {
              title: '燃煤',
              align: 'center',
              dataIndex: 'coalEmissions'
            },
            {
              title: '原油',
              align: 'center',
              dataIndex: 'crudeOilEmissions'
            },
            {
              title: '燃料油',
              align: 'center',
              dataIndex: 'fuelOilEmissions'
            },
            {
              title: '汽油',
              align: 'center',
              dataIndex: 'gasolineEmissions'
            },
            {
              title: '煤油',
              align: 'center',
              dataIndex: 'keroseneEmissions'
            },
            {
              title: '柴油',
              align: 'center',
              dataIndex: 'dieselEmissions'
            },
            {
              title: '液化石油气',
              align: 'center',
              dataIndex: 'liquefiedPetroleumGasEmissions'
            },
            {
              title: '炼厂干气',
              align: 'center',
              dataIndex: 'refineryDryGasEmissions'
            },
            {
              title: '天然气',
              align: 'center',
              dataIndex: 'naturalGasEmissions'
            },
            {
              title: '焦炉煤气',
              align: 'center',
              dataIndex: 'cokeOvenGasEmissions'
            },
            {
              title: '高炉煤气',
              align: 'center',
              dataIndex: 'blastFurnaceGasEmissions'
            },
            {
              title: '转炉煤气',
              align: 'center',
              dataIndex: 'converterGasEmissions'
            },
            {
              title: '其他煤气',
              align: 'center',
              dataIndex: 'otherGasEmissions'
            },
            {
              title: '碳排放总量',
              align: 'center',
              dataIndex: 'carbonEmissions'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
