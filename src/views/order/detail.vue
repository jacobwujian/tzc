<!-- 交易详情 -->
<template>
  <div>
    <c-detail :form="form" />
    <div class="back">
      <a-button v-if="formType === 'view'" type="primary" @click="$emit('close', true)">
        关闭
      </a-button>
      <a-button v-if="formType === 'review'" type="primary" @click="register">
        提交
      </a-button>
      <a-button v-if="formType === 'review'" type="primary" @click="reset">
        重置
      </a-button>
      <a-button v-if="formType === 'review'" type="primary" @click="$emit('close', true)">
        取消
      </a-button>
    </div>
  </div>
</template>

<script>
import { formFlag } from '@/utils/means'
import { plantType, reviewType, plantTypeT } from '@/utils/typeEnum'

export default {
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    },
    formType: {
      type: String,
      default: 'view'
    }
  },
  data() {
    return {
      form: [
        {
          title: '订单审核',
          list: [
            {
              label: '磋商时间',
              key: 'createTime',
              type: 'time',
              value: ''
            },
            {
              label: '交易时间',
              key: 'tradeTime',
              type: 'time',
              value: ''
            },
            {
              label: '交易数量',
              key: 'tradeCount',
              value: '',
              type: 'precisionNum'
            },
            {
              label: '交易单价(元)',
              key: 'price',
              value: '',
              type: 'precisionNum'
            },
            {
              label: '',
              key: '',
              value: '',
              type: ''
            },
            {
              label: '',
              key: '',
              value: '',
              type: ''
            },
            {
              label: '协议与付款凭证',
              key: 'fileInfos',
              value: null,
              type: 'fileInfos'
            }
          ]
        },
        {
          title: '交易双方信息',
          children: [
            {
              title: '买方',
              flag: 'purchaserCompanyVo',
              list: [
                {
                  label: '机构名称',
                  key: 'plantName',
                  value: ''
                },
                {
                  label: '机构类型',
                  key: 'plantType',
                  value: '',
                  type: 'select',
                  data: plantTypeT
                },
                {
                  label: '所属地区',
                  key: 'address',
                  value: '',
                  type: 'area'
                },
                {
                  label: '企业信用代码',
                  key: 'socialCreditCode',
                  value: ''
                }
              ]
            },
            {
              title: '卖方',
              flag: 'sellerCompanyVo',
              list: [
                {
                  label: '机构名称',
                  key: 'plantName',
                  value: ''
                },
                {
                  label: '机构类型',
                  key: 'plantType',
                  value: '',
                  type: 'select',
                  data: plantTypeT
                },
                {
                  label: '所属地区',
                  key: 'address',
                  value: '',
                  type: 'area'
                },
                {
                  label: '企业信用代码',
                  key: 'socialCreditCode',
                  value: ''
                }
              ]
            }
          ]
        },
        {
          title: '审核信息',
          list: [
            {
              key: 'approveResult',
              label: '审核结果',
              dataSource: reviewType,
              type: 'radio',
              formType: this.formType,
              value: null
            },
            {
              key: 'approveRemark',
              label: '审核备注',
              type: 'approveRemark',
              formType: this.formType,
              value: ''
            }
          ]
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.reset()
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    register() {
      if (this.form[2].list[0].value !== null) {
        let obj = {
          id: this.id,
          approveResult: this.form[2].list[0].value,
          approveRemark: this.form[2].list[1].value
        }
        this.$api.exchange.approveOrder(obj).then(res => {
          this.$emit('close', res)
        })
      } else {
        return this.$message.error('审批结果不能为空')
      }
    },
    reset() {
      this.$api.exchange
        .getExchangeDetail({
          id: this.id
        })
        .then(res => {
          formFlag(this.form, res)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.back {
  width: 100%;
  text-align: center;
}
button {
  margin-right: 30px;
}
</style>
