<template>
  <div>
    <a-spin
      tip="Loading..."
      :delay="1"
      :spinning="!canClick"
    >
      <div style="font-style: normal;padding-top: 20px;padding-left: 5%;">
        参数类型：
        <a-select
          v-model="type"
          :default-value="1"
          style="width: 200px"
          @change="installData"
        >
          <a-select-option
            v-for="item in warningType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-button
          style="margin-left: 45%;"
          type="primary"
          :disabled="canSubmit"
          @click="installWarningParamTable"
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
        id="warningParamTable"
        :hide-button="false"
        :editable="editable"
        :columns="warningParamColumns"
        :data="warningParamData"
        style="width: 300px"
        @installData="installWarningParamTable"
      />
    </a-spin>
  </div>
</template>

<script>
import CEditTable from '@/components/base/c-edit-table'
import { warningType } from '@/utils/typeEnum'
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
      warningType: warningType,
      canSubmit:false,
      canClick: true,
      editable: true,
      visible: false,
      warningParamColumns: [
        {
          title: '月份',
          width: 85,
          dataIndex: 'month',
          scopedSlots: { customRender: 'month', type: 'text', canEdit: false }
        }, {
          title: '类型',
          width:120,
          dataIndex: 'type',
          canEdit: true,
          scopedSlots: { customRender: 'type', type: 'select', data: warningType, canEdit: false }
        }, {
          title: '最小值',
          width:250,
          dataIndex: 'min',
          scopedSlots: { customRender: 'min', type: 'num', min: 0, precision: 6, canEdit: true }
        }, {
          title: '最大值',
          width: 220,
          dataIndex: 'max',
          scopedSlots: { customRender: 'max', type: 'num', min: 0, precision: 6, canEdit: true }
        }
      ],
      warningParamData: [],
      targetOffset: undefined,
      type: 1
    }
  },
  mounted() {
    this.targetOffset = window.innerHeight / 2
  },
  created() {
    this.installData()
  },
  methods:{
    installWarningParamTable(){
      const that = this
      this.canClick = false
      let warningParam ={
        id: 1,
        plantId: this.$store.state.user.userInfo.plant_id,
        month: 1,
        type: 1,
        min: 0,
        max: 0
      }
      this.editable = true
      this.canSubmit =false
      this.warningParamData.splice(0, this.warningParamData.length)
      for (let i=1; i<13; i++){
        warningParam.id = i
      this.warningParamData.push(objDeepCopy(warningParam))
      }
      let params = {
        type:this.type
      }
    this.$api.warning.getWarningParamList(params).then(res => {
      if (res.list&&res.list.length>0){
        this.warningParamData.splice(0, this.warningParamData.length)
        this.warningParamData.push(...res.list)
        setTimeout( () => { that.canClick = true }, 1000)
      }
        }
    )

    },
    installData(){
      this.canClick = false
      this.installWarningParamTable()
    },
    submit(){
      if (!this.canClick) return
     this.canClick = false
     this.$api.warning.updatePlantWarningParam(this.warningParamData).then(res => {
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