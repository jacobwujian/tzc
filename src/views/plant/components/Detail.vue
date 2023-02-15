<template>
  <div class="org-detail">
    <template v-for="(item, index) in detailItems">
      <p
        v-if="item.title === ''"
        :key="index + 10086"
      >
        <a-layout
          v-for="(child, i) in item.childTables"
          :key="`${index}-${i}`"
        >
          <a-layout-sider
            width="100"
            class="bacYellow borderLine"
          >
            {{ child.title }}
          </a-layout-sider>
          <a-layout-content>
            <a-card>
              <template v-for="(echild, j) in child.children">
                <a-card-grid
                  :key="`${index}-${i}-${j}-1`"
                  class="bacYellow "
                  style="width:16.66%;text-align:center"
                >
                  {{ echild.label }}
                </a-card-grid>
                <a-card-grid
                  :key="`${index}-${i}-${j - 2}`"
                  style="width:16.66%;text-align:center"
                >
                  <template v-if="echild.dataSource && detail[echild.key] !== null">
                    {{ EnumMap(echild.dataSource, +detail[echild.key]) }}
                  </template>
                  <template v-else-if="echild.type === 'areas'">
                    {{ codeToText(detail[echild.key]) }}
                  </template>
                  <template v-else-if="echild.type === 'time'">
                    {{ detail[echild.key] && $dayjs(detail[echild.key]).format('YYYY年MM月DD日') }}
                  </template>
                  <template v-else-if="echild.type === 'precisionNum'">
                    {{ (detail[echild.key] || 0) }}
                  </template>
                  <template v-else>
                    {{ detail[echild.key] }}
                  </template>
                </a-card-grid>
              </template>
            </a-card>
          </a-layout-content>
        </a-layout>
      </p>
      <a-descriptions
        :key="index"
        :title="item.title"
      >
        <a-descriptions-item
          v-for="(child, i) in item.children.filter(e=>{if (detail.plantType === 2){if (e.key ==='type'||e.key ==='plantAttr'){return false} else{return true} }else {return true}})"
          :key="`${index}-${i}`"
          :label="child.label"
        >
          <template v-if="child.dataSource && detail[child.key] !== null">
            {{ EnumMap(child.dataSource, +detail[child.key]) }}
          </template>
          <template v-else-if="child.type === 'areas'">
            {{ codeToText(detail[child.key]) }}
          </template>
          <template v-else-if="child.type === 'time'">
            {{ detail[child.key] && $dayjs(detail[child.key]).format('YYYY年MM月DD日') }}
          </template>
          <template v-else-if="child.type === 'precisionNum'">
            {{ (detail[child.key] || 0) }}
          </template>
          <span
            v-else
            class="breakText"
          >
            {{ detail[child.key] }}

            <template v-if="detail[child.key] && child.unit">
              {{ child.unit }}
            </template>

            <a-button
              v-if="child.key === 'plantLicenseUrl' && detail[child.key]"
              type="link"
              @click="download(detail[child.key])"
            >
              下载
            </a-button>
          </span>
        </a-descriptions-item>
      </a-descriptions>

      <a-divider
        v-if="index < detailItems.length - 1"
        :key="`d-${index}`"
      />
    </template>

    <a-divider />

    <a-row class="btns-row">
      <a-col class="text-center">
        <a-space size="large">
          <a-button
            type="primary"
            @click="$emit('close')"
          >
            返回
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  orgTypes,
  reviewType,
  EnumMap,
  plantType,
  plantArr,
  unitProperty,
  epCode,
  managementDepartment,
  plantTypeT
} from '@/utils/typeEnum'
import { codeToText } from '@/utils/cascader-address-options'
import Vue from 'vue'
import {baseURL, accessToken} from '@/utils/constant'
const detailItems = [
  {
    title: '用能信息',
    children: [
      {
        key: 'carbonEmission',
        label: '碳排总量(吨:t)'
      },
      {
        key: 'actualQuota',
        label: '本年度实际配额'
      },
      {
        key: 'tradeQuota',
        label: '当前可交易配额'
      }
    ]
  },
  {
    title: '基本信息',
    children: [
      {
        key: 'plantName',
        label: '机构名称'
      },
      {
        key: 'plantArea',
        label: '机构地区',
        type: 'areas'
      },
      {
        key: 'address',
        label: '机构地址'
      },
      {
        key: 'plantType',
        label: '机构类型',
        dataSource: plantTypeT
      },
      {
        key: 'companyName',
        label: '管理主管部门',
        dataSource: managementDepartment
      },
      // {
      //   key: 'epCode',
      //   label: '购电层级',
      //   dataSource: epCode
      // },
      {
        key: 'legalPerson',
        label: '法定代表人'
      },
      // {
      //   key: 'legalPersonIdCard',
      //   label: '法人身份证号'
      // },
      {
        key: 'contact',
        label: '联系人'
      },
      {
        key: 'phone',
        label: '联系电话'
      },
      {
        key: 'mail',
        label: '电子邮箱'
      },
      {
        key: 'postalCode',
        label: '邮政编码'
      },
      {
        key: 'plantLicenseUrl',
        label: '营业执照'
      },
      {
        key: '',
        label: ''
      },
      {
        key: 'plantLicense',
        label: '企业信用代码'
      },
      {
        type: 'time',
        key: 'issuanceDate',
        label: '发证日期'
      },
      {
        type: 'time',
        key: 'expiredDate',
        label: '许可证失效时间'
      }
    ]
  },
  {
    title: '电厂信息',
    children: [
      {
        key: 'type',
        label: '行业类别',
        dataSource: plantType
      },
      {
        key: 'unitProperty',
        label: '单位性质',
        dataSource: unitProperty
      },
      {
        key: 'plantAttr',
        label: '电厂性质',
        dataSource: plantArr
      },
      {
        key: 'registeredCapital',
        label: '注册资本'
      }
    ]
  },
  {
    title: '区块链身份信息',
    children: [
      // {
      //   key: 'userId',
      //   label: '账户ID'
      // },
      {
        key: 'publicKeyAddress',
        label: '公钥地址'
      },
       {
        key: ''
      },
      {
        key: 'chainAddress',
        label: '身份合约地址'
      }
    ]
  },
  {
    title: '审核信息',
    children: [
      {
        key: 'approveResult',
        label: '审核结果',
        dataSource: reviewType
      },
      {
        key: 'approveRemark',
        label: '审核备注'
      }
    ]
  }
]

export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      orgTypes,
      reviewType,
      EnumMap,
      codeToText,
      detailItems,
      detail: {}
    }
  },
  created() {
    if (this.id) this.getDetail()
  },
  methods: {
    getDetail() {
      this.$api.plant
        .baseInfoPlant({
          id: this.id
        })
        .then(res => {
          if (res && Object.keys(res).length) {
            this.detail = res
            if (this.detail.checkPlantDto) {
              this.$set(this.detail, 'approveResult', this.detail.checkPlantDto.approveResult)
              this.$set(this.detail, 'approveRemark', this.detail.checkPlantDto.approveRemark)
            }
            this.detail.minAnnual = this.detail.annual - this.detail.remainAnnual
          }
        })
    },
    download(file) {
      if (file) {
        const endPre = file.substring(file.indexOf('.'), file.length)
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

        oReq.onload = function() {
          var file1 = new Blob([oReq.response], {
            type: type
          })

          if (navigator.msSaveBlob) {
            return navigator.msSaveBlob(file1, file)
          }

          window.open(window.URL.createObjectURL(file1))

        }
        oReq.send(JSON.stringify({
          urls: [file]
        }))
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bacYellow {
  background-color: yellow;
}
.borderLine {
  border: #0b1918 1px solid;
  text-align: center;
  vertical-align: center;
  font-size: 30px;
  width: 60px;
  padding: 10px;
}
.ant-card-grid {
  padding: 2px;
  font-size: 20px;
  overflow: hidden;
  height: 40px;
  border: #0b1918 1px solid;
}
</style>
