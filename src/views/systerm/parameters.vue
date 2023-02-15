<template>
  <div>
    <a-spin
      tip="Loading..."
      :delay="1"
      :spinning="!canClick"
    >
      <div style="font-size: 14px;font-style: normal;padding-top: 20px;padding-left: 10%;">
        机构类型：
        <a-select
          v-model="type"
          :default-value="1"
          style="width: 200px"
        >
          <a-select-option
            v-for="item in enterpriseType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-button
          style="margin-left: 50%;"
          type="primary"
          :disabled="canSubmit"
          @click="query"
        >
          查询
        </a-button>
        <a-button
          style="margin-left: 1%;"
          type="primary"
          :disabled="canSubmit"
          @click="submit"
        >
          保存
        </a-button>
      </div>
      <CEditTable
        v-show="type === 1"
        id="fossilFuelEmissions"
        title="化石燃料排放"
        :hide-button="false"
        :editable="editable"
        :columns="fossilFuelEmissions"
        :data="fossilFuelEmissionsData"
        :base-info="true"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 1"
        id="netPurchasedElectricityEmissions"
        title="净购入电力排放"
        :hide-button="false"
        :editable="editable"
        :columns="netPurchasedElectricityEmissions"
        :data="netPurchasedElectricityEmissionsData"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 2"
        id="sulfurHexafluorideBasicParameters"
        title="使用六氟化硫设备修理与退役过程生产的排放"
        :hide-button="false"
        :editable="editable"
        :columns="sulfurHexafluorideBasicParameters"
        :data="sulfurHexafluorideBasicParametersData"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 2"
        id="wireLossBasicParameters"
        title="输配电线路上损耗的排放"
        :hide-button="false"
        :editable="editable"
        :columns="wireLossBasicParameters"
        :data="wireLossBasicParametersData"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 1"
        id="unitrange"
        title="供电基准值"
        :hide-button="false"
        :editable="editable"
        :columns="unitrange"
        :data="unitrangeData"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 1"
        id="heatingReference"
        title="供热基准值"
        :hide-button="false"
        :editable="editable"
        :columns="heatingReference"
        :data="heatingReferenceData"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 1"
        id="coolingType"
        title="冷却方式系数"
        :hide-button="false"
        :editable="editable"
        :columns="coolingType"
        :data="coolingTypeData"
        style="width: 300px"
      />
      <br>
      <CEditTable
        v-show="type === 1"
        id="heatingType"
        title="供热量修正系数"
        :hide-button="false"
        :editable="editable"
        :columns="heatingType"
        :data="heatingTypeData"
        style="width: 300px"
      />
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </a-spin>
  </div>
</template>

<script>
import CEditTable from '@/components/base/c-edit-table'
import {enterpriseType, fuelType, powerSupplyReferenceType, heatingReferenceType, coolingType, heatingType} from '@/utils/typeEnum'
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
      loading:false,
      fossilFuelEmissionsData:[],
      netPurchasedElectricityEmissionsData:[],
      heatingReferenceData:[],
      sulfurHexafluorideBasicParametersData:[],
      wireLossBasicParametersData:[],
      unitrangeData:[],
      coolingTypeData:[],
      heatingTypeData:[],
      enterpriseType: enterpriseType,
      canSubmit:false,
      canClick: true,
      editable: true,
      visible: false,
      fossilFuelEmissions: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '类型',
          width:120,
          dataIndex: 'fossilFuelType',
          canEdit: true,
          scopedSlots: { customRender: 'fossilFuelType', type: 'select', data: fuelType}
        }, {
          title: '平均低位发热值(吉焦/吨:GJ/t、吉焦/万标准立方米:GJ/104Nm3)',
          width:250,
          dataIndex: 'ncv',
          scopedSlots: { customRender: 'ncv', type: 'num', min: 0, precision: 6, canEdit: true }
        }, {
          title: '单位热值含碳量(吨/吉焦:t/GJ)',
          width: 220,
          dataIndex: 'cc',
          scopedSlots: { customRender: 'cc', type: 'num', min: 0, precision: 6, canEdit: true }
        }, {
          title: '碳氧化率（%）',
          width: 220,
          dataIndex: 'of',
          scopedSlots: { customRender: 'of', type: 'num', min: 0, max:100, precision: 6, canEdit: true }
        }
      ],
      netPurchasedElectricityEmissions: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '区域电网年平均供电排放因子(吨二氧化碳/兆瓦时:t/MWh)',
          width:120,
          dataIndex: 'ef',
          scopedSlots: { customRender: 'ef', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      sulfurHexafluorideBasicParameters: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '六氟化硫的温室气体潜能',
          width:120,
          dataIndex: 'gwp',
          scopedSlots: { customRender: 'gwp', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      wireLossBasicParameters: [
        {
          title: '序号',
          width: 85,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '区域电网年平均供电排放因子(吨/兆瓦时:t/MWh)',
          width:120,
          dataIndex: 'ef',
          scopedSlots: { customRender: 'ef', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      unitrange: [
        {
          title: '序号',
          width: 25,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '机组类别范围',
          width:200,
          dataIndex: 'code',
          scopedSlots: { customRender: 'code', type: 'select', data: powerSupplyReferenceType}
        }, {
          title: '供电基准值（tCO2/MWh）',
          width:75,
          dataIndex: 'value',
          scopedSlots: { customRender: 'value', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      heatingReference: [
        {
          title: '序号',
          width: 25,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '机组类别范围',
          width:200,
          dataIndex: 'code',
          scopedSlots: { customRender: 'code', type: 'select', data: heatingReferenceType}
        }, {
          title: '供热基准值（tCO2/MWh）',
          width:75,
          dataIndex: 'value',
          scopedSlots: { customRender: 'value', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      coolingType: [
        {
          title: '序号',
          width: 25,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '冷却方式',
          width:200,
          dataIndex: 'code',
          scopedSlots: { customRender: 'code', type: 'select', data: coolingType}
        }, {
          title: '冷却方式系数',
          width:75,
          dataIndex: 'value',
          scopedSlots: { customRender: 'value', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      heatingType: [
        {
          title: '序号',
          width: 25,
          scopedSlots: { customRender: 'no' }
        }, {
          title: '机组类型',
          width:200,
          dataIndex: 'code',
          scopedSlots: { customRender: 'code', type: 'select', data: heatingType}
        }, {
          title: '供热量修正系数',
          width:75,
          dataIndex: 'value',
          scopedSlots: { customRender: 'value', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      type: 1,
      nowMonth: moment(new Date().toLocaleDateString(), 'YYYY-MM')
    }
  },
  mounted() {
  },
  created() {
    this.installData()
  },
  methods:{
    query(){
      this.installData()
    },
    installData(){
      this.loading = true
      this.canClick = false
      this.initFul()
      this.installPurseTable()
        this.$api.parameters.getFossilFuelEmissionsBasicParameters().then(res => {
        this.fossilFuelEmissionsData=res.list
      }).finally(() => {
          this.loading = false
        })
      this.installQuotaTable()
      this.$api.parameters.getUnitrange().then(res => {
        this.unitrangeData=res.list
      }).finally(() => {
          this.loading = false
        })
        this.installHeatingReferenceTable()
         this.$api.parameters.getHeatingReference().then(res => {
        this.heatingReferenceData=res.list
      }).finally(() => {
          this.loading = false
        })
      this.installCoolingTypeTable()
      this.$api.parameters.getCoolingType().then(res => {
        this.coolingTypeData=res.list
      }).finally(() => {
          this.loading = false
        })
      this.installHeatingTypeTable()
       this.$api.parameters.getHeatingType().then(res => {
        this.heatingTypeData=res.list
      }).finally(() => {
          this.loading = false
        })
      this.installEquipmentTable()
      this.installLossTable()
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
      this.fossilFuelEmissionsData.splice(0, this.fossilFuelEmissionsData.length)
      fuelType.forEach( e => {
        fuel.id = e.value
        fuel.fossilFuelType = e.value
        this.fossilFuelEmissionsData.push(objDeepCopy(fuel))
      })
    },
    installHeatingReferenceTable(){
      let fuel ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        type: 0,
        code: 0,
        value: 0,
        content: 0,
        carbon_emission: false,
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date()
      }
      this.heatingReferenceData.splice(0, this.heatingReferenceData.length)
      heatingReferenceType.forEach( e => {
        fuel.id = e.value
        fuel.content = e.value
        this.heatingReferenceData.push(objDeepCopy(fuel))
      })
    },
    installCoolingTypeTable(){
      let fuel ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        type: 0,
        code: 0,
        value: 0,
        content: 0,
        carbon_emission: false,
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date()
      }
      this.coolingTypeData.splice(0, this.coolingTypeData.length)
      coolingType.forEach( e => {
        fuel.id = e.value
        fuel.content = e.value
        this.coolingTypeData.push(objDeepCopy(fuel))
      })
    },
    installHeatingTypeTable(){
      let fuel ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        type: 0,
        code: 0,
        value: 0,
        content: 0,
        carbon_emission: false,
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date()
      }
      this.heatingTypeData.splice(0, this.heatingTypeData.length)
      heatingType.forEach( e => {
        fuel.id = e.value
        fuel.content = e.value
        this.heatingTypeData.push(objDeepCopy(fuel))
      })
    },
    installQuotaTable(){
      let fuel ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        type: 0,
        code: 0,
        value: 0,
        content: 0,
        carbon_emission: false,
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date()
      }
      this.unitrangeData.splice(0, this.unitrangeData.length)
      powerSupplyReferenceType.forEach( e => {
        fuel.id = e.value
        fuel.content = e.value
        this.unitrangeData.push(objDeepCopy(fuel))
      })
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
       ym: this.nowMonth.format('YYYYMM'),
       calc_time: new Date(),
       status:false
     }
     this.editable = true
     this.canSubmit =false
     this.sulfurHexafluorideBasicParametersData.splice(0, this.sulfurHexafluorideBasicParametersData.length)
     this.sulfurHexafluorideBasicParametersData.push(objDeepCopy(equipment))
     equipment.id = 2
     equipment.equipmentType = 2
     this.sulfurHexafluorideBasicParametersData.push(objDeepCopy(equipment))
     this.$api.parameters.getSulfurHexafluorideBasicParameters({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
          if (res.list&&res.list.length>0){
            this.sulfurHexafluorideBasicParametersData.splice(0, this.sulfurHexafluorideBasicParametersData.length)
            this.sulfurHexafluorideBasicParametersData.push(...res.list.map(e => { e.ym=this.nowMonth.format('YYYYMM'); e.plantId=this.$store.state.user.userInfo.plant_id; return e }))
            if (this.sulfurHexafluorideBasicParametersData[0].status === 2||this.sulfurHexafluorideBasicParametersData[0].status === 3){
              this.editable = false
              this.canSubmit =true
            }
          }
        }
    ).catch(e => {
    })
  },
    installPurseTable(){
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
      this.netPurchasedElectricityEmissionsData.splice(0, this.netPurchasedElectricityEmissionsData.length)
      this.netPurchasedElectricityEmissionsData.push(objDeepCopy(purse))
    this.$api.parameters.getNetPurchasedElectricityEmissionsBasicParameters({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
      if (res.list&&res.list.length>0){
        this.netPurchasedElectricityEmissionsData.splice(0, this.netPurchasedElectricityEmissionsData.length)
          this.netPurchasedElectricityEmissionsData.push(...res.list)
        this.canClick = true
      }
        }
    )

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
        ym: this.nowMonth.format('YYYYMM'),
        calc_time: new Date(),
        status:false
      }
      this.wireLossBasicParametersData.splice(0, this.wireLossBasicParametersData.length)
      this.wireLossBasicParametersData.push(objDeepCopy(purse))
    this.$api.parameters.getWireLossBasicParameters({
      plantId:this.$store.state.user.userInfo.plant_id,
      ym: this.nowMonth.format('YYYYMM')
    }).then(res => {
      if (res.list&&res.list.length>0){
        this.wireLossBasicParametersData.splice(0, this.wireLossBasicParametersData.length)
          this.wireLossBasicParametersData.push(...res.list.filter(e => {
            e.ym = this.nowMonth.format('YYYYMM')
            e.plantId = this.$store.state.user.userInfo.plant_id
            return e
          }))
        this.canClick = true
      }
        }
    )

    },
    submit(){
      if (!this.canClick) return
     this.canClick = false
     this.$api.parameters.updateFossilFuelEmissionsBasicParameters(this.fossilFuelEmissionsData).then(res => {
     })
     this.$api.parameters.updateNetPurchasedElectricityEmissionsBasicParameters(this.netPurchasedElectricityEmissionsData).then(res => {
     })
     this.$api.parameters.updateSulfurHexafluorideBasicParameters(this.sulfurHexafluorideBasicParametersData).then(res => {
     })
     this.$api.parameters.updateUnitrange(this.unitrangeData).then(res => {
     })
     this.$api.parameters.updateHeatingReference(this.heatingReferenceData).then(res => {
     })
     this.$api.parameters.updateCoolingType(this.coolingTypeData).then(res => {
     })
     this.$api.parameters.updateHeatingType(this.heatingTypeData).then(res => {
     })
     this.$api.parameters.updateWireLossBasicParameters(this.wireLossBasicParametersData).then(res => {
       this.$message.success({ content: '保存成功!', duration: 2 })
       this.installData()
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