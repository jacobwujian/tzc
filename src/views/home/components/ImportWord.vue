<template>
  <a-form-model
    ref="importForm"
    :model="form"
    :rules="rules"
    v-bind="formItemLayout"
  >
    <a-form-model-item
      label=""
      prop="imgFile"
    >
      <CUploads
        :file-type="imgFileType"
        :file-suffix="['.doc','.docx','.png','jpg']"
        :is-auto-upload="false"
        button-name="上传"
        :file-list="form.imgFile"
        :file-size="1"
        part-name="imgFile"
        @on-file="resetImg"
      />
      <span
        slot="tip"
        style="margin-left: 8px"
      >
        上传协议与付款凭证：
      </span>
    </a-form-model-item>
    <a-divider />

    <a-row class="btns-row">
      <a-col class="text-center">
        <a-space size="large">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            @click="onUpload"
          >
            提交
          </a-button>
          <a-button @click="$emit('close')">
            取消
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

import CUpload from '@/components/base/c-upload'
import CUploads from '@/components/base/c-uploads'

export default {
  components: {
    CUploads
  },
  props:{
    form: {
      type: Object,
      default:() => {
        return {
          wordFile: [],
          imgFile: []
        }
      }
    }
  },
  data() {
    return {
      formItemLayout,
      wordFileType: [],
      imgFileType: ['.doc', '.docx', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.png', '.jpg'],
      loading: false
    }
  },
  computed: {
    rules() {
      return {
        file: [
          { required: true, message: '请导入word文件', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    download() {
      window.open(`${window.location.origin}/合约模板.doc`)
    },
    onUpload() {
      console.log(this.form)
      const formData = new FormData()
      formData.append('wordFile', this.form.wordFile)
      for(const imgFile in this.form.imgFile){
        if (this.form.imgFile.hasOwnProperty(imgFile))
        formData.append('imgFile', this.form.imgFile[imgFile].to)
      }
      formData.append('quantity', 10)
      formData.append('price', 123)
      formData.append('amount', 1254)
      formData.append('assetSaleId', 3123)
      this.$refs.importForm.validate(valid => {
        if (!valid) return false

        this.loading = true

        this.$api.trade.buy(formData).then(res => {
          this.$emit('close', true)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    getFileWord(file) {
      if (file) this.form.wordFile = file
      console.log(this.form)
    },
    resetImg(fileList){
      this.form.imgFile = fileList
      console.log(this.form)
    }
  }
}
</script>
