<template>
  <a-modal :visible="isAgreement" :title="titleName" @ok="onUpload" @cancel="closeUpload" :width="700" :destroy-on-close="true" :mask-closable="false">
    <div class="c-confirm-form text-center">
      <a-row class="detail">
        <a-col class="text-right" :span="5">
          交易单价：
        </a-col>
        <a-col class="text-left" :span="5">
          <a-input prefix="￥" suffix="RMB" :default-value="agmPrice" v-model="agmPrice" />
        </a-col>
        <a-col class="text-right" :span="5">
          交易数量：
        </a-col>
        <a-col class="text-left" :span="6">
          <a-input v-model="details.quantity" :default-value="num" :disabled="true" />
        </a-col>
      </a-row>

      <a-form-model ref="importForm" :model="form" v-bind="formItemLayout">
        <a-form-model-item label="上传协议与付款凭证" prop="file" style="margin-left: 18px">
          <a-upload class="c-upload" :action="action" accept="image/*,.pdf" :before-upload="beforeUpload" :file-list="fileList" :multiple="multiple" :remove="delFileInOSS" @change="handleUploadChange"
            ><a-button> <a-icon type="upload" /> 上传 </a-button>
            <slot name="tip">
              <span class="upload-tip"> 支持文件格式：{{ fileTypeStr }}，文件不能超过{{ fileSize }}MB </span>
            </slot>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 11 }
}
export default {
  data() {
    return {
      titleName: '',
      details: {},
      isAgreement: false,
      formItemLayout,
      form: {
        // file: {}
        file: []
      },
      loading: false,
      // 单价
      agmPrice: Number,
      // 交易数量
      agmNum: Number,
      // 用于限制 上传个数 用来页面显示有几个文件
      fileList: [],
      flag: true,
      // 用于接收文件上传时返回的data
      fileArr: [],
      // 最终发送给后端的文件名数组
      fileNames: []
    }
  },
  props: {
    num: {
      type: Number,
      default: 1
    },
    // 地址
    action: {
      type: String,
      default: function() {
        return this.$api.login.uploadOSS()
      }
    },
    // 格式限制
    fileType: {
      type: Array,
      default: () => ['image/jpg', 'image/jpeg', 'image/png']
    },
    // 文件大小限制
    fileSize: {
      type: Number,
      default: 1
    },
    // 多个文件上传
    multiple: {
      type: Boolean,
      default: true
    },
    // 文件限制
    fileSuffix: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png', 'pdf']
    }
  },
  computed: {
    // 格式限制
    accept() {
      return this.fileType.join(',')
    },
    fileTypeStr() {
      let str = ''
      for (const item of this.fileSuffix) {
        str += `.${item} `
      }
      return str
    }
  },
  created() {},
  methods: {
    show(record) {
      this.isAgreement = true
      this.titleName = record.titleName
      this.details = record
      this.agmNum = record.num
      this.agmPrice = Number(record.price) / 10 / 10
    },
    // 当点击删除时 执行回调函数
    delFileInOSS(file, actionType) {
      const fileName = file && file.response && file.response.data

      if (!fileName) return false

      this.$api.ossCommon
        .ossdeleteFile({
          fileName
        })
        .then(res => {
          if (!res) return false

          // if (actionType !== 'replace') {
          //   this.reset()
          // }
        })
      this.fileArr = this.fileNames.splice(this.fileNames.indexOf(fileName), 1)
    },
    // reset() {
    //   console.log('执行了reset')
    //   console.log(this.fileList)
    // },

    // 上传时触发
    handleUploadChange(info) {
      if (!this.flag) return
      let List = [...info.fileList]
      if (List.length > 5) {
        this.$message.warning('文件最多上传5个')
        return false
      }
      let filterData = List.filter((item, index) => {
        if (item.response && item.response.data) {
          return item.response.data
        }
      })
      this.fileNames = filterData.map((item, index) => {
        if (item.response && item.response.data) {
          return item.response.data
        }
      })
      this.fileArr = clonedeep(this.fileNames)
      if (this.fileArr.length != List.length) {
        this.fileNames = clonedeep(this.fileArr)
      }
      // 点击删除上传成功的文件  页面也显示删除
      if (this.fileRemove) return (this.fileList = [])
      this.fileList = List
    },

    // 上传前判断
    beforeUpload(file) {
      this.flag = true
      const pattern = /\.{1}([A-Za-z]{1,})$/
      const suffix = pattern.exec(file.name)
      const isJpgOrPng = this.fileSuffix.includes(suffix[1].toLowerCase())
      if (!isJpgOrPng) {
        this.flag = false
        this.$message.error(`请上传${this.fileTypeStr}格式文件`)
      }

      const isLt2M = file.size / 1024 / 1024 < this.fileSize
      if (!isLt2M) {
        this.flag = false
        this.$message.error(`文件不能超过 ${this.fileSize}MB`)
        console.log('文件超大')
      }

      return this.flag
    },
    onUpload() {
      const that = this
      this.$api.device
        .protocolBuy({
          assetSaleId: this.details.assetSaleId,
          quantity: this.details.quantity * 10 * 10,
          price: this.agmPrice * 10 * 10,
          amount: Number(this.agmPrice * 10 * 10) * Number(this.details.quantity * 10 * 10),
          filesUrl: this.fileNames
        })
        .then(res => {
          if (res) {
            that.$message.success('提交成功，等待管理员审核！')
            that.isAgreement = false
            this.$store.dispatch('user/getUserInfo')
            this.$router.push('/ordermanagement')
          }
        })
        .finally(() => {
          // 最后清空数组
          this.fileList = []
          this.fileArr = []
          this.fileNames = []
        })
    },
    closeUpload() {
      // 清空数组
      this.fileList = []
      this.fileArr = []
      this.fileNames = []
      // 关闭视图
      this.isAgreement = false
    }
  }
}
</script>

<style lang="less" scoped>
.c-confirm-form {
  .detail {
    .ant-col {
      margin-bottom: 15px;
    }
    .text-right {
      margin-top: 5px;
    }
  }
}
.order-price {
  display: inline-block;
  /deep/ .ant-statistic-content-value-decimal {
    font-size: 18px;
  }
}

.c-upload {
  /deep/ .ant-upload-list-item-name {
    text-align: left;
  }
  .upload-tip {
    display: inline-block;
    width: 180px;
    line-height: 22px;
    margin-left: 10px;
    font-size: 12px;
    color: #999;
    vertical-align: middle;
  }
}
</style>
