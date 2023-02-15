<template>
  <div>
    <a-form-model layout="inline" class="detail">
      <a-row :gutter="16" class="contentOne">
        <a-col :span="6">
          <a-form-model-item label="机构名称:">{{ this.form.plantName }} </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="行业类别:">{{ this.form.plantType }} </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="所属地区:">{{ this.form.plantArea }} </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="16" class="contentOne">
        <a-col :span="6">
          <a-form-model-item label="年度:"> {{ this.form.year }} </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="联系人:"> {{ this.form.contact }} </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label="电话:"> {{ this.form.phone }} </a-form-model-item>
        </a-col>
      </a-row>
      <!-- :rowKey="dataSource => dataSource.id" -->
      <a-table
        class="table"
        :loading="loading"
        :rowKey="
          (record, index) => {
            return index
          }
        "
        :columns="columns"
        :bordered="true"
        :dataSource="dataSource"
      >
      </a-table>
    </a-form-model>
    <a-divider />
    <div class="back">
      <a-button type="primary" @click="$router.go(-1)">
        返回
      </a-button>
    </div>
  </div>
</template>

<script>
import { codeToText, ZJoptions } from '@/utils/cascader-address-options'

export default {
  data() {
    return {
      codeToText,
      loading: false,
      form: {
        plantName: '',
        plantType: null,
        plantArea: '',
        year: '',
        contact: '',
        phone: ''
      },
      plantId: null,
      // 表格数据
      dataSource: [],
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          },
          width: 50
        },
        {
          title: '关系类型',
          align: 'center',
          dataIndex: 'type',
          width: 90
        },
        {
          title: '额度',
          align: 'center',
          dataIndex: 'quota',
          width: 90
        },
        {
          title: '关系电厂',
          align: 'center',
          dataIndex: 'rplantName',
          width: 90
        },
        {
          title: '行业类别',
          align: 'center',
          dataIndex: 'rplantType',
          width: 90
        },
        {
          title: '所属地区',
          align: 'center',
          dataIndex: 'rplantArea',
          width: 90
        },
        {
          title: '联系人',
          align: 'center',
          dataIndex: 'rcontact',
          width: 90
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'rphone',
          width: 90
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
          width: 90
        }
      ]
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.plantId = this.$route.params.id
    }
    this.query()
  },
  methods: {
    query() {
      this.loading = true
      this.$api.quota
        .getWriteOffInfoDetail({
          plantId: this.plantId,
          year: 2021
        })
        .then(res => {
          this.dataSource = res.list
          this.dataSource.forEach(item => {
            // 行业类别
            if (item.plantType == 1) {
              item.plantType = '火电'
            } else if (item.plantType == 2) {
              item.plantType = '水电'
            } else if (item.plantType == 3) {
              item.plantType = '核电'
            } else if (item.plantType == 4) {
              item.plantType = '风电'
            } else if (item.plantType == 5) {
              item.plantType = '热电联产'
            }
            // 地址
            if (item.plantArea != null) {
              item.plantArea = codeToText(item.plantArea)
            }
            if (item.rplantArea != null) {
              item.rplantArea = codeToText(item.rplantArea)
            }
            // 关系类型
            if (item.type == 1) {
              item.type = '年配额'
            } else if (item.type == 2) {
              item.type = '购入'
            } else if (item.type == 3) {
              item.type = '售出'
            } else if (item.type == 4) {
              item.type = '核销'
            }
            // 关系行业类别
            if (item.rplantType == 1) {
              item.rplantType = '火电'
            } else if (item.rplantType == 2) {
              item.rplantType = '水电'
            } else if (item.rplantType == 3) {
              item.rplantType = '核电'
            } else if (item.rplantType == 4) {
              item.rplantType = '风电'
            } else if (item.rplantType == 5) {
              item.rplantType = '热电联产'
            }
            // 创建时间
            if (item.createTime != null) {
              item.createTime = this.$dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
            }
          })

          this.form.plantName = this.dataSource[0].plantName
          this.form.plantType = this.dataSource[0].plantType
          this.form.plantArea = this.dataSource[0].plantArea
          this.form.year = this.dataSource[0].year
          this.form.contact = this.dataSource[0].contact
          this.form.phone = this.dataSource[0].phone
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .contentOne {
    // border: 1px solid;
    padding-left: 20%;
  }
  .table {
    margin-top: 50px;
  }
}
.back {
  width: 100%;
  text-align: center;
}
</style>
