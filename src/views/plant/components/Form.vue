<template>
  <div class="org-form">
    <p
      v-if="formType === 'review'"
      class="text-center fs-16"
    >
      {{ formType === 'review'?'审核':'修改' }}机构信息
    </p>
    <a-form-model
      ref="editForm"
      :model="form"
      :rules="rules"
      v-bind="formItemLayout"
    >
      <a-row
        :gutter="16"
      >
        <a-col
          v-for="(item, index) in formItems.filter(e=>{if (form.plantType === 2){if (e.params ==='type'||e.params ==='plantAttr'){return false} else{return true} }else {return true}})"
          :key="index"
          :span="8"
        >
          <a-form-model-item
            v-if="item.canEdit !== 'no'||item.type !== 'input'||formType === 'review'"
            :label="item.label"
            :prop="item.params"
            :label-col="item.labelCol || formItemLayout.labelCol"
            :wrapper-col="item.wrapperCol || formItemLayout.wrapperCol"
          >
            <a-input
              v-if="item.type === 'input'"
              v-model.trim="form[item.params]"
              :max-length="item.max || -1"
              :placeholder="`请输入${item.label}`"
              :disabled="notEditable||item.canEdit === 'no'"
            />
            <a-select
              v-if="item.type === 'select'"
              v-model="form[item.params]"
              :placeholder="`请选择${item.label}`"
              :disabled="notEditable||item.canEdit === 'no'"
            >
              <a-select-option
                v-for="(op, i) in item.data"
                :key="`${i}-${op.value}`"
                :value="op.value"
              >
                {{ op.name }}
              </a-select-option>
            </a-select>
            <a-radio-group
              v-if="item.type === 'radio'"
              v-model="form[item.params]"
            >
              <a-radio
                v-for="(op, i) in item.data"
                :key="`${i}-${op.value}`"
                :value="op.value"
              >
                {{ op.name }}
              </a-radio>
            </a-radio-group>

            <div
              v-if="item.type === 'info'"
              class="empty-item"
            >
              {{ item.params && form[item.params] }}
            </div>
            <a-textarea
              v-if="item.type === 'textarea'"
              v-model.trim="form.approveRemark"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请输入审核备注"
              :disabled="formType === 'edit'"
            />
            <a-input-number
              v-if="item.type === 'inputNumber'"
              v-model.trim="form[item.params]"
              :min="0"
              :max="100"
              :precision="2"
              :step="1"
              :disabled="notEditable"
            />
            <template v-if="item.type === 'upload'">
              <CUpload
                ref="cUpload"
                :file-id="item.params && form[item.params]"
                :disabled="notEditable"
                @on-success="uploadSuccess"
              />
            </template>
            <a-cascader
              v-if="item.type === 'areaPicker'"
              v-model="form[item.params]"
              :options="areaOptions"
              :placeholder="item.placeholder"
              :disabled="notEditable"
            />
            <a-range-picker
              v-if="item.type === 'datePicker'"
              v-model="form[item.params]"
              :disabled="notEditable"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-divider />

      <a-row class="btns-row">
        <a-col class="text-center">
          <a-space size="large">
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              @click="submitForm"
            >
              提交
            </a-button>
            <a-button
              type="primary"
              @click="resetForm"
            >
              重置
            </a-button>
            <a-button
              @click="$emit('close')"
            >
              取消
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { validateZhEnNum, validateSocialCode, validateIdCard, validatePhone, validateEmail } from '@/utils/validate'


import {
  managementDepartment,
  epCode,
  orgTypes,
  plantArr,
  plantType,
  reviewType,
  unitProperty,
  plantTypeT
} from '@/utils/typeEnum'
import { ZJoptions } from '@/utils/cascader-address-options'
import CUpload from '@/components/base/c-upload'

import moment from 'moment'
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 }
}

const baseFormType = [
        {
          type: 'input',
          params: 'plantName',
          placeholder: '请填写机构名称',
          label: '机构名称',
          required: true
        },
        {
          type: 'areaPicker',
          params: 'plantArea',
          placeholder: '请选择机构地区',
          label: '机构地区',
          required: true
        },
        {
          type: 'input',
          params: 'address',
          placeholder: '请填写机构地址',
          label: '机构地址'
        },
        {
          type: 'select',
          params: 'plantType',
          placeholder: '请填写机构类型',
          label: '机构类型',
          data: plantTypeT,
          required: true,
          canEdit :'no'
        },
        {
          type: 'select',
          params: 'companyName',
          placeholder: '请填写管理主管部门',
          label: '管理主管部门',
          data:managementDepartment
        },
        // {
        //   type: 'select',
        //   params: 'epCode',
        //   placeholder: '请选择购电层级',
        //   label: '购电层级',
        //   required: true,
        //   data: epCode
        // },
        {
          type: 'select',
          params: 'type',
          placeholder: '请选择行业类别',
          label: '行业类别',
          required: true,
          data: plantType,
          canRemove:true
        },
        {
          type: 'select',
          params: 'unitProperty',
          placeholder: '请选择单位性质',
          label: '单位性质',
          required: true,
          data: unitProperty
        },
        {
          type: 'select',
          params: 'plantAttr',
          placeholder: '请选择电厂性质',
          label: '电厂性质',
          required: true,
          data: plantArr,
          canRemove:true
        },
        {
          type: 'input',
          params: 'registeredCapital',
          placeholder: '请填写注册资本',
          label: '注册资本',
          required: true,
          reg: 'n'
        },
/*        {
          type: 'input',
          params: 'annual',
          placeholder: '请填写年度配额值（吨:t）',
          label: '本年度配额（吨:t）',
          required: true,
          reg: 'n',
          canEdit :'no'
        },*/
        {
          type: 'upload',
          params: 'plantLicenseUrl',
          placeholder: '请上传营业执照',
          label: '营业执照',
          required: true
        },
        {
          type: 'input',
          params: 'plantLicense',
          placeholder: '请填写企业信用代码',
          label: '企业信用代码',
          required: true
        },
        {
          type: 'datePicker',
          params: 'twoDate',
          placeholder: '请填写营业执照有效期',
          label: '营业执照有效期',
          required: true
        },
        {
          type: 'input',
          params: 'legalPerson',
          placeholder: '请填写法定代表人',
          label: '法定代表人',
          required: true
        },
        // {
        //   type: 'input',
        //   params: 'legalPersonIdCard',
        //   placeholder: '请填写法人证件号码',
        //   label: '法人证件号码',
        //   required: true
        // },
        {
          type: 'input',
          params: 'contact',
          placeholder: '请填写联系人姓名',
          label: '联系人姓名',
          required: true
        },
        {
          type: 'input',
          params: 'phone',
          placeholder: '请填写联系电话',
          label: '联系电话',
          required: true
        },
        {
          type: 'input',
          params: 'mail',
          placeholder: '请填写电子邮箱',
          label: '电子邮箱'
        },
        {
          type: 'input',
          params: 'postalCode',
          placeholder: '请填写邮政编码',
          label: '邮政编码'
        }
        // ,
        // {
        //   type: 'input',
        //   params: 'username',
        //   placeholder: '请填写登录用户名',
        //   label: '登录用户名',
        //   required: true,
        //   reg: 'enz-20'
        // },
        // {
        //   type: 'input',
        //   params: 'password',
        //   placeholder: '请填写登录密码',
        //   label: '登录密码',
        //   required: true,
        //   miss: 'password'
        // },
        // {
        //   type: 'input',
        //   params: 'confirmpwd',
        //   placeholder: '请再次填写密码',
        //   label: '密码确认',
        //   required: true,
        //   miss: 'password'
        // },
        // {
        //   type: 'input',
        //   params: 'payPassword',
        //   placeholder: '请填写支付密码',
        //   label: '支付密码',
        //   required: true,
        //   miss: 'password'
        // },
        // {
        //   type: 'input',
        //   params: 'confirmPayPassword',
        //   placeholder: '请确认支付密码',
        //   label: '支付密码确认',
        //   required: true,
        //   miss: 'password'
        // }
      ]

const reviewFormType = [
 {
    type: 'radio',
    label: '审核结果',
    params: 'approveResult',
    data: reviewType
  }, {
    type: 'textarea',
    label: '审核备注',
    params: 'approveMark'
  }
]


export default {
  components: {
    CUpload
  },
  props: {
    formType: {
      type: String,
      default: 'edit'
    },
    id: {
      type: Number,
      default: 0
    },
    orgTypeVal: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      areaOptions: ZJoptions,
      orgTypes,
      formItemLayout,
      form: {
        plantName: '',
        address: '',
        contact: '',
        phone: '',
        mail: '',
        type: undefined,
        unitProperty:'',
        registeredCapital:'',
        dispatchOwner: undefined,
        plantAttr: undefined,
        plantType: undefined,
        allInstCap: 0,
        instNum: 0,
        cosFlag: undefined,
        plantLicense: '',
        expiredDate: undefined,
        approveResult: '',
        approveRemark: '',
        annual: undefined,
        companyName: '',
        plantArea: [],
        epCode: undefined,
        epUnit: '',
        ecRate: undefined,
        legalPerson: '',
        postalCode:'',
        legalPersonIdCard: '',
        issuanceDate: undefined,
        plantLicenseUrl: '',
        // username:'',
        // password:'',
        // confirmpwd:'',
        // payPassword:'',
        // confirmPayPassword:'',
        twoDate: []
      },
      detail: {},
      loading: false,
      baseRules: {
        plantName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { validator: validateZhEnNum, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur'}
        ],
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    formItems() {
      if (this.formType === 'review') return [...baseFormType, ...reviewFormType]
      else return baseFormType
    },
    rules() {
      return this.formType === 'review' ? this.reviewRules : this.initRules
    },
    reviewRules() {
      return {
        approveResult: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ]
      }
    },
    initRules() {
      const ruleType = {
        enz: `([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])`,
        en: `([a-zA-Z0-9_])`,
        n: `([0-9])`
      }
      baseFormType.forEach(item => {
        if(this.baseRules[item.params]) return
        let list = []
        if(item.required){
          list.push({ required: true, message: item.title, trigger: 'blur' })
        }
        if(item.reg){
          const regArr = item.reg.split('-')
          // 正则位数判断
          const bit = regArr.length === 1 ? '*' : `{${regArr.length === 3 ? '' : '0,'}${regArr[1]}}`
          // 错误提示文案
          const msg = item.placeholder.slice(0, 3)+'正确的'+(regArr.length === 1 ? '' : (regArr.length === 3 ? `长度为${regArr[1]}位的` : `不超过${regArr[1]}位的`))+item.placeholder.slice(3)
          const regex = new RegExp(`^${ruleType[regArr[0]]}${bit}$`)
          list.push({ pattern: regex, message: msg, trigger: 'blur'})
        }
        this.baseRules[item.params] = list
      })
      return this.baseRules
    },
    notEditable() {
      return this.formType === 'review'
    },
    // 修改 或 审核 时显示
    isShowApproveResult() {
      return this.formType === 'review' || this.formType === 'edit'
    },
    isShowApproveRemark() {
      return this.isShowApproveResult && this.form.approveResult === 0
    }
  },
  created() {
    if (this.id) this.getDetail()
  },
  methods: {
    // 获取机构详情
    getDetail() {
      this.loading = true

      let params = {
        id: this.id
      }
      this.$api.plant.baseInfoPlant(params).then(res => {
        if (res && Object.keys(res).length) {
          if (this.formType === 'review'&&res.checkPlantDto!==null&&res.checkPlantDto.approveParam!==null) {
            // 机构修改审核 时详情使用 approveParam
            this.approveType = 6
            this.detail = {
              type: this.orgTypeVal,
              ...JSON.parse(res.checkPlantDto.approveParam)
            }
          } else {
            this.detail = res
          }
          this.initForm()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    initForm() {
      for (const key in this.form) {
        if (key === 'type') {
          this.form.type = +this.detail.type
          continue
        }

        // 审核时无需填充审核信息
        if ((key === 'approveResult' || key === 'approveRemark') && this.formType === 'review') {
          continue
        }
        if (key==='issuanceDate'){
          this.form['twoDate'][0] = moment(this.$dayjs(this.detail[key]).format('YYYY-MM-DD'), 'YYYY-MM-DD')
          continue
        }
        if (key==='expiredDate'){
          this.form['twoDate'][1] = moment(this.$dayjs(this.detail[key]).format('YYYY-MM-DD'), 'YYYY-MM-DD')
          continue
        }
        if (key==='plantArea'){
          this.form[key] = this.detail[key].split(',')
          continue
        }

        if (key in this.detail) {
          this.form[key] = this.detail[key]
        }
      }
    },
    // 格式化form参数
    getParams() {
      let params = {}
      this.form.issuanceDate = this.form.twoDate[0]
      this.form.expiredDate = this.form.twoDate[1]
      for (const key in this.form) {
        if (
          (key === 'approveResult' || key === 'approveRemark')
          && this.formType !== 'review'
        ) continue
        params[key] = this.form[key]
      }

      return params
    },
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (!valid) return false

        if (this.formType === 'review') this.review()
        else this.edit()
      })
    },
    // 修改
    edit() {
      const params = this.getParams()

      this.loading = true

      this.$api.plant.updatePlant({
        id: this.id,
        ...params,
        plantArea: this.form.plantArea.join(',')
      }).then(res => {
        this.$message.success('修改成功')
        this.$emit('close', true)
      }).finally(() => {
        this.loading = false
      })
    },
    // 审核
    review() {
      this.loading = true
      this.$api.plant.checkPlant({
        id: this.id,
        annual: this.form.annual,
        approveResult: this.form.approveResult,
        approveRemark: this.form.approveRemark
      }).then(res => {
        this.$message.success('审核成功')
        this.$emit('close', true)
      }).finally(() => {
        this.loading = false
      })
    },
    resetForm() {
      if (this.formType === 'review') {
        this.form.annual = undefined
        this.form.approveResult = undefined
        this.form.approveRemark = ''
      } else {
        this.$refs.editForm.resetFields()
        this.$refs.cUpload && this.$refs.cUpload[0].reset()

        this.$nextTick(() => {
          if (this.formType === 'edit') {
            this.initForm()
          }
        })
      }
    },
    uploadSuccess(data) {
      this.form.plantLicenseUrl = data
      this.$refs.editForm.validateField('plantLicenseUrl')
    }
  }
}
</script>

<style lang="less" scoped>
.org-form {
  .empty-item {
    height: 40px;
    line-height: 40px;
  }
}
/deep/.ant-form-item-label{
  text-align: left;
}
</style>
