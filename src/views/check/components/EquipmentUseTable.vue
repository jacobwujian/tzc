<template>
  <div class="EquipmentUseTable-container">
    <a-table size="middle" :columns="columns" :scroll="{ y: 'calc(100vh - 570px)' }" :bordered="true" :loading="loading" :data-source="equipmentUseList" :row-key="equipmentUseList => equipmentUseList.id" />
  </div>
</template>

<script>
export default {
  name: 'EquipmentUseTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 父传子接收数据
    equipmentUseList: {
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
          title: '设备的六氟化硫容量(千克:kg)',
          align: 'center',
          dataIndex: 'capacity'
        },
        {
          title: '设备的六氟化硫实际回收量(千克:kg)',
          align: 'center',
          dataIndex: 'recycle'
        },
        {
          title: '设备消耗六氟化硫(千克:kg)',
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
