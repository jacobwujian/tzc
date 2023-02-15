<template>
  <div class="TransmissionDistributionLossTable-container">
    <a-table size="middle" :columns="columns" :scroll="{ y: 'calc(100vh - 570px)' }" :bordered="true" :loading="loading" :data-source="electricLossList" :row-key="electricLossList => electricLossList.id" />
  </div>
</template>

<script>
export default {
  name: 'TransmissionDistributionLossTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 父传子接收数据
    electricLossList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          title: '年度',
          dataIndex: 'year',
          align: 'center'
        },
        {
          title: '电厂上网电量(兆瓦时:MWh)',
          align: 'center',
          dataIndex: 'online'
        },
        {
          title: '自外省输入电量(兆瓦时:MWh)',
          align: 'center',
          dataIndex: 'input'
        },
        {
          title: '向外省输出电量(兆瓦时:MWh)',
          align: 'center',
          dataIndex: 'output'
        },
        {
          title: '售电量(兆瓦时:MWh)',
          align: 'center',
          dataIndex: 'sd'
        },
        {
          title: '输配电损耗电量(兆瓦时:MWh)',
          align: 'center',
          dataIndex: 'consumption'
        },
        {
          title: '碳排放量(吨:t)',
          align: 'center',
          dataIndex: 'emissions'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
