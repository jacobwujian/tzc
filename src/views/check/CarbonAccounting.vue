<template>
  <!-- 碳排核算 -->
  <div class="CarbonAccounting-container">
    <router-view v-if="$route.name == ''" />

    <a-form-model layout="inline" class="formModle">
      <a-row :gutter="[20, 20]" class="oneRow">
        <a-col :span="10">
          <a-form-model-item label="机构名称:" prop="plantName">
            <a-input v-model="queryConditions.plantName" placeholder="请输入机构名称" allow-clear />
          </a-form-model-item>
        </a-col>

        <a-col :span="10">
          <a-form-model-item label="机构类型:" prop="plantValue">
            <a-select v-model="queryConditions.plantValue" style="width: 200px" placeholder="请选择机构类型" allow-clear>
              <a-select-option v-for="item in typeList" :key="item.value" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- 按钮 -->
      <a-row class="twoRow">
        <a-col>
          <a-space>
            <a-button type="primary" :disabled="loading" class="queryButton" @click="query">
              查询
            </a-button>
            <a-button class="resetButton" :disabled="loading" @click="reset">
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table class="carTable" :row-key="dataSource => dataSource.id" :columns="columns" size="middle" :loading="loading" :bordered="true" :data-source="dataSource" :pagination="ipagination" @change="handleTableChange">
        <template slot="action" slot-scope="text, record">
          <a-button type="link" @click="showModal(record)">
            详情
          </a-button>
        </template>
      </a-table>

      <!-- 详情展示页 -->
      <!-- :title="modal.title" -->
      <a-modal v-model="modalVisible" :width="1650" :footer="null" :destroy-on-close="true" @close="close">
        <a-card :bordered="false" :tab-list="cardTabList" :active-tab-key="cardChange" @tabChange="key => onTabChange(key, 'change')">
          <component :is="modal.component" v-if="cardChange == 'carbonEmissions'" :ref="modal.component" :detail="Object(detail)" />
          <QuotaDetails v-else-if="cardChange == 'quota'" :detail="Object(detail)" />
        </a-card>
      </a-modal>
    </a-form-model>
  </div>
</template>

<script>
import DetailsCarbon from './DetailsCarbon.vue'
import QuotaDetails from './QuotaDetails.vue'
import DetailsCarbonGrid from './DetailsCarbonGrid.vue'
import { codeToText } from '@/utils/cascader-address-options'
import { plantTypeT } from '@/utils/typeEnum'

export default {
  name: 'CarbonAccounting',
  components: {
    DetailsCarbon,
    QuotaDetails,
    DetailsCarbonGrid
  },
  data() {
    return {
      cardChange: 'carbonEmissions',
      cardTabList: [
        { key: 'carbonEmissions', tab: '碳排放详情' },
        { key: 'quota', tab: '实际配额详情' }
      ],
      // -------------------
      codeToText,
      // 表格加载中
      loading: false,
      // 控制详情页弹出
      modalVisible: false,
      // 选中的数据
      detail: '',

      plantModalType: '',

      // 点击查询将要发送的值
      queryConditions: {
        plantName: '',
        plantValue: undefined
      },
      // 类型下拉框值
      typeList: plantTypeT,
      // 用于接收后台传来数据并渲染表格
      dataSource: [],

      // 表格表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          },
          width: 30
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'plantName',
          width: 125
        },
        {
          title: '机构类型',
          align: 'center',
          dataIndex: 'plantType',
          width: 60
        },
        {
          title: '所属地区',
          align: 'center',
          dataIndex: 'area',
          width: 110
        },
        {
          title: '年度',
          align: 'center',
          dataIndex: 'year',
          width: 75
        },
        {
          title: '实际配额总量(吨:t)',
          align: 'center',
          dataIndex: 'actualQuota',
          width: 95
        },
        {
          title: '碳排放总量(吨:t)',
          align: 'center',
          dataIndex: 'carbonEmission',
          width: 95
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 30
        }
      ],

      // 分页
      ipagination: {
        current: 1,
        pageNum: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return `第 ${range[0]} 条至 ${range[1]} 条记录 , 共 ${total} 条`
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      }
    }
  },

  computed: {
    // 按需显示
    modal() {
      let obj = {
        title: '',
        component: ''
      }

      if (this.plantModalType == plantTypeT[0].name) {
        obj.title = '机构碳核算详情'
        obj.component = 'DetailsCarbon'
      } else if (this.plantModalType == plantTypeT[1].name) {
        obj.title = '机构碳核算详情'
        obj.component = 'DetailsCarbonGrid'
      }

      return obj
    }
  },
  created() {
    this.query()
  },

  methods: {
    onTabChange(key, type) {
      this.cardChange = key
    },
    // ________________________
    //分页
    handleTableChange(pagination) {
      this.ipagination = pagination
      this.query()
    },
    // 查询
    query(arg) {
      this.loading = true
      // 分页参数
      if (arg === 1) {
        this.ipagination.current = 1
        this.ipagination.pageNum = 1
      }
      this.$api.carbonEmissions
        .getPowerPlant(this.queryConditions)
        .then(res => {
          this.dataSource = res.list
          this.dataSource.forEach(item => {
            item.create_time = this.formatDate(item.create_time)
            item.area = codeToText(item.area)
            plantTypeT.forEach(item1 => {
              if (item1.value == item.plantType) {
                item.plantType = item1.name
              }
            })
          })
          this.ipagination.total = res.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 重置
    reset() {
      this.queryConditions.plantName = ''
      this.queryConditions.plantValue = undefined
      this.query()
    },
    // 弹窗
    showModal(detail) {
      this.cardChange = 'carbonEmissions'
      if (detail.plantType == plantTypeT[0].name) {
        this.plantModalType = plantTypeT[0].name
        this.detail = detail
        this.modalVisible = true
      } else if (detail.plantType == plantTypeT[1].name) {
        this.plantModalType = plantTypeT[1].name
        this.detail = detail
        this.modalVisible = true
      }
    },
    close() {
      this.modalVisible = false
    },
    // 时间戳转换
    formatDate: function(value) {
      // 时间戳转换日期格式方法
      if (value == null) {
        return ''
      } else {
        let date = new Date(value)
        let y = date.getFullYear() // 年
        let MM = date.getMonth() + 1 // 月
        MM = MM < 10 ? '0' + MM : MM
        let d = date.getDate() // 日
        d = d < 10 ? '0' + d : d
        let h = date.getHours() // 时
        h = h < 10 ? '0' + h : h
        let m = date.getMinutes() // 分
        m = m < 10 ? '0' + m : m
        let s = date.getSeconds() // 秒
        s = s < 10 ? '0' + s : s
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
      }
    }
  }
}
</script>

<style lang="less" scoped>
.CarbonAccounting-container {
  margin-top: 30px;
}
.CarbonAccounting-container {
  .formModle {
    .oneRow {
      width: 100%;
      line-height: 50px;
      padding-left: 20%;
      // border: 1px solid;
    }
    .twoRow {
      float: right;
      right: 15%;
      top: 5%;
    }
    .carTable {
      margin-top: 80px;
      margin-left: 6%;
      width: 85%;
    }
  }
}
.twoRow {
  .queryButton {
    width: 80px;
    height: 35px;
  }
  .resetButton {
    width: 80px;
    height: 35px;
  }
}
</style>
