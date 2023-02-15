<template>
  <div>
    <a-spin
      tip="Loading..."
      :delay="1"
      :spinning="!canClick"
    >
      <div style="font-style: normal;padding-top: 20px;padding-left: 5%;">
        预警类型
        <a-select
          v-model="params.warningType"
          style="width: 200px; align-content: center;text-align: center;margin-left: 20px;margin-right: 50px"
          allow-clear
          placeholder="请选择预警类型"
        >
          <a-select-option
            v-for="item in warningType"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        预警状态
        <a-select
          v-model="params.flag"
          style="width: 200px; align-content: center;text-align: center;margin-left: 20px;margin-right: 50px"
          allow-clear
          placeholder="请选择预警状态"
        >
          <a-select-option
            v-for="item in warningStatus"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        生成时间
        <a-month-picker
          v-model="params.month"
          style="width: 200px; align-content: center;text-align: center;margin-left: 20px;margin-right: 50px"
          allow-clear
          :disabled-date="controlDate"
        />
        <a-button
          type="primary"
          style="margin-right: 25px"
          @click="installTable"
        >
          查询
        </a-button>
        <a-button
          type="primary"
          :disabled="selectedRows.length === 0"
          @click="sureTrue"
        >
          确认无异常
        </a-button>
      </div>
      <br>
      <br>
      <a-table
        :row-selection="rowSelection"
        :columns="columnsFormat"
        :data-source="data"
        :row-key="record=>record.id"
      >
        <template
          v-for="colCustom in columnsCustom"
          :slot="colCustom.customRender"
          slot-scope="text,record,index"
        >
          <div :key="colCustom.customRender">
            <template v-if="colCustom.customRender === 'no'">
              {{ index+1 }}
            </template>
            <span
              v-else-if="colCustom.type === 'time'"
              :key="record.id"
              :title="text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss')"
            >
              {{ text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss') }}
            </span>
            <template v-else>
              <span
                class="spanOver"
                :style="colCustom.type==='select'&&colCustom.customRender === 'flag'&&text === 1?'color: red':'color: black'"
              >{{ colCustom.type === 'select' ?EnumMap(colCustom.data, text):text }}</span>
            </template>
          </div>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script>

import { warningInfoType, warningStatus, EnumMap} from '@/utils/typeEnum'
import moment from 'moment'
let objDeepCopy = function(source){
  let sourceCopy = {}
  for (let item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  return sourceCopy
}
export default {
  name: 'AccountingReport',
  data() {
    return {
      EnumMap:EnumMap,
      canSubmit:false,
      canClick: true,
      editable: true,
      visible: false,
      warningType: warningInfoType,
      warningStatus:warningStatus,
      params: {
        warningType: undefined,
        flag: undefined,
        month: undefined
      },
      targetOffset: undefined,
      selectedRows: [],
      selectedRowKeys: [],
      Columns: [
        {
          title: '序号',
          width: 35,
          scopedSlots: { customRender: 'no'}
        }, {
          title: '预警类型',
          width:100,
          dataIndex: 'warningType',
          scopedSlots: { customRender: 'warningType', type: 'select', data:warningInfoType }
        }, {
          title: '预警状态',
          dataIndex: 'flag',
          width: 100,
          scopedSlots: { customRender: 'flag', type: 'select', data:warningStatus}
        }, {
          title: '预警内容',
          dataIndex: 'content',
          width: 300,
          ellipsis: false,
          align: 'false',
          scopedSlots: { customRender: 'content', type: 'text'}
        }, {
          title: '碳排年月',
          dataIndex: 'updateTime',
          width: 70,
          scopedSlots: { customRender: 'content', type: 'text'}
        }, {
          title: '生成时间',
          dataIndex: 'createTime',
          width: 120,
          scopedSlots: { customRender: 'e', type: 'time' }
        }
      ],
      data: [],
      nowMonth: moment(new Date().toLocaleDateString(), 'YYYY-MM')
    }
  },
  computed: {
    columnsCustom() {
      return this.Columns.filter(item => {
        return item.scopedSlots
      }).map(item => item.scopedSlots)
    },
  columnsFormat() {
    return this.Columns.map(it => {
      const obj = {
        ...it,
        align: it.align || 'center',
        ellipsis: it.ellipsis === undefined ? true : it.ellipsis
      }
      if(it.scopedSlots && it.scopedSlots.type === 'time' && !it.hasOwnProperty('width')) obj.width=160
      return obj
    })
  },
  rowSelection(){
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      getCheckboxProps: record => ({
        props: {
          disabled: record.flag !== 1||record.warningType === 99,
          name: record.name
        }
      }),
      selectedRowKeys: this.selectedRowKeys
    }
  }
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2
  },
  created() {
    this.installTable()
  },
  methods:{
    controlDate(e){
      if (new Date().getMonth() === e._d.getMonth()){
        return false
      }
      return moment(new Date().toLocaleDateString(), 'YYYY-MM').isBefore(e)
    },
    installTable(){
      const that = this
    this.canClick = false
    this.$api.warning.getWarningInfoList({...this.params, updateTime:this.params.month?this.params.month.format('YYYYMM'):undefined}).then(res => {
      this.data=res.list
      setTimeout( () => { that.canClick = true }, 1000)
        }
    )
    },
    sureTrue(){
      let that = this
      this.$confirm({
        title: '确认信息',
        content: '是否要确认信息无异常？',
        okText: '确认',
        cancelText: '取消',
        onOk:() => that.update()
      })
    },
  update(){
    let that = this
    this.$api.warning.updatePlantWarningInfo(this.selectedRows).then(res => {
      this.selectedRows = []
      this.selectedRowKeys =[]
      this.installTable()
      that.$api.warning.count().then(res => {
        that.$store.state.count = res
      })
    })
  }
  }
}
</script>

<style scoped>
.rightTop{
  width: 150px;
  height: 300px;
  font-size: 20px;
  display: inline-block;
  position: fixed;
  top: 150px;
  right: 80px;
}
/deep/ .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
  text-align: center;
}

</style>