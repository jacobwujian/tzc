<!-- formModal -->
<template>
  <div>
    <a-form-model
      ref="editForm"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :colon="false"
      :rules="rules"
    >
      <template v-if="plan == 1">
        <a-form-model-item
          required
          label="用户名"
        >
          <a-input
            v-model="form.username"
            placeholder="请输入用户名"
          />
        </a-form-model-item>
        <a-form-model-item
          required
          prop="password"
          label="新密码"
        >
          <a-input
            v-model="form.password"
            placeholder="请输入新密码"
            type="password"
          />
        </a-form-model-item>
        <a-form-model-item
          required
          prop="confirmpwd"
          label="确认新密码"
        >
          <a-input
            v-model="form.confirmpwd"
            placeholder="请确认新密码"
            type="password"
          />
        </a-form-model-item>
      </template>
    </a-form-model>
    <div class="model-footer">
      <a-space size="large">
        <a-button
          @click="$emit('close')"
        >
          取消
        </a-button>
        <a-button
          :disabled="!form.password || !form.username"
          type="primary"
          @click="handleOk"
        >
          确定
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import { validatePhone } from '@/utils/validate.js'
import Base64JS from '@/utils/enCode'

const regex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}')
export default {
  components: {
  },
  props: {
    value: {
      type: Boolean
    },
    data: {
      type: Object,
      default: () => {}
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
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        phone: '',
        code: '',
        password: '',
        username: '',
        confirmpwd: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: regex, message: '密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918', trigger: 'blur'}
        ],
        confirmpwd: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { pattern: regex, message: '密码需包含大写字母小写字母特殊字符数字,长度8-30位,列如Yhh@2918', trigger: 'blur'}
        ]
      },
      ss: 60,
      setIn: null,
      disBut: false,
      plan: 1
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    handleOk() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.form.phone = this.data.phone
          this.form.code = this.data.code
          this.$api.sms.updatePassword(this.form).then(res => {
            if(res) this.$emit('close')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setTime() {
      this.$refs.editForm.validateField('phone', valid => {
        if (valid) return false
        this.getCaptchaCode()
      })
    },
    async getCaptchaCode() {
      if(this.disBut) return
      const res = await this.$api.sms.send({
        phone: this.form.phone,
        username: this.form.username,
        type: 0
      })
      if(!res) return
      this.disBut = true
      this.setIn = setInterval(() => {
        if(this.ss == 0){
          this.ss = 60
          this.disBut = false
          return clearInterval(this.setIn)
        }
        this.ss--
      }, 1000)
    }
  }
}
</script>
<style lang='less' scoped>
/deep/.ant-form-vertical .ant-form-item{
  padding-bottom: 0;
}
.code-c{
  width: 100px;
  height: 30px;
  background: transparent;
  border: none;
  text-align: center;
  padding: 0;
}
</style>