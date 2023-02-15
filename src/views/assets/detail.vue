<!-- 资产详情 -->
<template>
  <div>
    <a-form-model
      layout="inline"
      class="detail"
    >
      <a-row
        :gutter="24"
        class="contentOne"
      >
        <a-col :span="6">
          <a-form-model-item label="机构名称:">
            {{ names.plantName }}
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="机构类型:">
            {{ EnumMap(enterpriseType,names.plantType) }}
          </a-form-model-item>
        </a-col>
        <a-col :span="9">
          <a-form-model-item label="所属地区:">
            {{ codeToText(names.plantArea) }}
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row
        :gutter="24"
        class="contentOne"
      >
        <a-col :span="6">
          <a-form-model-item label="年度:">
            {{ names.year }}
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="碳排总量:">
            {{ names.carbonEmission }}
          </a-form-model-item>
        </a-col>
        <a-col :span="9">
          <a-form-model-item label="实际总配额量:">
            {{ names.actualQuota }}
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row
        :gutter="24"
        class="contentOne"
      >
        <a-col :span="6">
          <a-form-model-item label="本年度预发配额:">
            {{ names.reserveQuota }}
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="上一年度结余配额:">
            {{ names.balanceQuota }}
          </a-form-model-item>
        </a-col>
        <a-col :span="9">
          <a-form-model-item label="可交易配额量:">
            {{ names.tradeQuota }}
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row
        :gutter="16"
        class="contentOne"
      >
        <a-col :span="6">
          <a-form-model-item label="清算状态:">
            {{ EnumMap(flagType,names.flag) }}
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-divider />
    </a-form-model>
    <a-table
      class="table"
      :row-key="dataSource => dataSource.ym+'i'"
      :columns="columns"
      :bordered="true"
      :pagination="false"
      :data-source="dataSource"
    />
    <br>
    <div class="back">
      <a-button
        type="primary"
        @click="$router.go(-1)"
      >
        返回
      </a-button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {formFlag} from '@/utils/means'
import {assetsStatus, enterpriseType, EnumMap, flagType } from '@/utils/typeEnum'
import { codeToText } from '@/utils/cascader-address-options'
export default {
   props: {
    id:{
      type: String,
      default: ''
    },
    formType:{
      type: String,
      default: 'view'
    },
    ym:{
      type: String,
      default: ''
    }
  },
   data() {
    return {
      EnumMap,
      enterpriseType,
      formFlag,
      flagType,
      assetsStatus,
      codeToText,
      names:{},
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      },
      // 表格数据
      dataSource: [
      ],
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
          title: '年月',
          align: 'center',
          dataIndex: 'ym',
          width: 90
        },
        {
          title: '碳排放量',
          align: 'center',
          dataIndex: 'carbonEmission',
          width: 90
        },
        {
          title: '实际配额量',
          align: 'center',
          dataIndex: 'consumption',
          width: 90
        },
        {
          title: '生成时间',
          align: 'center',
          dataIndex: 'createTime',
          width: 90
        }
      ]
    }
  },
   computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    })
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch(){
        this.$api.assetManagement.assetManagement({plantId:this.id}).then(res => {
       if(!res) res = {list: [], total: 0}
        this.names =res.list[0]
      })
      this.$api.assetManagement.assetsDetail({plantId: this.id}).then(res => {
          this.dataSource = res.list
}).finally(() => {
        })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .contentOne {
    padding-left: 20%;
  }
  .table {
    margin-top: 50px;
  }
}
.back {
  width: 100%;
  text-align: center;
}
</style>
