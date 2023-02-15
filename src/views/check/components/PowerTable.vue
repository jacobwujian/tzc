<template>
  <div class="PowerTable-container">
    <!-- :scroll="{ y: 'calc(100vh - 570px)' }" -->
    <a-table size="middle" :columns="columns" :loading="loading" :bordered="true" :pagination="false" :data-source="consumptionPowerPurchaseList" :row-key="consumptionPowerPurchaseList => consumptionPowerPurchaseList.mth" />
  </div>
</template>

<script>
export default {
  name: 'PowerTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 父传子接收数据
    consumptionPowerPurchaseList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          title: '年月',
          dataIndex: 'byYearMouth',
          align: 'center'
        },
        {
          title: '净购入电购入量',
          align: 'center',
          dataIndex: 'consumption'
        },
        {
          title: '净购入电碳排放量',
          align: 'center',
          dataIndex: 'emissions'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
