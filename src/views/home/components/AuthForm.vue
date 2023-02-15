<template>
  <a-form-model
    ref="authForm"
    class="auth-form"
    :model="form"
    :rules="rules"
    v-bind="formItemLayout"
  >
    <a-form-model-item
      label="交易密码"
      prop="payPassword"
    >
      <a-input
        v-model.trim="form.payPassword"
        placeholder="请输入交易密码"
        type="password"
      />
    </a-form-model-item>

    <a-form-model-item
      label="手机号"
      prop="phone"
    >
      <a-input
        v-model.trim="form.phone"
        class="combine-input"
        placeholder="请输入手机号"
        disabled
      >
        <a-button
          slot="addonAfter"
          class="btn"
          :disabled="!form.payPassword || !form.phone || disBut"
          @click="setTime"
        >
          {{ disBut ? ss+ '后' : '' }}发送验证码
        </a-button>
      </a-input>
    </a-form-model-item>

    <a-form-model-item
      label="验证码"
      prop="authCode"
    >
      <a-input
        v-model.trim="form.authCode"
        placeholder="请输入验证码"
      />
    </a-form-model-item>

    <a-divider />

    <a-row class="btns-row">
      <a-col class="text-center">
        <a-space size="large">
          <a-button
            type="primary"
            :disabled="!form.payPassword || !form.phone || !form.authCode"
            @click="submitForm"
          >
            授权
          </a-button>
          <a-button
            @click="resetForm"
          >
            取消
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import Base64JS from '@/utils/enCode'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

import { validatePhone } from '@/utils/validate'
import {mapGetters, mapActions} from 'vuex'

export default {
  props: {
    price: {
      type: [String, Number],
      default: 0
    },
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      formItemLayout,
      form: {
        payPassword: '',
        phone: '',
        authCode: ''
      },
      ss: 60,
      setIn: null,
      disBut: false,
      canOrder: true
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    }),
    rules() {
      return {
        payPassword: [
          { required: true, message: '请输入交易密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur'}
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDetail().then(res => {
      this.form.phone = this.userInfo.contactWay
    })
  },
  methods: {
    ...mapActions({
      getDetail: 'user/getUserInfo'
    }),
    submitForm() {
      if(!this.canOrder) return this.$message.info('请求中...')
      this.canOrder = false
      setTimeout(() => {
        this.canOrder = true
      }, 3000)
      this.$refs.authForm.validate(valid => {
        if (!valid) return false
        this.form.payPassword =Base64JS.encode(this.form.payPassword)
        this.$api.trade.buy({
          ...this.form,
          quantity: this.num * 10 * 10,
          price: this.num * this.price,
          assetSaleId: this.$route.params.id
          })
          .then(res => {
            this.$message.success('下单成功')
            this.$store.dispatch('user/getUserInfo')
            this.$router.push('/ordermanagement')
          })
      })
    },
    resetForm() {
      this.$emit('close')
      this.$refs.authForm.resetFields()
    },

    // 获取验证码
    async getCaptchaCode() {
      if(this.disBut) return
      const res = await this.$api.sms.send({
        payPassword: this.form.payPassword,
        phone: this.form.phone,
        type: 1
      })
      if(!res) return
      this.disBut = true
      this.setIn = setInterval(() => {
        if(this.ss === 0){
          this.ss = 60
          this.disBut = false
          return clearInterval(this.setIn)
        }
        this.ss--
      }, 1000)
    },
    setTime() {
      this.$refs.authForm.validateField('phone', valid => {
        if (valid) return false
        this.getCaptchaCode()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.auth-form {
  .combine-input {
    /deep/.ant-input-group-addon {
      padding: 0;
      .btn {
        width: 100px;
        height: 30px;
        background: transparent;
        border: none;
        text-align: center;
        padding: 0;
      }
    }
  }
}
</style>
