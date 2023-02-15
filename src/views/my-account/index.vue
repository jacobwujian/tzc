<!-- 我的账户 -->
<!--<template>
  <div class="home-container">
    <c-detail
      :form="form"
      type="vertical"
      :column="4"
      class="pt-50"
    />
    <div class="price">
      <p>资产数量</p>
      <div>
        <div class="">
          所持凭证数：
        </div>
        <div class="content">
          {{ credentials }}<span class="unit">张</span>
        </div>
        <div class="right">
          <a href="#ProductList">
            <a-button @click="gotohome">
              购买
            </a-button>
          </a>
          <a-button @click="gotomyassets">
            核销
          </a-button>
        </div>
      </div>
    </div>
    <div class="list">
      <p>核销记录</p>
    </div>
    <c-page
      ref="base"
      :columns="columns"
      :data="data"
      :search-type="searchType"
      @fetch="fetch"
    />
    <!-- <a-modal
      v-model="visible"
      title="输入金额"
      width="400px"
      :destroy-on-close="true"
      :after-close="()=> price = ''"
      :confirm-loading="loading"
      @ok="handleOk"
    >
      <a-form-model
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        :colon="false"
      >
        <a-form-model-item
          :label="visibleType === 'recharge' ? '充值金额' : '提现金额'"
        >
          <a-input-number
            v-model="price"
            placeholder="请输入金额"
            :min="0"
            :precision="2"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal> -->
<!--  </div>
</template>

<script>
import {payStatus, dealType, EnumMap, verificationAuditType} from '@/utils/typeEnum'
import {mapGetters} from 'vuex'
import {localeString} from '@/utils/means'


export default {
  data() {
    return {
      localeString,
      price: '',
      visible: false,
      visibleType: '',
      loading:false,
      searchType: [
       {
          type: 'input',
          params: 'relateProject',
          placeholder: '请输入',
          label: '关联项目'
        },
        {
          type: 'datePicker',
          params: 'create',
          label: '核销时间'
        },
        {
          type: 'select',
          params: 'status',
          placeholder: '请选择',
          label: '状态',
          data: verificationAuditType
        }
      ],
      columns: [
       {
          title: '序号',
          scopedSlots: { customRender: 'no' }
        },
        {
           title: '核销企业',
           dataIndex: 'companyName'
        },
        {
           title: '核销数量',
          dataIndex: 'checkCount',
          scopedSlots: { customRender: 'precisionNum' }
        },
        {
          title: '核销时间',
          dataIndex: 'verificationTime',
          scopedSlots: { customRender: 'verificationTime', type: 'time' }
        },
       {
          title: '关联项目',
          dataIndex: 'projectName'
        },
        {
          title: '所属地区',
          dataIndex: 'projectArea',
          scopedSlots: { customRender: 'projectArea', type: 'area' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status', type: 'select', data: verificationAuditType }
        }
      ],

      data: [],
      form: [
        {
          title: '账户信息',
          list: [
            {
              label: '企业名称',
              key: 'companyName',
              value: ''
            },
            {
              label: '统一社会信用代码',
              key: 'socialCreditCode',
              value: ''
            },
            {
              label: '联系人',
              key: 'contact',
              value: ''
            },
            {
              label: '联系人方式',
              key: 'contactWay',
              value: ''
            },
            {
              label: '链上账户名',
              key: 'realName',
              value: ''
            },
            {
              label: '链上身份',
              key: 'chainAddress',
              value: ''
            },
            {
              label: '公钥地址',
              key: 'publicKeyAddress',
              value: ''
            },
            {
              label: '链上ID',
              key: 'chainId',
              value: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    }),
    credentials() {
      if (!this.userInfo || !this.userInfo.credentials) {
        return '--'
      }

      return localeString(this.userInfo.credentials / 100)
    }
  },
  watch: {},
  created() {
    this.getAccountDetail()
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    gotohome(){
      this.$router.push({
        path:'/home',
        query:{
          To:'ProductList'
        }
      })
    },
    gotomyassets(){
      this.$router.replace('/myassets')
    },
    getAccountDetail() {
      this.$api.user
          .accountDetail()
          .then((res) => {
            this.form[0].list.forEach(item => {
              item.value=res[item.key]
            })
          })
    },
    fetch(params) {
      this.$api.trade.rechargeWithdrawList(params)
        .then(res => {
          if(!res) res = {list: [], total: 0}
          this.data = res.list
          this.$refs.base.fetchSuccess(res.total)
        })
        .finally(() => {
          this.$refs.base.fetchFinally()
        })
    },
    openModel(type) {
      this.visibleType = type
      this.visible = true
    }
    //充值
    // handleOk() {
    //   if(!this.price) return this.$message.error('请输入金额')
    //   if( this.visibleType === 'recharge' && this.price >= 1000000 )
    //   return this.$message.error('单笔最大充值金额为100万')
    //   if(this.visibleType === 'withdraw' && this.price > this.balance)
    //   return this.$message.error('您当前的提现金额大于账户余额')
    //   this.loading = true
    //   this.$api.trade[this.visibleType]({
    //     [`${this.visibleType}Money`]: this.price * 100
    //   }).then(res => {
    //     this.$store.dispatch('user/getUserInfo')
    //     this.visible = false
    //     setTimeout(() => {
    //       this.loading = false
    //     }, 500)
    //     this.visibleType = ''
    //     this.$refs.base.fetch()
    //   }).catch(res => {
    //   this.loading = false
    //   })
    // }
  }
}
</script>
<style lang='less' scoped>
.price{
  p{
    font-size: 18px;
    font-weight: 500;
  }
  >div{
    display: flex;
    align-items: center;
    .left{
      font-size: 16px;
    }
    .right{
      margin-left: 30px;
      button{
        margin-right: 10px;
      }
    }
  }
}
.list{
  font-size: 18px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 20px;
}

/deep/.ant-input-number{
  width: 100%;
}
</style>-->