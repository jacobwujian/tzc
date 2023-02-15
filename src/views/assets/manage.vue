<!-- 资产管理 -->
<template>
  <div>
    <router-view v-if="$route.name === 'assetsDetail'" />
    <c-page
      v-show="$route.name !== 'assetsDetail'"
      ref="base"
      :search-type="searchType"
      :columns="columns"
      :scroll="{ x:1300 }"
      :data="dataSource"
      :can-open="true"
      @fetch="fetch"
      @openModel="openModel"
    >
      <template
        slot="action"
        slot-scope="{record, index}"
      >
        <a-button
          v-if="record.flag === 1 && $auth('assetsCheck')"
          :key="index+'i'"
          type="link"
          @click="hexaio(record)"
        >
          清算
        </a-button>
        <span
          v-if="$auth('assetsDetail')"
          :key="index+'k'"
          class="cur-pointer"
          @click="$router.push(`${$cPath}/assets/detail/${record.id}`)"
        >
          详情
        </span>
        <a-button
          type="link"
          @click="showModal('edit', record)"
        >
          录入
        </a-button>
      </template>
    </c-page>
    <a-modal
      v-model="visible"
      title="核查提示"
      :width="700"
      on-ok="handleOk"
    >
      <pre>
      本系统为发电企业碳排方辅助管理平台，碳排核查请联系第三方碳排放核查机构做现场核查。

      企业进行温室气体排放核查有有助于：
      一、建立基线数据
      二、排放减量证据
      三、公平的减量交易
      四、参与注册计划
      五、企业环境报告书
      要具备完整性、透明性、公信力。
      六、企业营运风险管理

      企业一般核查流程如下图，请点击“详情”详细了解现场核查的具体要求。
      </pre>
      <img
        src="../../static/home/detail.png"
        alt="img"
        style="height: 400px;"
      >
      <template slot="footer">
        <a
          key="back"
          @click="openDetail()"
        >
          详情
        </a>
      </template>
    </a-modal>
    <a-modal
      v-model="modalVisible"
      :title="modalTitle"
      :width="600"
      :footer="null"
      :destroy-on-close="true"
    >
      <AssetsForm
        ref="accountForm"
        :detail="detail"
        :modal-name="modalName"
        @close="close"
      />
    </a-modal>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AssetsForm from './components/AssetsForm'
import {enterpriseType, flagType} from '@/utils/typeEnum'
import { codeToText } from '@/utils/cascader-address-options'

  const searchType = [
  {
    type: 'input',
    label: '机构名称',
    params: 'plantName'
  }, {
    type: 'select',
    label: '机构类型',
    params: 'plantType',
    data:enterpriseType,
    labelCol:{ span: 10 },
    wrapperCol: { span: 14 }
  }, {
    type: 'input',
    label: '年度',
    params: 'year'
  }
]
export default {
  components: {
    AssetsForm
  },
  data() {
    return{
      visible: false,
      modalVisible: false,
      detail: '',
      searchType,
      codeToText,
      modalName: '',
      names:{},
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle',
        plantId:1
      },
      // 表格数据
      dataSource: [
      ],
      columns: [
        {
          title: '序号',
          align: 'center',
          width: 50,
          scopedSlots: { customRender: 'no' }
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'plantName',
          width: 90
        },
        {
          title: '机构类型',
          align: 'center',
          dataIndex: 'plantType',
          scopedSlots: { customRender: 'plantType', type: 'select', data: enterpriseType },
          width: 90
        },
        {
          title: '所属地区',
          align: 'center',
          dataIndex: 'plantArea',
          scopedSlots: { customRender: 'plantArea', type: 'area' },
          width: 120
        },
        {
          title: '年度',
          align: 'center',
          dataIndex: 'year',
          width: 90
        },
        {
          title: '碳排总量',
          align: 'center',
          dataIndex: 'carbonEmission',
          width: 90
        },
        {
          title: '实际总配额量',
          align: 'center',
          dataIndex: 'actualQuota',
          width: 90
        },
        {
          title: '可交易配额量',
          align: 'center',
          dataIndex: 'tradeQuota',
          width: 90
        },
        {
          title: '清算状态',
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag', type: 'select', data: flagType },
          width: 90
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 90
        }
      ]
    }
  },
   computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    }),
    modalTitle() {
      if (this.modalName === 'edit') return '录入资产'
      else return ''
    },
    	columnsCustom() {
			return this.columns.filter(item => {
				return item.scopedSlots
			}).map(item => item.scopedSlots)
    }
  },
  created(){
  },
  methods:{
    openModel(){
      this.visible = true
    },
    openDetail(){
      window.open('http://www.tanpaifang.com/tanhecha/201601/1950145.html')
    },
    fetch(params){
      this.$api.assetManagement.assetManagement(params).then(res => {
       if(!res) res = {list: [], total: 0}
          this.dataSource = res.list
      this.fetchSuccess(res.total)
      }).finally(() => {
        if (this.$refs.base)
          this.$refs.base.fetchFinally()
        })
    },
    reset() {
      this.plantName = ''
      this.plantValue = undefined
      this.year=''
      this.fetch(params)
    },
    fetchSuccess(total) {
      this.pagination.total = total || 0
    },
    hexaio(data){
      data.createTime = new Date()
      data.plantId = this.$store.state.user.userInfo.plant_id
      this.$api.assetManagement.clearQuota({plantId:data.plantId,
      year:data.year}).then(res => {
        this.$message.success({ content: '清算成功!', duration: 2 })
this.fetch()
      })
    },
    showModal(type, record) {
      this.modalName = type
      this.detail = record
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

<style lang="less" scoped>
.detail {
  .contentOne {
    // border: 1px solid;
    padding-left: 20%;
  }
  .table {
    margin-top: 50px;
  }
  .twoRow {
      float: right;
      right: 15%;
      top: 5%;
    }
}
</style>
