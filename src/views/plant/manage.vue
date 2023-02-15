<!--  -->
<template>
  <div>
    <c-page
      ref="base"
      excel-name="机构信息"
      :can-export="true"
      :search-type="searchType"
      :columns="columns"
      :scroll="{ x:1300 }"
      :bordered="true"
      :data="list"
      @fetch="fetch"
    >
      <template
        slot="action"
        slot-scope="{record}"
      >
        <a-button
          v-if="record.status === 0 && $auth('plantCheck')"
          type="link"
          @click="showModal('review', record)"
        >
          审核
        </a-button>
        <a-button
          v-if="$auth('plantDetail')"
          type="link"
          @click="showModal('view', record)"
        >
          详情
        </a-button>
        <a-button
          v-if="(record.status === 1 || record.status === 2) && $auth('plantEdit')"
          type="link"
          @click="showModal('edit', record)"
        >
          修改
        </a-button>
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
        :id="Number(detail.id)"
        :ref="modal.component"
        :form-type="modalName"
        :org-type-val="detail.type"
        @close="close"
      />
    </a-modal>
  </div>
</template>

<script>
import Detail from './components/Detail'
import Form from './components/Form'
import { plantTypeT, checkStatus, orgTypes, chainStatus, EnumMap, plantType } from '@/utils/typeEnum'

const searchType = [
  {
    type: 'input',
    label: '机构名称',
    params: 'plantName'
  }, {
    type: 'select',
    label: '机构类型',
    params: 'plantType',
    data: plantTypeT
  }, {
    type: 'select',
    label: '审核状态',
    params: 'status',
    data: checkStatus
  }
]

const columns = [
  {
    title: '序号',
    width: 55,
    scopedSlots: { customRender: 'no' }
  }, {
    title: '机构名称',
    width:150,
    dataIndex: 'plantName'
  }, {
    title: '企业信用代码',
    width:150,
    dataIndex: 'plantLicense'
  }, {
    title: '联系人',
    dataIndex: 'contact'
  }, {
    title: '联系方式',
    width: 120,
    dataIndex: 'phone'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime', type: 'time' }
  }, {
    title: '机构类型',
    dataIndex: 'plantType',
    scopedSlots: { customRender: 'plantType', type: 'select', data: plantTypeT }
  }, {
    title: '上链情况',
    dataIndex: 'chainStatus',
    scopedSlots: { customRender: 'chainStatus', type: 'select', data: chainStatus }
  }, {
    title: '审核状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status', type: 'select', data: checkStatus }
  }, {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    Detail,
    Form
  },
  data() {
    return {
      checkStatus,
      searchType,
      list: [],
      columns,
      modalName: '', // view- 详情 review- 审核 edit- 修改
      detail: '', // 选中数据detail
      modalVisible: false
    }
  },
  computed: {
    modal() {
      const titleInfo = EnumMap(orgTypes, this.detail.type)

      let obj = {
        title: '',
        component: ''
      }

      if (this.modalName === 'view') {
        obj.title = '机构详情'
        obj.component = 'Detail'
      }
      if (this.modalName === 'review') {
        obj.title = `审核机构信息`
        obj.component = 'Form'
      }
      if (this.modalName === 'edit') {
        obj.title = `修改机构信息`
        obj.component = 'Form'
      }

      return obj
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 查询table data
     * @param {Object} params 查询参数
     */
    fetch(params) {
      this.$api.plant.findPlant(params)
        .then(res => {
          if(!res) res = {list: [], total: 0}
          const { list, total } = res
          if (Array.isArray(list)) this.list = list
          if (this.$refs.base)
          this.$refs.base.fetchSuccess(total)
        })
        .finally(() => {
          if (this.$refs.base)
          this.$refs.base.fetchFinally()
        })
    },
    /**
     * 弹窗open
     * @param {String} type 操作类型
     * @param {String} detail 该条数据detail
     */
    showModal(type, detail) {
      this.modalName = type
      this.detail = detail
      this.modalVisible = true
    },
    close(isFetch = false) {
      this.modalVisible = false
      if (isFetch)
        if (this.$refs.base)
        this.$refs.base.fetch()
    }
  }
}
</script>
<style lang='less' scoped>
</style>