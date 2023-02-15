<!-- 详情 -->
<template>
  <a-spin :spinning="loading">
    <div class="c-home-detail pb-50 home-container">
      <a-row class="intro">
        <a-col :span="12">
          <div class="pic-wrap">
            <img :src="ImgUrl">
          </div>
        </a-col>
        <a-col :span="5">
          <ul class="infos">
            <li>
              项目名称：
              <span
                class="font-bold"
                :title="detail.assetSaleName"
              >
                {{ detail.assetSaleName }}
              </span>
            </li>
            <li style="margin-top: 0">
              单价：
              <a-statistic
                class="price-format inline-block font-bold"
                :precision="2"
                :value="(detail.price || 0) / 100"
                :value-style="{
                  color: '#ff4d4f',
                  fontSize: '36px'
                }"
              />
              RMB
            </li>

            <li>能源类型：{{ EnumMap(energyType, detail.energyType) }}</li>
            <li>认证级别：<Star :count="detail.authenticationLevel" /></li>
            <li>
              所属公司：<span :title="detail.companyName">{{ detail.companyName }}</span>
            </li>

            <li>
              公司联系人：<span :title="detail.companyName">{{ detail.t_user }}</span>
            </li>
            <li>
              公司联系电话：<span :title="detail.companyName">{{ detail.t_phone }}</span>
            </li>
            <li>库存：{{ (detail.stock || 0) / 10 / 10 }} 张</li>

            <li>
              <label style="font-size: 20px">数量：</label>
              <a-space size="large">
                <a-input-number
                  id="inputNumber"
                  v-model="num"
                  :max="maxStock"
                  :min="1"
                  :precision="0"
                  style="height: 30px"
                />
              </a-space>
            </li>
            <li>
              <a-button
                class="buy-btn"
                type="primary"
                :disable="!num"
                style="margin-right: 30px"
                @click="buy"
              >
                在线购买
              </a-button>
              <a-button
                class="buy-btn"
                type="primary"
                :disable="!num"
                @click="agreementBuy"
              >
                协议购买
              </a-button>
            </li>
          </ul>
        </a-col>
        <a-col :span="7">
          <ul class="infos">
            <li>绿电最早生产时间: {{ detail.resourceChainTime && $dayjs(detail.resourceChainTime).format('YYYY-MM-DD HH:mm:ss') }}</li>
            <li>
              项目编号：<span :title="detail.assetSaleCode">{{ detail.assetSaleCode }}</span>
            </li>
            <li style="margin-bottom: 20px;">
              <a-button
                type="link"
                style="font-size: 20px"
                @click="download"
              >
                下载协议
              </a-button>
            </li>
            <li />
            <li />
            特殊说明：
            <a-card style="width: 500px;font-size: 20px">
              <p>1.{{ detail.projectDesc }}</p>
              <p>2.提交订单时，请上传签字盖章后的有效凭证（包含协议与付款记录等）</p>
            </a-card>
          </ul>
          <div class="actions">
            <a-space size="large" />
          </div>
        </a-col>
      </a-row>

      <div class="tabs">
        <a-tabs
          type="card"
          default-active-key="1"
        >
          <a-tab-pane
            key="1"
            tab="公司介绍"
          >
            <a-descriptions bordered>
              <a-descriptions-item
                v-for="(item, index) in productDetail"
                :key="index"
                :label="item.label"
              >
                <template v-if="item.key === 'energyType'">
                  {{ EnumMap(energyType, detail.energyType) }}
                </template>
                <template v-else-if="item.key === 'projectArea'">
                  {{ codeToText(detail[item.key]) }}
                </template>
                <template v-else-if="item.key === 'period' && detail['periodTimeStart'] && detail['periodTimeEnd']">
                  {{ $dayjs(detail['periodTimeStart']).format('YYYY-MM-DD HH:mm:ss') }}
                  至
                  {{ $dayjs(detail['periodTimeEnd']).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
                <template v-else-if="item.key === 'projectScale'">
                  {{ (detail[item.key] || 0) / 100 }}
                </template>
                <template v-else>
                  {{ detail[item.key] }}
                </template>
                <template v-if="detail[item.key] && item.unit">
                  {{ item.unit }}
                </template>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane
            key="2"
            tab="交易记录"
          >
            <a-table
              :columns="recordColumns"
              :data-source="recordList"
              :pagination="pagination"
              :loading="recordLoading"
              bordered
              size="middle"
              :row-key="record => record.id"
              @change="handleTableChange"
            >
              <template
                slot="tradeTime"
                slot-scope="text"
              >
                {{ text && $dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
              </template>

              <template
                slot="precisionNum"
                slot-scope="text"
              >
                {{ (text || 0) / 100 }}
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
        <br>
      </div>

      <a-modal
        v-model="modalVisible"
        :title="titleName"
        :width="500"
        :footer="null"
        :destroy-on-close="true"
        :mask-closable="false"
      >
        <component
          :is="modalComponent"
          :ref="modalComponent"
          :form-type="modalName"
          :price="detail.price"
          :form="fileForm"
          :num="num"
          @confirm="confirm"
          @close="close"
        />
      </a-modal>
      <Agreement
        ref="refAgreement"
        @confirm="confirm"
      />
    </div>
  </a-spin>
</template>

<script>
import Star from '@/components/base/c-star'
import ConfirmForm from './components/ConfirmForm'
import AuthForm from './components/AuthForm'
import { energyType, EnumMap } from '@/utils/typeEnum'
import { codeToText } from '@/utils/cascader-address-options'
import Agreement from './components/Agreement.vue'
import Vue from 'vue'
import {baseURL, accessToken} from '@/utils/constant'
const productDetail = [
  {
    key: 'companyName',
    label: '公司名称'
  },
  {
    key: 'energyType',
    label: '能源类型'
  },
  {
    key: 'period',
    label: '项目周期'
  },
  {
    key: 'projectScale',
    label: '项目规模',
    unit: 'MW.h'
  },
  {
    key: 'projectArea',
    label: '项目归属地'
  },
  {
    key: 'contactWay',
    label: '联系方式'
  }
]

const columns = [
  {
    title: '编号',
    dataIndex: 'orderId'
  },
  {
    title: '买入方',
    dataIndex: 'purchaserCompanyName'
  },
  {
    title: '买入时间',
    dataIndex: 'tradeTime',
    scopedSlots: { customRender: 'tradeTime' }
  },
  {
    title: '买入数量',
    dataIndex: 'tradeCount',
    scopedSlots: { customRender: 'precisionNum' }
  }
]
const blobToBase64 = function(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}
export default {
  components: {
    Star,
    ConfirmForm,
    AuthForm,
    Agreement
  },
  data() {
    return {
      id: '',
      isAgreement: false,
      codeToText,
      energyType,
      EnumMap,
      fileForm: {
        wordFile: [],
        imgFile: []
      },
      productDetail,
      titleName: '',
      titleNames: ['机构钱包模块', '提交订单'],
      detail: {},
      recordList: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 30,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      },
      num: 1,
      loading: false,
      recordLoading: false,
      modalName: '', // cfrm- 确认 auth- 授权
      modalVisible: false,
      img: this.$route.query.img,
      ImgUrl: ''
    }
  },
  computed: {
    maxStock() {
      // 向下取整
      return Math.floor((this.detail.stock || 0) / 100)
    },
    recordColumns() {
      return columns.map(it => ({
        ...it,
        align: it.align || 'center',
        ellipsis: it.ellipsis || true
      }))
    },
    modalComponent() {
      // console.log(this.fileForm)
      if (this.modalName === 'cfrm') return 'ConfirmForm'
      else if (this.modalName === 'sbdr') return 'ImportWord'
      // else if (this.modalName === 'agm') return 'Agreement'
      else return 'AuthForm'
    }
  },
  created() {
    this.id = this.$route.params.id
    if (this.id) {
      this.getDetail()
      this.getRecord()
    }
  },
  methods: {
    download() {
      window.open(`${window.location.origin}/绿电积分协议转让模板.docx`)
    },
    handleTableChange({ current, pageSize }) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize

      this.getRecord()
    },
    getDetail() {
      this.loading = true
      this.$api.trade
        .homePageAssetSaleDetail({
          assetSaleId: this.id
        })
        .then(res => {
          if (Object.keys(res).length) {
            this.detail = res
            this.downImg()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getRecord() {
      this.recordLoading = true
      this.$api.trade
        .assetSaleTradeRecord({
          assetSaleId: this.id,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        .then(res => {
          if (!res) res = { list: [], total: 0 }
          const { list, total } = res
          this.recordList = list
          this.pagination.total = total
        })
        .finally(() => {
          this.recordLoading = false
        })
    },
    // 在线购买
    buy() {
      if (this.valid() === 0){
      this.titleName = this.titleNames[0]
      this.modalName = 'cfrm'
      this.modalVisible = true
      }
    },
    // 协议购买
    agreementBuy() {
      if (this.valid() === 0) {
        const that = this
        this.$confirm({
          title: '温馨提示',
          content: '请准备好已签订的协议和相关支付凭证',
          onOk: function() {
            that.detail.titleName = that.titleNames[1]
            that.detail.quantity = that.num
            that.detail.assetSaleId = that.id
            that.$refs.refAgreement.show(that.detail)
          }
        })
      }
    },
    valid() {
      if (this.$store.state.user.userInfo.status !== 1||this.$store.state.user.userInfo.userType === 0||this.$store.state.user.userInfo.userType === 3){
        return this.$message.warn('没有已启用的账号用于交易')
      }else {
        return 0
      }
    },
    confirm() {
      this.modalName = 'auth'
    },
    close() {
      this.modalVisible = false
    },
    downImg() {
        const endPre = this.detail.imgUrl.substring(this.detail.imgUrl.indexOf('.'), this.detail.imgUrl.length)
        let type = 'application/pdf'
        if (endPre.includes('.jpg')) {
          type = 'image/jpg'
        }else if (endPre.includes('.jpeg')){
          type = 'image/jpeg'
        }else if (endPre.includes('.png')){
          type = 'image/png'
        }else {
          type = 'application/pdf'
        }
        var oReq = new XMLHttpRequest()
        oReq.open('POST', baseURL+'/api/common/oss/getOssImageUrls', true)
        oReq.responseType = 'blob'
        oReq.setRequestHeader('Authorization', Vue.ls.get(accessToken))
        oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        oReq.send(JSON.stringify({
          urls: [this.detail.imgUrl]
        }))
      var file1 = null
      var _this = this
      oReq.onreadystatechange = function() {

        if (oReq.readyState == 4) {
          if (oReq.status == 200 || oReq.status == 0) {
            file1 = new Blob([oReq.response], {
              type: type
            })
             blobToBase64(file1, this).then(res => {
              // 转化后的base64
               _this.ImgUrl = res
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.c-home-detail {
  .intro {
    margin-top: 30px;
  }
  .pic-wrap {
    width: 90%;
    height: 438px;
    line-height: 438px;
    margin: 0 auto;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  .infos {
    margin-bottom: 15px;
    list-style: none;
    font-size: 20px;
    li {
      height: 34px;
      line-height: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      + li {
        margin-top: 15px;
      }
    }
    .price-format {
      line-height: 34px;
    }
  }

  .buy-btn {
    width: 120px;
  }
  .tabs {
    margin-top: 40px;
    .abstract {
      padding: 20px 0;
      line-height: 24px;
      text-align: justify;
      text-indent: 2em;
    }
  }
}
</style>
