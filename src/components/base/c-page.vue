<!--  -->
<template>
  <div class="base-page">
    <a-form-model
      v-if="canSearch"
      ref="searchForm"
      :model="form"
      :rules="rules"
      v-bind="formItemLayout"
    >
      <a-row :gutter="[8, 8]">
        <a-col
          v-for="(item, index) in searchType"
          :key="index"
          :xl="8"
          :xxl="colSpan"
        >
          <a-form-model-item
            :label="item.label"
            :prop="item.params"
            :label-col="item.labelCol ? item.labelCol : formItemLayout.labelCol"
            :wrapper-col="item.wrapperCol ? item.wrapperCol : formItemLayout.wrapperCol"
          >
            <a-input
              v-if="item.type === 'input'"
              v-model="form[item.params]"
              allow-clear
              :placeholder="`请输入${item.label}`"
            />
            <a-select
              v-if="item.type === 'select'"
              v-model="form[item.params]"
              allow-clear
              :placeholder="`请选择${item.label}`"
            >
              <a-select-option
                v-for="(op, i) in item.data"
                :key="`${i}-${op.value}`"
                :value="op.value"
              >
                {{ op.name }}
              </a-select-option>
            </a-select>
            <a-range-picker
              v-if="item.type === 'datePicker'"
              v-model="form[item.params]"
            />
            <a-month-picker
              v-if="item.type === 'dateMonth'"
              v-model="form[item.params]"
              allow-clear
            />
            <a-cascader
              v-if="item.type === 'area'"
              v-model="form[item.params]"
              :options="areaOptions"
              :placeholder="item.placeholder"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row class="btns-row">
        <a-col :span="18">
          <slot name="headerLeft" />
        </a-col>
        <a-col
          :span="6"
          class="text-right"
        >
          <a-space>
            <a-button
              v-if="canOpen"
              type="primary"
              html-type="submit"
              @click="openModel()"
            >
              核查说明
            </a-button>
            <a-button
              v-if="canExport"
              type="primary"
              html-type="submit"
              @click="handleDownload(columns,'data',excelName)"
            >
              导出
            </a-button>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="loading"
              @click="submitForm"
            >
              查询
            </a-button>
            <a-button
              :disabled="loading"
              @click="resetForm"
            >
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form-model>

    <a-table
      class="c-table"
      :columns="columnsFormat"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      :scroll="scroll"
      :bordered="true"
      size="middle"
      :row-key="record=>record.id"
      @change="handleTableChange"
    >
      <template
        v-for="(colCustom, key) in columnsCustom"
        :slot="colCustom.customRender"
        slot-scope="text, record, index"
      >
        <template v-if="colCustom.type === 'select'">
          <a-tag
            v-if="colCustom.customRender === 'chainStatus'"
            :key="key"
            :color="getColor(text)"
          >
            {{ EnumMap(colCustom.data, text === null?'notKey':text) }}
          </a-tag>
          <span
            v-else
            :key="key"
          >{{ EnumMap(colCustom.data, text === null?'notKey':text) }}</span>
        </template>
        <span
          v-else-if="colCustom.type === 'time'"
          :key="key"
          :title="text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss')"
        >
          {{ text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss') }}
        </span>
        <template v-else-if="colCustom.type === 'price'">
          {{ text == 0 ? '/' : (text && text / 100) }}
        </template>
        <span
          v-else-if="colCustom.type === 'area'"
          :key="key"
          :title="codeToText(text)"
        >
          {{ codeToText(text) }}
        </span>
        <template v-else-if="colCustom.customRender === 'no'">
          {{ (pagination.current - 1) * pagination.pageSize + (+index) + 1 }}
        </template>
        <template v-else-if="colCustom.customRender === 'precisionNum'">
          {{ text>0? text : 0 }}
        </template>
        <slot
          v-else
          :name="colCustom.customRender"
          :record="record"
          :text="text"
          :index="index"
        />
      </template>
    </a-table>
  </div>
</template>

<script>
import { EnumMap } from '@/utils/typeEnum'
import {codeToText, ZJoptions} from '@/utils/cascader-address-options'

export default {
  components: {},
  props: {
    formItemLayout: {
      type: Object,
      default: () => ({
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      })
    },
    searchType: {
      type: Array,
      default: () => ([])
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    customRender: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    scroll:{
      type: Object,
      default:() => ({})
    },
    // 是否初始化请求
    isInitFetch: {
      type: Boolean,
      default: true
    },
    canSearch: {
      type: Boolean,
      default: true
    },
    canOpen: {
      type: Boolean,
      default: false
    },
    canExport: {
      type: Boolean,
      default: false
    },
    excelName:{
      type: String,
      default: '标准表'
    }
  },
  data() {
    return {
      areaOptions: ZJoptions,
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
      form: {}
    }
  },
  computed: {
		columnsCustom() {
			return this.columns.filter(item => {
				return item.scopedSlots
			}).map(item => item.scopedSlots)
    },
    colSpan() {
      if (this.searchType && this.searchType.length < 4) return 6
      else return 6
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
  watch: {},
  created() {
    this.initForm()
    if (this.isInitFetch) this.fetch()
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    openModel(){
      this.$emit('openModel')
    },
    handleDownload(col, datas, name) {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = col.filter(e => {
          return e.dataIndex&&e.dataIndex!=='action'
        }).map(e => {
          return e.title
        })
        const data = this[datas].map((v, index) => col.filter(e => {
          return e.dataIndex&&e.dataIndex!=='action'
        }).map(j => {
          if (j.scopedSlots&&j.scopedSlots.type === 'select'){
            return EnumMap(j.scopedSlots.data, v[j.dataIndex])
          }
          if (j.scopedSlots&&j.scopedSlots.type === 'time'){
            return this.$dayjs(v[j.dataIndex]).format(j.scopedSlots.format || 'YYYY-MM-DD HH:mm:ss')
          }
          return v[j.dataIndex]
        }
        ))
        excel.export_json_to_excel({
          header: tHeader,
          data: [data],
          filename: name
        })
      })
    },
    getColor(data){
      let color = ''
      switch (data) {
        case 0: color = 'orange'; break
        case 1: color = 'green'; break
        case 2: color = 'red'; break
        default: color = 'gray'; break
      }
      return color
    },
    initForm() {
      this.searchType.forEach(item => {
        this.$set(
          this.form,
          item.params,
          item.default || (item.type === 'datePicker' ? [] : undefined)
        )
      })
    },
    submitForm() {
      this.$refs.searchForm.validate(valid => {
        if (!valid) return false

        this.pagination.current = 1
        this.fetch()
      })
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.submitForm()
      if (this.form.plantArea){
        this.form.plantArea = undefined
      }
    },
    handleTableChange({ current, pageSize }) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize

      this.fetch()
    },
    fetch() {
      if (this.loading) return

      this.loading = true
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }

      Object.keys(this.form).forEach(item => {
        const filterItem = this.searchType.find(it => it.params == item)
        if (filterItem && filterItem.type === 'datePicker') {
          if (this.form[item] && this.form[item].length) {
            params[`${item}TimeStart`] = this.$dayjs(this.form[item][0]).format('YYYY-MM-DD 00:00:00')
            params[`${item}TimeEnd`] = this.$dayjs(this.form[item][1]).format('YYYY-MM-DD 23:59:59')
            return
          }
        }
        if (this.form.plantArea&&filterItem.type === 'area') {
          params[item] = this.form[item].join(',')
          return
        }
          params[item] = this.form[item]
      })
      this.$emit('fetch', params)
    },
    fetchSuccess(total) {
      this.pagination.total = total || 0
    },
    fetchFinally() {
      const that =this
      setTimeout(() => { that.loading = false }, 1000)

    }
  }
}
</script>

<style lang="less" scoped>
.base-page {
  .btns-row { margin-bottom: 24px; }
  .c-table {
    height: 100%;
    /deep/ .ant-btn-link { padding: 0 5px; }
  }
}
/deep/ .ant-row .ant-form-item{
  margin-bottom: 8px;
}
</style>
