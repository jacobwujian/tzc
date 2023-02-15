<!-- formModal -->
<template>
  <div>
    <div>
      <a-form-model
        ref="editForm"
        layout="vertical"
        :model="form"
        :rules="rules"
      >
        <a-row :gutter="[16, 16]">
          <template v-for="item in formList">
            <a-col
              v-if="!item.noShow&&(form.plantType!==2?true:(item.params!=='type'&&item.params!=='plantAttr'))"
              :key="item.params"
              :span="8"
            >
              <a-form-model-item
                :ref="item.params"
                :label="item.label"
                :prop="item.params"
              >
                <a-input
                  v-if="item.type === 'input'"
                  v-model.trim="form[item.params]"
                  :placeholder="item.placeholder"
                  :type="item.miss || 'text'"
                />
                <a-input-number
                  v-if="item.type === 'inputNumber'"
                  v-model.trim="form[item.params]"
                  :min="0"
                  :max="100"
                  :precision="2"
                  :step="1"
                />
                <a-select
                  v-if="item.type === 'select'"
                  v-model="form[item.params]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option
                    v-for="sitem in item.data"
                    :key="sitem.value"
                    :value="sitem.value"
                  >
                    {{ sitem.name }}
                  </a-select-option>
                </a-select>
                <template v-if="item.type === 'upload'">
                  <CUpload
                    ref="cUpload"
                    :file-id="item.params && form[item.params]"
                    @on-success="uploadSuccess"
                  />
                </template>
                <a-cascader
                  v-if="item.type === 'areaPicker'"
                  v-model="form[item.params]"
                  :options="areaOptions"
                  :placeholder="item.placeholder"
                />
                <a-range-picker
                  v-if="item.type === 'datePicker'"
                  v-model="form[item.params]"
                />
              </a-form-model-item>
            </a-col>
            <a-col
              v-if="item.noShow && item.params === 'annual' && form['type'] == '1'"
              :key="item.params"
              :span="8"
            >
              <a-form-model-item
                :ref="item.params"
                :label="item.label"
                :prop="item.params"
              >
                <a-input
                  v-model.trim="form[item.params]"
                  :placeholder="item.placeholder"
                  :type="item.miss || 'text'"
                />
              </a-form-model-item>
            </a-col>
          </template>
        </a-row>
      </a-form-model>
    </div>
    <div class="model-footer">
      <a-space size="large">
        <a-button
          type="primary"
          @click="handleOk"
        >
          提交
        </a-button>
        <a-button
          type="primary"
          @click="resetForm"
        >
          重置
        </a-button>
        <a-button @click="$emit('close', false)">
          取消
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import CUpload from '@/components/base/c-upload'
import { validatePhone, validateEmail } from '@/utils/validate.js'
import { ZJoptions } from '@/utils/cascader-address-options'
import {plantType, plantArr, epCode, managementDepartment, unitProperty, plantTypeT} from '@/utils/typeEnum'
import Base64JS from '@/utils/enCode'
const regex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}')
export default {
  components: {
    CUpload
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password !== '') {
          this.$refs.editForm.validateField('confirmpwd')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('密码输入不正确'))
      } else {
        callback()
      }
    }

    // let payvalidatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入支付密码'))
    //   } else {
    //     if (this.form.payPassword !== '') {
    //       this.$refs.editForm.validateField('confirmPayPassword')
    //     }
    //     callback()
    //   }
    // }
    // let payvalidatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入支付密码'))
    //   } else if (value !== this.form.payPassword) {
    //     callback(new Error('支付密码输入不正确'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      areaOptions: ZJoptions,
      loading: false,
      imageUrl: '',
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        ecRate: 0,
        twoDate: [],
        issuanceDate: {},
        expiredDate: {},
        plantType: 1
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: regex, message: '密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918', trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { pattern: regex, message: '密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918', trigger: 'blur' }
        ],
        // payPassword: [
        //   { validator: payvalidatePass, trigger: 'blur' },
        //   { required: true, message: '请输入支付密码', trigger: 'blur' },
        //   { pattern: regex, message: '密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918', trigger: 'blur' }
        // ],
        // confirmPayPassword: [
        //   { required: true, message: '请确认支付密码', trigger: 'blur' },
        //   { validator: payvalidatePass2, trigger: 'blur' },
        //   { pattern: regex, message: '密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918', trigger: 'blur' }
        // ],
        companyName: [
          { required: true, message: '请选择管理主管部门', trigger: 'blur' },
          { pattern: /^\S{1,60}$/, message: '请选择管理主管部门', trigger: 'blur' }
        ],
        companyArea: [{ type: 'array', required: true, message: '请选择公司地区', trigger: 'change' }],
        address: [{ pattern: /^\S{1,80}$/, message: '请输入正确的注册地址', trigger: 'blur' }],
        businessLicense: [{ required: true, message: '请上传营业执照', trigger: 'blur' }],
        mail: [
          { max: 20, message: '位数不能超过20位', trigger: 'change' },
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      formList: [
        {
          type: 'input',
          params: 'plantName',
          placeholder: '请填写机构名称',
          label: '机构名称',
          required: true
        },
        /*{
          type: 'input',
          params: 'registeredAddress',
          placeholder: '请填写注册地址',
          label: '注册地址',
          required: true
        },*/
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
          required: true
        },
        {
          type: 'select',
          params: 'companyName',
          placeholder: '请选择管理主管部门',
          label: '管理主管部门',
          data: managementDepartment
        },
        // {
        //   type: 'select',
        //   params: 'epCode',
        //   placeholder: '请选择购电层级',
        //   label: '购电层级',
        //   required: true,
        //   data: epCode
        // },
     /*   {
          type: 'input',
          params: 'sewageLicense',
          placeholder: '请填写排污许可证编号',
          label: '排污许可证编号'
        },*/
        {
          type: 'select',
          params: 'type',
          placeholder: '请选择行业类别',
          label: '行业类别',
          required: true,
          data: plantType
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
          data: plantArr
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
          reg: 'n'
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
          placeholder: '请填写机构信用代码',
          label: '机构信用代码',
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
          params: 'ad',
          placeholder: 'ds',
          label: 'as',
          noShow: true
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
        },
        {
          type: 'input',
          params: 'username',
          placeholder: '请填写登录用户名',
          label: '登录用户名',
          required: true,
          reg: 'enz-20'
        },
        {
          type: 'input',
          params: 'password',
          placeholder: '请填写登录密码',
          label: '登录密码',
          required: true,
          miss: 'password'
        },
        {
          type: 'input',
          params: 'confirmpwd',
          placeholder: '请再次填写密码',
          label: '密码确认',
          required: true,
          miss: 'password'
        }
        // ,
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
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initForm()
    this.initRules()
    if (this.$route.path.indexOf(this.$cPath) !== 0) {
      const index = this.formList.findIndex(item => item.params === 'type')
      this.formList.splice(index, 1)
    }
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    initForm() {
      this.formList.forEach(item => {
        if (item.params in this.form) return

        if (item.type === 'areaPicker') {
          this.$set(this.form, item.params, [])
        } else {
          this.$set(this.form, item.params, '')
        }
      })
    },
    initRules() {
      const ruleType = {
        enz: `([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])`,
        en: `([a-zA-Z0-9_])`,
        n: `([0-9])`
      }
      this.formList.forEach(item => {
        if (this.rules[item.params]) return
        let list = []
        if (item.required) {
          list.push({ required: true, message: item.placeholder, trigger: 'blur' })
        }
        if (item.reg) {
          const regArr = item.reg.split('-')
          // 正则位数判断
          const bit = regArr.length === 1 ? '*' : `{${regArr.length === 3 ? '' : '0,'}${regArr[1]}}`
          // 错误提示文案
          const msg = item.placeholder.slice(0, 3) + '正确的' + (regArr.length === 1 ? '' : regArr.length === 3 ? `长度为${regArr[1]}位的` : `不超过${regArr[1]}位的`) + item.placeholder.slice(3)
          const regex = new RegExp(`^${ruleType[regArr[0]]}${bit}$`)
          list.push({ pattern: regex, message: msg, trigger: 'blur' })
        }
        this.rules[item.params] = list
      })
    },
    handleOk() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.form.issuanceDate = this.form.twoDate[0]
          this.form.expiredDate = this.form.twoDate[1]
          this.$api.user
            .registerUser({
              ...this.form,
              annual: this.form.annual,
              plantArea: this.form.plantArea.join(','),
              password: Base64JS.encode(this.form.password),
              confirmpwd: Base64JS.encode(this.form.confirmpwd),
              payPassword: Base64JS.encode(this.form.payPassword),
              confirmPayPassword: Base64JS.encode(this.form.confirmPayPassword)
            })
            .then(res => {
              this.$message.success('注册成功, 请等待管理员审核')
              this.$emit('close')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uploadSuccess(data) {
      this.form.plantLicenseUrl = data
      this.$refs.editForm.validateField('planLicenseUrl')
    },
    resetForm() {
      this.$refs.editForm.resetFields()
      this.$refs.cUpload && this.$refs.cUpload[0].reset()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}
</style>
