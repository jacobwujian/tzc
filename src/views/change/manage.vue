<!-- 订单管理 -->
<template>
  <div class="">
    <router-view v-if="$route.name === 'changedetail'" />
    <c-page
      v-show="$route.name !== 'changedetail'"
      ref="base"
      :columns="columns"
      :scroll="{ x:1300 }"
      :data="data"
      :search-type="searchType"
      @fetch="fetch"
    >
      <template
        slot="action"
        slot-scope="{record}"
      >
        <span
          v-if="(record.status === 1||record.protocolStatus === 1)&&$auth('changeCheck')"
          class="cur-pointer"
          @click="showModal('review', record)"
        >
          审核
        </span>
        <span
          v-if="$auth('changeDetail')"
          class="cur-pointer"
          @click="$router.push(`${$cPath}/change/detail/${record.id}`)"
        >
          详情
        </span>
      </template>
    </c-page>
    <a-modal
      v-model="modalVisible"
      :title="modal.title"
      :width="1200"
      :footer="null"
      :destroy-on-close="true"
    >
      <component
        :is="modal.component"
        :id="id"
        :ref="modal.component"
        :form-type="modalName"
        @close="close"
        @fetch="fetch"
      />
    </a-modal>
  </div>
</template>

<script>
import {chainStatus, dealStatus, EnumMap, orderType, protocolStatus} from '@/utils/typeEnum'
import Detail from './detail'
export default {
  data() {
    return {
      modalVisible: false,
      modal: {
        title: '交易订单审核',
        component: Detail
      },
      id:'',
      modalName: 'review',
      searchType: [
        {
          type: 'input',
          params: 'purchaser',
          placeholder: '请输入',
          label: '买方'
        },
        {
          type: 'input',
          params: 'seller',
          placeholder: '请输入',
          label: '卖方'
        },
        {
          type: 'select',
          params: 'orderType',
          placeholder: '请选择',
          label: '订单类型',
          data: orderType
        },
        {
          type: 'select',
          params: 'protocolStatus',
          placeholder: '请选择',
          label: '磋商状态',
          data: protocolStatus
        },
        {
          type: 'select',
          params: 'orderStatus',
          placeholder: '请选择',
          label: '交易状态',
          data: dealStatus
        },
        {
          type: 'datePicker',
          params: 'create',
          placeholder: '请选择时间',
          label: '磋商时间'
        },
        {
          type: 'datePicker',
          params: 'trading',
          placeholder: '请选择时间',
          label: '交易时间'
        }
      ],
      columns: [
        {
          title: '序号',
          width: 55,
          scopedSlots: { customRender: 'no' }
        },
        {
          title: '交易数量',
          width: 100,
          dataIndex: 'tradeCount',
          scopedSlots: { customRender: 'precisionNum' }
        },
        {
          title: '交易单价',
          dataIndex: 'price',
          width: 80,
          scopedSlots: { customRender: 'precisionNum' }
        },
        {
          title: '磋商时间',
          width: 150,
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime', type: 'time' }
        },
        {
          title: '交易时间',
          width: 150,
          dataIndex: 'tradeTime',
          scopedSlots: { customRender: 'tradeTime', type: 'time' }
        },
        {
          title: '买方',
          width: 200,
          dataIndex: 'purchaser'
        },
        {
          title: '卖方',
          width: 200,
          dataIndex: 'seller'
        },
        {
          title: '订单类型',
          width: 120,
          dataIndex: 'orderType',
          scopedSlots: { customRender: 'orderType', type: 'select', data: orderType }
        },
        {
          title: '上链情况',
          width: 110,
          dataIndex: 'chainStatus',
          scopedSlots: { customRender: 'chainStatus', type: 'select', data: chainStatus }
        },
        {
          title: '磋商状态',
          width: 110,
          dataIndex: 'protocolStatus',
          scopedSlots: { customRender: 'protocolStatus', type: 'select', data: protocolStatus }
        },
        {
          title: '交易状态',
          width: 110,
          dataIndex: 'status',
          scopedSlots: { customRender: 'status', type: 'select', data: dealStatus }
        },
        {
          title: '操作',
          width: 150,
          key: 'operation',
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
      this.$api.exchange.getExchangeList(params)
        .then(res => {
          if(!res) res = {list: [], total: 0}
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
