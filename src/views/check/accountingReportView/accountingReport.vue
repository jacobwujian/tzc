<template>
  <div>
    <a-spin
      tip="Loading..."
      :delay="1"
      :spinning="!canClick"
    >
      <!--      <a-anchor
        class="rightTop"
        :target-offset="targetOffset"
      >
        <a-anchor-link
          href="#fuelTable"
          title="化石燃料排放"
        />
        &lt;!&ndash;      <a-anchor-link
        href="#desTable"
        title="脱硫过程排放"
      />&ndash;&gt;
        <a-anchor-link
          href="#purseTable"
          title="净购入电力排放"
        />
      </a-anchor>-->
      <div style="font-size: 20px;font-style: normal;padding-top: 20px;padding-left: 5%;">
        碳排放年月：<a-month-picker
          v-model="nowMonth"
          style="margin-left: 10%;"
          :allow-clear="false"
          :disabled-date="controlDate"
          @change="installData"
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
          :width="1100"
          on-ok="handleOk"
        >
          <img
            src="../../../static/home/碳排放总量计算说明.png"
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
      <CEditTable
        id="fuelTable"
        title="化石燃料排放"
        :editable="editable"
        :columns="fuelColumns"
        :data="fuelData"
        :now-month="nowMonth"
        save-api="saveFuelResult"
        count-api="fuelCalc"
        @installData="installFuelTable"
      />
      <!--    <CEditTable
      id="desTable"
      title="脱硫过程排放"
      :editable="editable"
      :columns="desulColumns"
      :data="desulData"
      :now-month="nowMonth"
      save-api="saveDesulfurizationResult"
      count-api="desulfurizationCalc"
      @installData="installDesTable"
    />-->
      <CEditTable
        id="purseTable"
        title="净购入电力排放"
        :editable="editable"
        :columns="purchaseColumns"
        :data="purchaseData"
        :now-month="nowMonth"
        save-api="savePurchaseEResult"
        count-api="purchaseECalc"
        @installData="installPurseTable"
      />
    </a-spin>
  </div>
</template>

<script>
import CEditTable from '@/components/base/c-edit-table'
import {fuelType, plantType, desulfurizerType, purchaseArea} from '@/utils/typeEnum'
import moment from 'moment'
let objDeepCopy = function(source){
  let sourceCopy = {}
  for (let item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  return sourceCopy
}
export default {
  name: 'AccountingReport',
  components: {CEditTable},
  data() {
    return {
      canSubmit:false,
      canClick: true,
      editable: true,
      visible: false,
      fuelColumns: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no', canEdit: false }
        }, {
          title: '类型',
          width:120,
          dataIndex: 'fossilFuelType',
          canEdit: true,
          scopedSlots: { customRender: 'fossilFuelType', type: 'select', data: fuelType, canEdit: false }
        }, {
          title: '化石燃料的消耗量(吨:t)',
          width:250,
          dataIndex: 'fc',
          scopedSlots: { customRender: 'fc', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: () => {
            return (<div>
              <div>平均低位发热值(吉焦/吨:GJ/t、</div>
                <div>吉焦/万标准立方米:GJ/104Nm3)</div>
                </div>
          )
          },
          width:250,
          dataIndex: 'ncv',
          scopedSlots: { customRender: 'ncv', type: 'num', min: 0, precision: 6, canEdit: false }
        }, {
          title: '单位热值含碳量(吨/吉焦:t/GJ)',
          width: 220,
          dataIndex: 'cc',
          scopedSlots: { customRender: 'cc', type: 'num', min: 0, precision: 6, canEdit: false }
        }, {
          title: '碳氧化率（%）',
          dataIndex: 'of',
          width: 120,
          scopedSlots: { customRender: 'of', type: 'num', min: 0, max:100, precision: 0, canEdit: false }
        }, {
          title: '碳排放量(吨:t)',
          dataIndex: 'e',
          width: 220,
          scopedSlots: { customRender: 'e', type: 'num', min: 0, precision: 3, canEdit: false }
        }
      ],
      fuelData: [],
      targetOffset: undefined,
      desulColumns: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no', canEdit: false }
        }, {
          title: '脱硫剂种类',
          width:120,
          dataIndex: 'carbonateType',
          canEdit: true,
          scopedSlots: { customRender: 'carbonateType', type: 'select', data: desulfurizerType, canEdit: false }
        }, {
          title: '脱硫剂消耗量(吨:t)',
          width:150,
          dataIndex: 'b',
          scopedSlots: { customRender: 'b', type: 'num', min: 0, precision: 3, canEdit: true }
        }, {
          title: '脱硫剂中碳酸盐含量(%)',
          width:250,
          dataIndex: 'i',
          scopedSlots: { customRender: 'i', type: 'num', max:100, min: 0, precision: 0, canEdit: false }
        }, {
          title: '碳酸盐排放因子',
          width: 120,
          dataIndex: 'cf',
          scopedSlots: { customRender: 'cf', type: 'num', min: 0, precision: 2, canEdit: false }
        }, {
          title: '转化率(%)',
          dataIndex: 'tr',
          width: 120,
          scopedSlots: { customRender: 'tr', type: 'num', max:100, min: 0, precision: 0, canEdit: false }
        }, {
          title: '碳排放量(吨:t)',
          dataIndex: 'e',
          width: 220,
          scopedSlots: { customRender: 'e', type: 'num', min: 0, precision: 3, canEdit: false }
        }
      ],
      desulData: [],
      purchaseColumns: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no', canEdit: false }
        }, {
          title: '企业净购入电量(兆瓦时:MWh)',
          width:150,
          dataIndex: 'ad',
          scopedSlots: { customRender: 'ad', type: 'num', min: 0, precision: 2, canEdit: true }
        }, {
          title: '区域电网年平均供电排放因子(吨二氧化碳/兆瓦时:t/MWh)',
          dataIndex: 'ef',
          width: 320,
          scopedSlots: { customRender: 'ef', type: 'num', min: 0, precision: 2, canEdit: false }
        }, {
          title: '碳排放量(吨:t)',
          dataIndex: 'e',
          width: 220,
          scopedSlots: { customRender: 'e', type: 'num', min: 0, precision: 3, canEdit: false }
        }
      ],
      purchaseData: [],
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
      window.open(`${window.location.origin}/核查指南 新版.pdf`)
    },
    controlDate(e){
      return moment(new Date().toLocaleDateString(), 'YYYY-MM').isBefore(e)
    },
   installFuelTable(){
   this.initFul()
     this.editable = true
     this.canSubmit =false
     this.$api.emission.queryFuelParam({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
          if (res.list&&res.list.length>0){
            this.fuelData.splice(0, this.fuelData.length)
            this.fuelData.push(...res.list.map(e => { e.ym=this.nowMonth.format('YYYYMM'); e.plantId=this.$store.state.user.userInfo.plant_id; return e }))
            if (this.fuelData[0].status === 2){
              this.$message.info('本月已填报！')
            }
          }
        }
    ).catch(e => {
    })
  },
    initFul(){
      let fuel ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        fossilFuelType: 1,
        fc: 0,
        ncv: 0,
        ad: 0,
        cc: 0,
        of: 0,
        ef: 0,
        e: 0,
        carbon_emission: false,
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date()
      }
      this.fuelData.splice(0, this.fuelData.length)
      fuelType.forEach( e => {
        fuel.id = e.value
        fuel.fossilFuelType = e.value
        this.fuelData.push(objDeepCopy(fuel))
      })
    },
  installDesTable(){
    let desul ={
      id: 1,
      plantId: this.$store.state.user.userInfo.plant_id,
      carbonateType: 1,
      b: 0,
      i: 90,
      cal: 0,
      cf: 0,
      tr: 100,
      ef: 0,
      e: 0,
      carbon_emission: false,
      ym: this.nowMonth.format('YYYYMM'),
      calc_time: new Date()
    }
    this.desulData.splice(0, 9)
    desulfurizerType.forEach( e => {
      desul.id = e.value
      desul.carbonateType = e.value
      this.desulData.push(objDeepCopy(desul))
    })
    this.$api.emission.queryDesulfurizationParam({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
      if (res.list&&res.list.length>0){
        this.desulData.splice(0, this.desulData.length)
        this.desulData.push(...res.list.map(e => { e.ym=this.nowMonth.format('YYYYMM'); e.plantId=this.$store.state.user.userInfo.plant_id; return e }))
      }
        }
    )

    },
    installPurseTable(areaId){
      let purse ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        area: 1,
        ef: 0,
        ad: 0,
        e: 0,
        carbon_emission: false,
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date()
      }
      this.purchaseData.splice(0, this.purchaseData.length)
      this.purchaseData.push(objDeepCopy(purse))
    this.$api.emission.queryPurchaseEParam({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
      if (res.list&&res.list.length>0){
        this.purchaseData.splice(0, this.purchaseData.length)
        if(res.list.length === 1){
          this.purchaseData.push(...res.list)
        }else {
          this.purchaseData.push(...res.list.filter(e => {
            e.ym = this.nowMonth.format('YYYYMM')
            e.plantId = this.$store.state.user.userInfo.plant_id
            if (e.area === areaId) return e; else return null
          }))
        }
        this.canClick = true
      }
        }
    )

    },
    installData(){
      this.canClick = false
      this.installFuelTable()
      //this.installDesTable()
      this.installPurseTable(1)
    },
    submit(){
      if (!this.canClick) return
     this.canClick = false
      let that = this

      let obj={
       plantId: this.$store.state.user.userInfo.plant_id,
       ym: this.nowMonth.format('YYYYMM'),
       plantFuelParamVos: this.fuelData,
       plantPurchaseEParamVos: this.purchaseData,
        plantType: 1
     }
     this.$api.emission.saveCarbonEmissionResult(obj).then(res => {
       this.$message.success({ content: '保存成功!', duration: 2 })
       this.installData()
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

</style>