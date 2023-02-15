<template>
  <a-form-model
    ref="AssetsForm"
    :model="form"
    :rules="rules"
    v-bind="formItemLayout"
  >
    <a-form-model-item
      v-for="(item, index) in formItems"
      :key="index"
      :label="item.label"
      :prop="item.params"
    >
      <a-input
        v-if="item.type === 'input'"
        v-model.trim="form[item.params]"
        :max-length="item.max || -1"
        :placeholder="`请输入${item.label}`"
        allow-clear
        :disabled="notEditable || item.disabled||(item.params === 'username'&& modalName !== 'add')"
      />

      <a-input-password
        v-if="item.type === 'password'"
        v-model="form[item.params]"
        :placeholder="`请输入${item.label}`"
        :disabled="notEditable || item.disabled||(item.params === 'username'&& modalName !== 'add')"
      />

      <a-select
        v-if="item.type === 'select' && item.params === 'flag'"
        v-model="form[item.params]"
        :disabled="modalName !== 'add'"
        :placeholder="`请选择${item.label}`"
        :not-fount-content="null"
        allow-clear
        @popupScroll="handlePopupScroll"
      >
        <a-select-option
          v-for="option in item.scopedSlots.data"
          :key="`${option.value}`"
          :value="option.value"
        >
          {{ option.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-divider />

    <a-row class="btns-row">
      <a-col class="text-center">
        <a-space size="large">
          <a-button
            v-if="modalName !== 'view'"
            type="primary"
            html-type="submit"
            :loading="loading"
            @click="edit"
          >
            提交
          </a-button>
          <a-button
            @click="reset"
          >
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import {flagType} from '@/utils/typeEnum'
import {validateLoginLuRu} from '@/utils/validate'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

export default {
  props: {
    detail: {
      type: Object,
      default: null
    },
    modalName: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      formItemLayout,
      formItems: [
        {
          type: 'input',
          label: '机构名称',
          params: 'plantName',
          disabled: true
        }, {
          type: 'input',
          label: '年度',
          params: 'year',
          disabled: true
        }, {
          type: 'input',
          label: '碳排总量',
          params: 'carbonEmission',
          disabled: true
        }, {
          type: 'input',
          label: '实际配额量',
          params: 'actualQuota',
          disabled: true
        }, {
          type: 'input',
          label: '预发配额量',
          params: 'reserveQuota'
        }, {
          type: 'input',
          label: '结余配额量',
          params: 'balanceQuota'
        }, {
          type: 'input',
          label: '可交易配额量',
          params: 'tradeQuota',
          disabled: true
        }, {
          type: 'select',
          label: '清算状态',
          params: 'flag',
          scopedSlots: { customRender: 'flag', type: 'select', data: flagType }
        }
      ],
      dataSource: [
      ],
      form: {
        plantName: '',
        flag: undefined,
        year: '',
        carbonEmission: '',
        actualQuota: '',
        reserveQuota: '',
        tradeQuota:'',
        balanceQuota:''
      },
      loading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      list: [] // 角色列表
    }
  },
  computed: {
    rules() {
      return {
        reserveQuota: [
          { required: true, message: '请输入预发配额量', trigger: 'blur' },
          { validator: validateLoginLuRu, trigger: 'blur' }
        ],
        balanceQuota: [
          { required: true, message: '请输入结余配额量', trigger: 'blur' },
          { validator: validateLoginLuRu, trigger: 'blur' }
        ]
      }
    },
    notEditable() {
      return this.modalName === 'view'
    }
  },
  created() {
    if (this.modalName !== 'add' && Object.keys(this.detail).length) {
      this.initForm()
      this.list = [{
        id: this.detail.roleId,
        roleName: this.detail.roleName
      }]
    }
    this.getRoleList()
  },
  methods: {
    /* 初始化表单 */
    initForm() {
      for (const key in this.form) {
        if (key in this.detail) {
          this.form[key] = this.detail[key]
        }
      }
    },
    reset(){
      this.initForm()
    },
    edit() {
       this.$refs.AssetsForm.validate(valid => {
        if (!valid) return false
              this.loading = true
      this.$api.assetManagement.inputQuota({
        plantId: this.detail.id,
        ...this.form
      })
        .then(res => {
          this.$message.success('修改成功')
          this.$emit('close', true)
        })
        .finally(() => {
          this.loading = false
        })
        })

    },
    handlePopupScroll({ target }) {
      if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
        if (this.list.length < this.pagination.total) {
          this.pagination.pageNum++
          this.getroleList()
        }
      }
    },
    // 获取角色列表用于关联
    getRoleList(val) {
      this.loading = true
      const params = {
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      if (val) params.roleName = val
      this.$api.role.allRole(params)
        .then(res => {
          const { list, total } = res
          this.pagination.total = total
          if (Array.isArray(list)) {
            let newList = list.filter(item => item.status === 1)
            // 过滤已有角色 & 停用角色
            if (this.list && this.list.length) {
              const shiftRole = this.list[0]
              newList = newList.filter(item => item.id !== shiftRole.id && item.status === 1)
            }
            this.list.push(...newList)
          }
        }).finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
