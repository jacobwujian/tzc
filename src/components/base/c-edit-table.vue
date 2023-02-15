<!--  -->
<template>
  <a-spin
    tip="Loading..."
    :delay="1"
    :spinning="!canClick"
  >
    <div class="edit-table">
      <div style="font-size: 20px;font-style: normal;margin-left: -80px; padding-bottom: 20px;padding-top: 20px ">
        {{ title }}
      </div>
      <a-table
        :columns="columnsFormat"
        :data-source="data"
        bordered
        :row-key="record=>record.id"
        :pagination="false"
      >
        <template />
        <template
          v-for="colCustom in columnsCustom"
          :slot="colCustom.customRender"
          slot-scope="text, record, index"
        >
          <div :key="colCustom.customRender">
            <template v-if="colCustom.customRender === 'no'">
              {{ index+1 }}
            </template>
            <a-input
              v-else-if="editable&&canEdit[index][colCustom.customRender]&&colCustom.type === 'text'"
              v-model="data[index][colCustom.customRender]"
              v-focus
              style="margin: -5px 0; align-content: center;text-align: center"
              @change="() => {}"
              @blur="() => {canEdit[index][colCustom.customRender] = false}"
            />
            <a-select
              v-else-if="editable&&canEdit[index][colCustom.customRender]&&colCustom.type === 'select'"
              v-model="data[index][colCustom.customRender]"
              v-focus
              style="width: 100px; align-content: center;text-align: center"
              @change="installData(record)"
              @blur="() => {canEdit[index][colCustom.customRender] = false}"
            >
              <a-select-option
                v-for="item in colCustom.data"
                :key="item.value"
                :value="item.value"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-input-number
              v-else-if="editable&&canEdit[index][colCustom.customRender]&&colCustom.type === 'num'"
              v-model="data[index][colCustom.customRender]"
              auto-focus
              style="margin: -5px 0; align-content: center;text-align: center"
              :precision="colCustom.precision"
              :min="colCustom.min"
              :max="colCustom.max"
              @change="changeNum(data[index][colCustom.customRender], index, colCustom.customRender)"
              @blur="blur(index, record, colCustom.customRender)"
              @focus="() => {focusValue = record[colCustom.customRender]}"
            />
            <template v-else>
              <div
                class="spanOver"
                :style="text===0?'color: red':'color: black'"
                @click="editValue(colCustom.customRender, index)"
              >{{ colCustom.type === 'select' ?EnumMap(colCustom.data, text):text }}</div>
            </template>
          </div>
        </template>
      </a-table>
      <div
        v-if="hideButton"
        class="footer-btn-con"
      >
        <a-button
          class="footer-btn"
          type="primary"
          @click="compute"
        >
          计算
        </a-button>
        <a-button
          class="footer-btn"
          @click="installData"
        >
          重置
        </a-button>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { EnumMap } from '@/utils/typeEnum'
import { codeToText } from '@/utils/cascader-address-options'
let objDeepCopy = function(source){
  let sourceCopy = {}
  for (let item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  return sourceCopy
}

export default {
  components: {},
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus()
      }
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    editable:{
      type: Boolean,
      default:true
    },
    title: {
      type: String,
      default: ''
    },
    saveApi:{
      type: String,
      default: ''
    },
    countApi:{
      type: String,
      default: ''
    },
    hideButton:{
      type: Boolean,
      default:true
    },
    baseInfo:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      canClick: true,
      EnumMap,
      codeToText,
      focusValue: 0,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      },
      loading: false,
      form: {},
      canEdit: [],
      editColMap: {}
    }
  },
  computed: {
		columnsCustom() {
			return this.columns.filter(item => {
				return item.scopedSlots
			}).map(item => item.scopedSlots)
    },
    columnsFormat() {
      return this.columns.map(it => {
        const obj = {
          ...it,
          align: it.align || 'center',
          ellipsis: it.ellipsis === undefined ? true : it.ellipsis
        }
        if(it.scopedSlots && it.scopedSlots.type === 'time' && !it.hasOwnProperty('width')) obj.width=160
        return obj
      })
    }
	},
  watch: {
    data(){
      this.initForm()
    }
  },
  created() {
    this.initForm()
  },
  mounted() {
  },
  destroyed() {},
  activated() {},
  methods: {
    changeNum(value, index, key){
      if (value === null){
        this.data[index][key] = 0
      }
    },
    blur(index, record, key){
      if (key === 'min'||key === 'max'){
        if (record['min']>=record['max']){
          record[key] = this.focusValue
          this.$message.error(
              '最小值应该小于最大值！',
              3
          )
        }
      }
      this.canEdit[index][key] = false
    },
    editValue(item, index){
      if (this.canEdit[index][item]!==undefined)
        this.canEdit[index][item] = true
    },
    initForm() {
      this.columnsCustom.forEach(e => {
        if (e.canEdit) {
          this.$set(
              this.editColMap,
              e.customRender,
              false
          )
        }
      })
      this.data.forEach((e) => {
        if (e.fossilFuelType&&e.fossilFuelType === 1&&!this.baseInfo){
          this.canEdit.push(
              {
                fc: false,
                ncv: false,
                cc: false
              }
          )
        }else {
      this.canEdit.push(
          objDeepCopy(this.editColMap)
      )
        }
      })
    },
    compute(){
      if (!this.canClick) return
      this.canClick = false
      this.$api.emission[this.countApi](this.data).then(res => {
        this.data.splice(0, this.data.length)
        this.data.push(...res.list)
        this.canClick = true
      })
    },
    fetch(){
    },
    installData(record){
      this.canClick = false
      this.$emit('installData', record.area!==undefined?record.area:1)
      let _this = this
      setTimeout( () => { _this.canClick = true }, 1200)
    },
    changeValue(record){
      console.log(record)
    }
  }
}
</script>

<style lang="less" scoped>
.edit-table{
  width: 70vw;
  padding-left: 5vw;
}
.footer-btn-con{
  width: 70vw;
  padding-left: 56vw;
  padding-top: 20px;
}
.footer-btn{
  margin: 10px;
}
.ant-input{
  padding: 0;
  text-align: center;
}
/deep/ .ant-row .ant-form-item{
  margin-bottom: 8px;
}
.spanOver{
  display: inline-block;
  height: 21px;
  cursor: pointer;
}
/deep/.ant-input-number-handler-wrap {
 display: none;
}

/deep/.ant-table-thead > tr > th, .ant-table-tbody > tr > td > div{
  line-height: 21px;
}
/deep/input.ant-input-number-input{
  height: 21px;
  text-align: center;
}
/deep/.ant-input-number{
  height: 21px;
}
/deep/.ant-select-selection__rendered{
  line-height: 19px;
}
/deep/.ant-select-selection-selected-value{
  line-height: 19px;
}
/deep/.ant-select-selection{
  height: 19px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}

</style>
