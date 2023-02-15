<template>
  <div class="c-confirm-form text-center">
    <a-row class="detail">
      <a-col
        class="text-right"
        :span="12"
      >
        单价：
      </a-col>
      <a-col
        class="text-left"
        :span="12"
      >
        {{ price /10 /10 }} RMB
      </a-col>
      <a-col
        class="text-right"
        :span="12"
      >
        数量：
      </a-col>
      <a-col
        class="text-left"
        :span="12"
      >
        {{ num }}
      </a-col>
      <a-col
        class="text-right fs-18"
        :span="12"
      >
        订单金额：
      </a-col>
      <a-col
        class="text-left fs-18"
        :span="12"
      >
        <a-statistic
          class="order-price"
          :precision="2"
          :value="orderPrice"
          :value-style="{
            fontSize: '18px'
          }"
        />
        RMB
      </a-col>
    </a-row>

    <div class="btns-row">
      <a-space size="large">
        <a-button
          type="primary"
          @click="$emit('confirm')"
        >
          确认
        </a-button>
        <a-button
          @click="$emit('close')"
        >
          关闭
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: [String, Number],
      default: 0
    },
    num: {
      type: Number,
      default: 1
    }
  },
  computed: {
    orderPrice() {
      return +(this.price / 10 /10) * this.num
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
  }
}
.order-price {
  display: inline-block;
  /deep/ .ant-statistic-content-value-decimal { font-size: 18px; }
}
</style>
