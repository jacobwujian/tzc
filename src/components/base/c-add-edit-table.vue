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
              @change="changeSelect(record, index)"
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
              @blur="() => {canEdit[index][colCustom.customRender] = false}"
            />
            <a-popconfirm
              v-else-if="colCustom.type === 'action'"
              title="是否确定删除？"
              ok-text="是"
              cancel-text="否"
              :disabled="editable&&canEdit[index][colCustom.customRender]"
              @confirm="removeRow(index, record)"
            >
              <a-button
                type="link"
                :disabled="editable&&canEdit[index][colCustom.customRender]"
              >
                删除
              </a-button>
            </a-popconfirm>
            <template v-else>
              <span
                class="spanOver"
                :style="text===0?'color: red':'color: black'"
                @click="editValue(colCustom.customRender, index)"
              >{{ colCustom.type === 'select' ?EnumMap(colCustom.data, text):text }}</span>
            </template>
          </div>
        </template>
      </a-table>

      <div class="footer-btn-con">
        <a-button
          class="footer-btn"
          type="primary"
          @click="addRow"
        >
          添加设备
        </a-button>
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
    modelData:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      canClick: true,
      EnumMap,
      codeToText,
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
    removeRow(index, record){
      this.data.splice(index, 1)
    },
    changeNum(value, index, key){
      if (value === null){
        this.data[index][key] = 0
      }
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
      this.data.forEach((e, index) => {
      this.canEdit.push(
          objDeepCopy(this.editColMap)
      )
        this.changeSelect(e, index )
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
    changeSelect(record, index){
      this.canClick = false
      this.$emit('changeSelect', record, this.canEdit, index)
      let _this = this
      setTimeout( () => { _this.canClick = true }, 1200)
    },
    installData(){
      this.canClick = false
      this.$emit('installData')
      let _this = this
      setTimeout( () => { _this.canClick = true }, 1200)
    },
    addRow(){
      this.modelData.id = this.data.length+1
      this.$emit('addRow', this.modelData)
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
  padding-left: 50.5vw;
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
