<!-- formModal -->
<template>
  <div>
    <c-detail
      :form="form"
      :column="3"
      :hidedivider="true"
    />
    <a-form-model
      ref="aduitForm"
      layout="inline"
      :model="aduitform"
      :rules="rules"
    >
      <a-form-model-item
        label="审核结果"
        prop="approveResult"
        :label-col="{span: 8}"
        :wrapper-col="{span: 16}"
      >
        <a-radio-group v-model="aduitform.approveResult">
          <a-radio value="1">
            通过
          </a-radio>
          <a-radio value="0">
            驳回
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        v-if="aduitform.approveResult === '0'"
        label="审核备注"
        prop="approveRemark"
      >
        <a-input
          v-model.trim="aduitform.approveRemark"
          type="textarea"
        />
      </a-form-model-item>
    </a-form-model>
    <div class="model-footer">
      <a-space size="large">
        <a-button
          @click="$emit('close', false)"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          :disabled="aduitform.approveResult === undefined"
          :loading="loading"
          @click="confirm"
        >
          确定
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import {formFlag} from '@/utils/means'
export default {
  components: {},
  props: {
    value: {
      type: Boolean
    },
    recordData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      aduitform: {
        approveResult: undefined,
        approveRemark: ''
      },
      rules: {
        approveResult: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ]
      },
      form: [
        {
          title: '申请公司信息',
          flag: 'checkCompanyVo',
          list: [
            {
              label: '统一社会信用代码',
              key: 'socialCreditCode',
              value: ''
            },
            {
              label: '公司名称',
              key: 'companyName',
              value: ''
            },
            {
              label: '核销凭证量',
              key: 'checkCount',
              value: '',
              type: 'precisionNum'
            },
            {
              label: '核销申报数',
              key: 'checkApplicationNum',
              value: '',
              unit: 'MW·h',
              type: 'precisionNum'
            }
          ]
        },
        {
          title: '发行方信息',
          flag: 'sellerCompanyVo',
          list: [
            {
              label: '统一社会信用代码',
              key: 'socialCreditCode',
              value: ''
            },
            {
              label: '公司名称',
              key: 'companyName',
              value: ''
            },
            {
              label: '项目编码',
              key: 'projectCode',
              value: ''
            },
            {
              label: '项目名称',
              key: 'projectName',
              value: ''
            }
          ]
        }
      ],
      loading:false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$api.cancelAfterVerification.getCancelAfterVerificationDetail({
      id: this.recordData.id
    })
    .then(res => {
      formFlag(this.form, res)
    })
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    confirm() {
      this.loading = true
      this.$api.cancelAfterVerification.getCancelAfterVerificationCheck({
        id: this.recordData.id,
        ...this.aduitform
      })
      .then(res => {
        if(this.aduitform.approveResult === '1'){
          this.$message.success('审核成功')
        } else {
          this.$message.success('审核拒绝')
        }
        this.$emit('close', false)
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.$emit('refresh')
      }).catch(res => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>