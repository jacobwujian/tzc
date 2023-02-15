<!-- 交易详情 -->
<template>
  <div class="">
    <br>
    <br>
    <br>
    <div
      v-for="(lItem, lIndex) in form"
      :key="lIndex"
      style="margin-left: 200px;"
    >
      <a-descriptions
        :title="lItem.title"
        layout="horizontal"
      >
        <template>
          <a-descriptions-item
            v-for="(sItem, sIndex) in lItem.list"
            :key="sIndex + lIndex"
            :label="sItem.key.includes('approve') || sItem.key.includes('fileInfos') ? '' : sItem.label"
          >
            <template v-if="sItem.type === 'button'">
              <a-button
                type="link"
                style="font-size: 10px"
                @click="download"
              >
                碳排配额磋商协议模板.docx
              </a-button>
            </template>
            <Star
              v-if="sItem.type === 'rate'"
              :count="sItem.value"
            />
            <template v-if="sItem.data && sItem.value !== null">
              {{ EnumMap(sItem.data, +sItem.value) }}
            </template>
            <template v-else-if="sItem.type === 'fileInfos'">
              <a-form-model-item label="协议与付款凭证:">
                <p
                  v-for="item in sItem.value"
                  :key="item.id"
                >
                  <span>{{ item.fileName }}</span>
                  <a-button
                    type="link"
                    @click="download(item)"
                  >
                    下载
                  </a-button>
                </p>
              </a-form-model-item>
            </template>
            <span
              v-else
              class="breakText"
            >{{ sItem.value }}</span>
            <template v-if="sItem.value && sItem.unit">
              {{ sItem.unit }}
            </template>
          </a-descriptions-item>
        </template>
      </a-descriptions>
    </div>
    <br>
    <br>
    <div class="back">
      <a-button
        type="primary"
        @click="$router.go(-1)"
      >
        返回
      </a-button>
      <a-button
        type="primary"
        @click="uploadProtect"
      >
        磋商协议上传
      </a-button>
      <a-button
        type="primary"
        @click="uploadChange"
      >
        交易凭证上传
      </a-button>
    </div>
    <Agreement ref="refAgreement" />
  </div>
</template>

<script>
import { formFlag } from '@/utils/means'
import { plantTypeT } from '@/utils/typeEnum'
import { EnumMap } from '@/utils/typeEnum'
import { codeToText } from '@/utils/cascader-address-options'
import Agreement from '@/views/deal/Agreement.vue'
export default {
  components: {
    Agreement
  },
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
      detail: {},
      EnumMap,
      codeToText,
      form: [
        {
          title: '',
          list: [
            {
              label: '机构名称',
              key: 'plantName',
              value: ''
            },
            // {
            //   label: '行业类别',
            //   key: 'plantType',
            //   value: '',
            //   data: plantTypeT
            // },
            {
              label: '所属地区',
              key: 'plantArea',
              value: '',
              type: 'area'
            },
            {
              label: '联系人',
              key: 'contact',
              value: ''
            },
            {
              label: '联系电话',
              key: 'phone',
              value: ''
            },
            {
              label: '可交易量',
              key: 'tradeQuota',
              value: ''
            },
            {
              label: '下载协议',
              key: 'protect',
              value: '',
              type: 'button'
            },
            {
              label: '特殊说明',
              key: 'info',
              value: '这是特殊说明'
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
    download() {
      window.open(`${window.location.origin}/碳排配额磋商协议模板.docx`)
    },
    reset() {
      this.$api.plant
        .findPlantChangeDetail({
          id: this.id
        })
        .then(res => {
          formFlag(this.form, res)
        })
    },
    uploadChange() {
      const that = this
      this.$confirm({
        title: '温馨提示',
        content: '请准备好相关的支付凭证',
        onOk: function() {
          that.detail.modelType = 'uploadChange'
          that.detail.titleName = '提交支付凭证'
          that.detail.quantity = 1
          that.detail.plantId = that.id
          that.detail.num = 1
          that.detail.price = 1
          that.detail.label = '上传支付凭证'
          that.$refs.refAgreement.show(that.detail)
        }
      })
    },
    uploadProtect(){
      const that = this
      this.$confirm({
        title: '温馨提示',
        content: '请准备好已签订的碳排配额磋商协议',
        onOk: function() {
          that.detail.modelType = 'uploadProtect'
          that.detail.titleName = '提交协议'
          that.detail.quantity = 1
          that.detail.plantId = that.id
          that.detail.num = 1
          that.detail.price = 0
          that.detail.label = '上传签订好的协议'
          that.$refs.refAgreement.show(that.detail)
        }
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
