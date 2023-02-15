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
          prop="phone"
          label="手机号"
        >
          <a-input
            v-model="form.phone"
            placeholder="请输入手机号"
          />
        </a-form-model-item>
        <a-form-model-item
          label="验证码"
          prop="code"
          required
        >
          <a-input
            v-model="form.code"
            placeholder="请输入验证码"
          >
            <a-button
              slot="addonAfter"
              class="code-c"
              :disabled="!form.phone || disBut"
              @click="setTime"
            >
              {{ disBut ? ss+ '后' : '' }}发送验证码
            </a-button>
          </a-input>
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
          :disabled="!form.phone || !form.code"
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

export default {
  components: {
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        phone: '',
        code: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入正确的验证码', trigger: 'change' }]
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
          this.$api.sms.checkCode(this.form).then(res => {
              this.$emit('close')
              this.$emit('openForm', 'Pwdmodel', this.form)
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