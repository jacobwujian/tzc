<template>
  <div class="QuotaTable-container">
    <!-- :scroll="{ y: 'calc(100vh - 570px)' }" -->
    <a-table class="carTable" :row-key="quotaTableDataSource => quotaTableDataSource.id" :columns="columns" size="middle" :loading="loading" :bordered="true" :data-source="quotaTableDataSource" :pagination="false" />
  </div>
</template>

<script>
export default {
  name: 'QuotaTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 父传子接收数据
    quotaTableDataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 表格表头
      columns: [
        {
          title: '年月',
          dataIndex: 'yearMth',
          align: 'center'
        },
        {
          title: '供电量（MWh）',
          align: 'center',
          dataIndex: 'supply'
        },
        {
          title: '供热量（GJ）',
          align: 'center',
          dataIndex: 'heat'
        },
        {
          title: '实际配额量',
          align: 'center',
          dataIndex: 'quota'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
