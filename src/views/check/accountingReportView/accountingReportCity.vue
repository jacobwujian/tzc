<template>
  <div>
    <a-spin
      tip="Loading..."
      :delay="1"
      :spinning="!canClick"
    >
      <div style="font-size: 20px;font-style: normal;padding-top: 20px;padding-left: 5%;">
        碳排放年：
        <a-date-picker
          v-model="nowMonth"
          mode="year"
          style="margin-left: 10%;"
          :allow-clear="false"
          format="YYYY"
          :open="openYear"
          @openChange="openChange"
          @panelChange="panelChangeOne"
        />
        <a-button
          style="margin-left: 45%;"
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
          :width="1330"
          on-ok="handleOk"
        >
          <img
            src="../../../static/home/dwjs.png"
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
        id="equipmentTable"
        title="使用六氟化硫设备修理与退役过程生产的排放"
        :editable="editable"
        :columns="equipmentColumns"
        :data="equipmentData"
        :now-month="nowMonth"
        save-api="saveFuelResult"
        count-api="equipmentECalc"
        :model-data="xiuLi"
        @changeSelect="changeSelect"
        @installData="installEquipmentTable"
        @addRow="addRow"
      />
      <CEditTable
        id="purseTable"
        title="输配电线路上损耗的排放"
        :editable="editable"
        :columns="lossColumns"
        :data="lossData"
        :now-month="nowMonth"
        save-api="savePurchaseEResult"
        count-api="lossECalc"
        @installData="installLossTable"
      />
    </a-spin>
  </div>
</template>

<script>
import CEditTable from '@/components/base/c-edit-table'
import CAddEditTable from '@/components/base/c-add-edit-table'

import { desulfurizerType} from '@/utils/typeEnum'
import moment from 'moment'
let objDeepCopy = function(source){
  let sourceCopy = {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
    if (source[item] === null)
      sourceCopy[item] = null
  }
  return sourceCopy
}
export default {
  name: 'AccountingReport',
  components: {CEditTable, CAddEditTable},
  data() {
    return {
      canSubmit:false,
      canClick: true,
      editable: true,
      visible: false,
      openYear: false,
      equipmentColumns: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no', canEdit: false }
        }, {
          title: '设备类型',
          width:120,
          dataIndex: 'equipmentType',
          canEdit: true,
          scopedSlots: { customRender: 'equipmentType', type: 'select', data: [{name:'修理', value:1}, {name:'退役', value:2}], canEdit: true }
        }, {
          title: '设备的六氟化硫容量(千克:kg)',
          width:250,
          dataIndex: 'capacity',
          scopedSlots: { customRender: 'capacity', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: '设备的六氟化硫实际回收量(千克:kg)',
          width:250,
          dataIndex: 'recycle',
          scopedSlots: { customRender: 'recycle', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: '六氟化硫的温室气体潜能',
          width: 220,
          dataIndex: 'gwp',
          scopedSlots: { customRender: 'gwp', type: 'num', min: 0, precision: 2, canEdit: false }
        }, {
          title: '碳排放量(吨:t)',
          dataIndex: 'e',
          width: 220,
          scopedSlots: { customRender: 'e', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '操作',
          dataIndex: 'action',
          width: 100,
          scopedSlots: { customRender: 'action', type: 'action', canEdit: false }
        }
      ],
      equipmentData: [],
      targetOffset: undefined,
      desulData: [],
      lossColumns: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no', canEdit: false }
        }, {
          title: '电厂上网电量(兆瓦时:MWh)',
          width:200,
          dataIndex: 'elOnline',
          scopedSlots: { customRender: 'elOnline', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: '自外省输入电量(兆瓦时:MWh)',
          dataIndex: 'elInput',
          width: 200,
          scopedSlots: { customRender: 'elInput', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: '向外省输出电量(兆瓦时:MWh)',
          dataIndex: 'elOutput',
          width: 200,
          scopedSlots: { customRender: 'elOutput', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: '售电量(兆瓦时:MWh)',
          dataIndex: 'elSd',
          width: 150,
          scopedSlots: { customRender: 'elSd', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: () => {
            return (<div>
                  <div>区域电网年平均供电</div>
                  <div>排放因子(吨/兆瓦时:t/MWh)</div>
                </div>
            )
          },
          dataIndex: 'ef',
          width: 220,
          scopedSlots: { customRender: 'ef', type: 'num', min: 0, precision: 3, canEdit: false }
        }, {
          title: '碳排放量(吨:t)',
          dataIndex: 'e',
          width: 150,
          scopedSlots: { customRender: 'e', type: 'num', min: 0, precision: 3, canEdit: false }
        }
      ],
      lossData: [],
      nowMonth: moment(new Date().toLocaleDateString(), 'YYYY'),
      xiuLi: {},
      tuiYi:{}
    }
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2
  },
  created() {
    this.installData()
  },
  methods:{
    openChange(status){
      this.openYear = !!status
    },
    panelChangeOne(value){
      this.nowMonth = value
      this.openYear = false
      this.installData()
    },
    download() {
      window.open(`${window.location.origin}/中国电网企业温室气体排放核算方法与报告指南.pdf`)
    },
    controlDate(e){
      /*console.log(e.year())
      console.log(new Date().getFullYear())*/
      return e.year()<=new Date().getFullYear()
    },
   installEquipmentTable(){
     let equipment ={
       id: 1,
       plantId: this.$store.state.user.userInfo.plant_id,
       equipmentType: 1,
       capacity: 0,
       recycle: 0,
       ad: 0,
       gwp: 0,
       e: 0,
       carbonEmissionResultId: null,
       ym: this.nowMonth.format('YYYY'),
       calc_time: new Date(),
       status:false
     }
     this.editable = true
     this.canSubmit =false
     this.equipmentData.splice(0, this.equipmentData.length)
     this.equipmentData.push(objDeepCopy(equipment))
     equipment.id = 2
     equipment.equipmentType = 2
     this.equipmentData.push(objDeepCopy(equipment))
     this.$api.emission.queryEquipmentParam({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYY')
    }).then(res => {
          if (res.list&&res.list.length>0){
            this.equipmentData.splice(0, this.equipmentData.length)
            this.equipmentData.push(...res.list.map(e => { e.ym=this.nowMonth.format('YYYY'); e.plantId=this.$store.state.user.userInfo.plant_id; return e }))
            this.xiuLi = objDeepCopy(res.list[0])
            this.tuiYi = objDeepCopy(res.list[1])
            if (this.equipmentData[0].status === 2){
              this.$message.info('本年已填报！')
            }
          }
        }
    ).catch(e => {
    })
  },
    installLossTable(){
      let purse ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        elInput: 0,
        elOutput: 0,
        elGd: 0,
        elSd: 0,
        ad: 0,
        ef: 0,
        e: 0,
        carbonEmissionResultId: null,
        ym: this.nowMonth.format('YYYY'),
        calc_time: new Date(),
        status:false
      }
      this.lossData.splice(0, this.lossData.length)
      this.lossData.push(objDeepCopy(purse))
    this.$api.emission.queryLossParam({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYY')
    }).then(res => {
      if (res.list&&res.list.length>0){
        this.lossData.splice(0, this.lossData.length)
          this.lossData.push(...res.list.filter(e => {
            e.ym = this.nowMonth.format('YYYY')
            e.plantId = this.$store.state.user.userInfo.plant_id
            return e
          }))
        this.canClick = true
      }
        }
    )

    },
    installData(){
      this.canClick = false
      this.installEquipmentTable()
      this.installLossTable()
    },
    changeSelect(record){
      if (record.equipmentType === 1){
        record.gwp = this.xiuLi.gwp
      } else {
        record.gwp = this.tuiYi.gwp
      }
    },
    submit(){
      if (!this.canClick) return
     this.canClick = false
     let obj={
       plantId: this.$store.state.user.userInfo.plant_id,
       ym: this.nowMonth.format('YYYY'),
       plantEquipmentParamVos: this.equipmentData,
       plantLossParamVos: this.lossData,
       plantType: 2
     }
     this.$api.emission.saveCarbonEmissionResult(obj).then(res => {
       this.$message.success({ content: '保存成功!', duration: 2 })
       this.installData()
     })
    },
    addRow(record){
      this.equipmentData = [...this.equipmentData, objDeepCopy(record)]
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