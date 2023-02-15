<template>
  <div>
    <a-spin
      tip="Loading..."
      :delay="1"
      :spinning="!canClick"
    >
      <div style="font-size: 20px;font-style: normal;padding-top: 20px;padding-left: 5%;">
        碳排放年月：<a-month-picker
          v-model="nowMonth"
          style="margin-left: 10%;"
          :allow-clear="false"
          :disabled-date="controlDate"
          @change="installData"
        />
        <a-button
          style="margin-left: 55%;"
          type="primary"
          :disabled="canSubmit"
          @click="submit"
        >
          提交
        </a-button>
        <a
          style="margin-left:10px;font-size:15px;color: #1890ff"
          @click="visible=true"
        >
          计算说明
        </a>
        <a-modal
          v-model="visible"
          title="计算说明"
          :width="1100"
          on-ok="handleOk"
        >
          <img
            src="../../../static/home/发电企业配额计算说明.png"
            alt="img"
          >
          <template slot="footer">
            <a-button
              key="back"
              @click="download"
            >
              下载说明文档
            </a-button>
          </template>
        </a-modal>
      </div>
      <CAddEditTable
        id="purseTable"
        title="电厂配额填报"
        :editable="editable"
        :columns="quotaColumns"
        :data="quotaData"
        :now-month="nowMonth"
        save-api="saveQuotaResult"
        count-api="quotaCalc"
        :model-data="quota"
        @installData="installQuotaTable"
        @addRow="addRow"
        @changeSelect="changeSelect"
      />
    </a-spin>
  </div>
</template>

<script>
import CAddEditTable from '@/components/base/c-add-edit-table'
import {unitType, coolingMethod, eleType} from '@/utils/typeEnum'
import moment from 'moment'
let objDeepCopy = function(source){
  let sourceCopy = {}
  for (let item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  return sourceCopy
}
export default {
  name: 'WriteLimit',
  components: {CAddEditTable},
  data() {
    return {
      canSubmit:false,
      canClick: true,
      editable: true,
      visible: false,
      quotaColumns: [
        {
          title: '序号',
          width: 65,
          scopedSlots: { customRender: 'no', canEdit: false }
        }, {
          title: '机组类型',
          width:140,
          ellipsis: false,
          dataIndex: 'unitType',
          canEdit: true,
          scopedSlots: { customRender: 'unitType', type: 'select', data: unitType, canEdit: true }
        }, {
          title: '冷却方式',
          ellipsis: false,
          width:100,
          dataIndex: 'coolingMethod',
          scopedSlots: { customRender: 'coolingMethod', type: 'select', data: coolingMethod, canEdit: true }
        }, {
          title: '发电类型',
          ellipsis: false,
          width:100,
          dataIndex: 'eleType',
          scopedSlots: { customRender: 'eleType', type: 'select', data: eleType, canEdit: true }
        }, {
          title: '供电量（MWh）',
          ellipsis: false,
          width: 100,
          dataIndex: 'gdQuantity',
          scopedSlots: { customRender: 'gdQuantity', type: 'num', min: 0, precision: 0, canEdit: true }
        }, {
          title: '供热量（GJ）',
          dataIndex: 'grQuantity',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'grQuantity', type: 'num', min: 0, precision: 0, canEdit: true }
        }, {
          title: '负荷（出力）系数（%）',
          dataIndex: 'loadQuantity',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'loadQuantity', type: 'num', min: 0, max:100, precision: 0, canEdit: true }
        }, {
          title: '供电基准值（t/MWh）',
          dataIndex: 'gdParam',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'gdParam', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '供热基准值（t/GJ）',
          dataIndex: 'grParam',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'grParam', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '负荷（出力）系数修正系数',
          dataIndex: 'loadFixParam',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'loadFixParam', type: 'num', max:100, min: 0, precision: 3, canEdit: false }
        }, {
          title: '冷却方式修正系数',
          dataIndex: 'coolingMethodParam',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'coolingMethodParam', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '供热量修正系数',
          dataIndex: 'grFixParam',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'grFixParam', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '实际配额量',
          dataIndex: 'quota',
          ellipsis: false,
          width: 100,
          scopedSlots: { customRender: 'quota', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '操作',
          dataIndex: 'action',
          width: 100,
          scopedSlots: { customRender: 'action', type: 'action', canEdit: false }
        }
      ],
      quotaData: [],
      quota: {
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        unitType: 1,
        coolingMethod: 1,
        eleType: 2,
        gdQuantity: 0,
        grQuantity: 0,
        loadQuantity: 100,
        gdParam: 0,
        grParam: 0,
        loadFixParam: 0,
        coolingMethodParam: 0,
        grFixParam: 0,
        quota: 0,
        carbon_emission: false,
        ym: '202101',
        calc_time: new Date()
      },
      targetOffset: undefined,
      nowMonth: moment(new Date().toLocaleDateString(), 'YYYY-MM')
    }
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2
  },
  created() {
    this.installData()
  },
  methods:{
    download() {
      window.open(`${window.location.origin}/2019-2020年全国碳排放权交易配额总量设定与分配实施方案（发电行业）.pdf`)
    },
    controlDate(e){
      return moment(new Date().toLocaleDateString(), 'YYYY-MM').isBefore(e)
    },
   installQuotaTable(){
     this.editable = true
     this.canSubmit =false
     this.quotaData.splice(0, this.quotaData.length)
     this.$api.emission.queryQuotaParam({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
          if (res.list&&res.list.length>0){
            this.quotaData.splice(0, this.quotaData.length)
            this.quotaData.push(...res.list.map(e => { e.ym=this.nowMonth.format('YYYYMM'); e.plantId=this.$store.state.user.userInfo.plant_id; return e }))
            if (this.quotaData[0].status === 2){
              this.$message.info('本月已填报！')
            }
          }
       this.canClick = true
        }
    ).catch(e => {
    })
  },
    initQuota(){
      unitType.forEach( e => {
        this.quota.id = e.value
        this.quota.fossilFuelType = e.value
        this.quotaData.push(objDeepCopy(this.quota))
      })
    },
    installData(){
      this.canClick = false
      this.installQuotaTable()
    },
    submit(){
      if (!this.canClick) return
     this.canClick = false
      let that = this

      let obj={
       plantId: this.$store.state.user.userInfo.plant_id,
       ym: this.nowMonth.format('YYYYMM'),
        plantQuotaParamVos: this.quotaData,
        plantType: 1
     }
     this.$api.emission.saveQuotaResult(obj).then(res => {
       this.$message.success({ content: '保存成功!', duration: 2 })
       this.installData()
       that.$api.warning.count().then(res => {
         that.$store.state.count = res
       })
     })
    },
    changeSelect(record, canEdit, index){
      if (record.unitType === 4){
        record.coolingMethod = 3
        if (canEdit[index]['coolingMethod']!==undefined){
          canEdit[index]['coolingMethod']=undefined
        }
      }else {
        if (canEdit[index]['coolingMethod']===undefined){
          canEdit[index]['coolingMethod']=false
        }
      }
      if (record.eleType === 1){
        record.grQuantity = 0
        if (canEdit[index]['grQuantity']!==undefined){
          canEdit[index]['grQuantity']=undefined
        }
        if (canEdit[index]['loadQuantity']===undefined){
          canEdit[index]['loadQuantity']=false
        }
        record.loadFixParam = 0
      }else if (record.eleType === 2){
        record.loadQuantity = 100
        if (canEdit[index]['loadQuantity']!==undefined){
          canEdit[index]['loadQuantity']=undefined
        }
        if (canEdit[index]['grQuantity']===undefined){
          canEdit[index]['grQuantity']=false
        }
      }
    },
    addRow(record){
      this.quotaData = [...this.quotaData, objDeepCopy(record)]
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

</style>