<template>
  <div>
    <router-view v-if="$route.name === 'quotaDetail'" />
    <div v-show="$route.name !== 'quotaDetail'">
      <a-form-model layout="inline" class="manage">
        <!-- 条件查询 -->
        <a-row :gutter="16" class="conditionsOne">
          <a-col :span="8">
            <a-form-model-item label="机构名称:" prop="plantName">
              <a-input v-model="queryConditions.plantName" placeholder="请输入机构名称" allow-clear />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="行业类别:" prop="plantValue">
              <a-select v-model="queryConditions.plantValue" style="width: 200px" placeholder="请选择行业类别" allow-clear>
                <a-select-option v-for="item in typeList" :key="item.value" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-model-item label="所属地区:" prop="plantArea">
              <a-cascader v-model="queryConditions.plantArea" :options="areaOptions" allow-clear />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-model-item label="年度:" prop="yeartime">
              <a-date-picker v-model="queryConditions.yeartime" mode="year" placeholder="请选择您要查询的年份" format="YYYY" :open="yearShowOne" @openChange="openChangeOne" @panelChange="panelChangeOne" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <!-- 查询按钮 -->
        <a-row class="buttonRow">
          <a-col class="buttonCol">
            <a-space>
              <a-button type="primary" @click="query">
                查询
              </a-button>
              <a-button @click="reset">
                重置
              </a-button>
            </a-space>
          </a-col>
        </a-row>

        <!-- 表格 -->
        <a-table class="table" size="middle" :loading="loading" :row-key="dataSource => dataSource.id" :columns="columns" :bordered="true" :data-source="dataSource" :pagination="ipagination" @change="handleTableChange">
          <template slot="action" slot-scope="text, record">
            <a-button type="link" :loading="quotaLoading" @click="showModal(record.id)">
              配额
            </a-button>
            <a-button type="link" @click="$router.push(`${$cPath}/quota/detail/${record.id}`)">
              详情
            </a-button>
          </template>
        </a-table>

        <!-- 配额展示 -->
        <a-modal v-model="modalVisible" :destroy-on-close="true">
          <a-form-model layout="inline">
            <a-form-model-item label="配额:" prop="quota">
              <a-input v-model="quota" placeholder="请输入配额量" allow-clear />
            </a-form-model-item>
          </a-form-model>

          <template slot="footer">
            <a-button key="back" @click="close">
              取消
            </a-button>
            <a-button key="submit" type="primary" @click="handleOk">
              保存
            </a-button>
          </template>
        </a-modal>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { EnumMap } from '@/utils/typeEnum'
import { codeToText, ZJoptions } from '@/utils/cascader-address-options'
export default {
  data() {
    return {
      areaOptions: ZJoptions,
      EnumMap,
      codeToText,
      loading: false,
      quotaLoading: false,
      quotaId: null,
      quota: null,
      // 控制详情页弹出
      modalVisible: false,
      // 类型下拉框值
      typeList: [
        { value: 1, name: '火电' },
        { value: 2, name: '水电' },
        { value: 3, name: '核电' },
        { value: 4, name: '风电' },
        { value: 5, name: '热电联产' }
      ],
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
      },
      queryConditions: {
        plantName: '',
        plantValue: undefined,
        // plantArea: null,
        yeartime: undefined
      },
      yearShowOne: false,

      // 表格数据
      dataSource: [],
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          },
          width: 50
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'plantName',
          width: 75
        },
        {
          title: '行业类别',
          align: 'center',
          dataIndex: 'plantType',
          width: 80
        },
        {
          title: '所属地区',
          align: 'center',
          dataIndex: 'plantArea',
          width: 90
        },
        {
          title: '年度',
          align: 'center',
          dataIndex: 'year',
          width: 90
        },
        {
          title: '当前年度配额',
          align: 'center',
          dataIndex: 'annual',
          width: 90
        },
        {
          title: '碳排总量',
          align: 'center',
          dataIndex: 'scarbonEmission',
          width: 90
        },
        {
          title: '已核销碳排总量',
          align: 'center',
          dataIndex: 'snuclearSales',
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
  created() {
    this.query()
  },
  methods: {
    // 弹窗
    showModal(id) {
      this.modalVisible = true
      this.quotaId = id
    },
    close() {
      this.modalVisible = false
    },
    handleOk() {
      this.$api.quota
        .distributeQuota({
          plantId: this.quotaId,
          quota: this.quota
        })
        .then(res => {
          if (res) {
            this.$message.success('配额成功')
          }
        })
        .finally(() => {
          this.modalVisible = false
          this.quotaId = null
          this.quota = null
        })
    },
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

      // 地区
      // let area = ''
      // if (this.queryConditions.plantArea != null) {
      //   area = this.queryConditions.plantArea.join(',')
      // }
      // 年度
      let yearTime = ''
      if (this.queryConditions.yeartime != null) {
        yearTime = this.$dayjs(this.queryConditions.yeartime.format('YYYY'))._i
      } else {
        yearTime = new Date().getFullYear()
      }
      // 查询条件
      let form = {
        plantName: this.queryConditions.plantName,
        plantType: this.queryConditions.plantValue,
        // plantArea: area,
        year: yearTime
      }

      this.$api.quota
        .getQuotaManageList(form)
        .then(res => {
          this.dataSource = res.list
          this.dataSource.forEach(item => {
            if (item.plantType == 1) {
              item.plantType = '火电'
            } else if (item.plantType == 2) {
              item.plantType = '水电'
            } else if (item.plantType == 3) {
              item.plantType = '核电'
            } else if (item.plantType == 4) {
              item.plantType = '风电'
            } else if (item.plantType == 5) {
              item.plantType = '热电联产'
            }
            // 地址
            if (item.plantArea != null) {
              item.plantArea = codeToText(item.plantArea)
            }
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
      // this.queryConditions.plantArea = null
      this.queryConditions.yeartime = undefined
      this.query()
    },
    // 年份
    // 弹出日历和关闭日历的回调
    openChangeOne(status) {
      //status是打开或关闭的状态
      if (status) {
        this.yearShowOne = true
      } else {
        this.yearShowOne = false
      }
    },
    // 得到年份选择器的值
    panelChangeOne(value) {
      this.queryConditions.yeartime = value
      this.yearShowOne = false
    }
  }
}
</script>

<style lang="less" scoped>
.manage {
  .conditionsOne {
    // border: 1px solid;
    padding-left: 10%;
  }
  .buttonRow {
    // border: 1px solid;
    height: 60px;
  }
  .buttonRow {
    .buttonCol {
      // border: 1px solid;
      position: absolute;
      right: 12%;
      bottom: 0;
    }
  }
  .table {
    margin-top: 40px;
  }
}
</style>
