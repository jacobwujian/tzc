<!-- 交易管理 -->
<template>
  <div class="">
    <router-view v-if="$route.name === 'dealdetail'" />
    <c-page v-show="$route.name !== 'dealdetail'" ref="base" :columns="columns" :scroll="{ x: 1300 }" :data="data" :search-type="searchType" @fetch="fetch">
      <template slot="action" slot-scope="{ record }">
        <span v-if="$auth('dealDetail')" class="cur-pointer" @click="$router.push(`${$cPath}/deal/detail/${record.id}`)">
          查看详情
        </span>
      </template>
    </c-page>
    <a-modal v-model="modalVisible" :title="modal.title" :width="1200" :footer="null" :destroy-on-close="true">
      <component :is="modal.component" :id="id" :ref="modal.component" :form-type="modalName" @close="close" @fetch="fetch" />
    </a-modal>
  </div>
</template>

<script>
import { plantType } from '@/utils/typeEnum'
import Detail from './detail'
export default {
  data() {
    return {
      modalVisible: false,
      modal: {
        title: '交易订单审核',
        component: Detail
      },
      id: '',
      modalName: 'review',
      searchType: [
        {
          type: 'input',
          params: 'plantName',
          placeholder: '请输入',
          label: '机构名称'
        },
        {
          type: 'select',
          params: 'type',
          placeholder: '请输入',
          label: '行业类别',
          data: plantType
        },
        {
          type: 'area',
          params: 'plantArea',
          placeholder: '请选择地区',
          label: '所属地区'
        }
      ],
      columns: [
        {
          title: '序号',
          width: 55,
          scopedSlots: { customRender: 'no' }
        },
        {
          title: '机构名称',
          width: 260,
          dataIndex: 'plantName'
        },
        {
          title: '行业类别',
          width: 180,
          dataIndex: 'type',
          scopedSlots: { customRender: 'type', type: 'select', data: plantType }
        },
        {
          title: '所属地区',
          width: 250,
          dataIndex: 'plantArea',
          scopedSlots: { customRender: 'plantArea', type: 'area' }
        },
        {
          title: '本年度配额(吨:t)',
          width: 250,
          dataIndex: 'annual',
          scopedSlots: { customRender: 'precisionNum' }
        },
        {
          title: '预计可交易量(吨:t)',
          width: 250,
          dataIndex: 'canChange',
          scopedSlots: { customRender: 'precisionNum' }
        },
        {
          title: '操作',
          key: 'operation',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    fetch(params) {
      this.$api.plant
        .findPlantChange(params)
        .then(res => {
          console.log(res)
          if (!res) res = { list: [], total: 0 }
          this.data = res.list
          if (this.$refs.base)
          this.$refs.base.fetchSuccess(res.total)
        })
        .finally(() => {
          if (this.$refs.base)
          this.$refs.base.fetchFinally()
        })
    },
    close() {
      this.modalVisible = false
      if (this.$refs.base)
      this.$refs.base.fetch()
    },
    showModal(type, detail) {
      this.modalName = type
      this.modalVisible = true
      this.id = detail.id
    }
  }
}
</script>
<style lang="less" scoped></style>
