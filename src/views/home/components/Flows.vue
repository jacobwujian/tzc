<template>
  <a-row
    class="flows"
    type="flex"
    justify="center"
  >
    <a-col class="step s1">
      <router-link to="/help">
        <i class="iconfont iconxinshoubangzhu" />
        <span class="name">新手帮助</span>
      </router-link>
    </a-col>

    <a-col class="step s2">
      <router-link to="/login">
        <i class="iconfont iconzhuce" />
        <span class="name">注册</span>
      </router-link>
    </a-col>

    <a-col class="step s3">
      <a href="#ProductList">
        <i class="iconfont iconchanpin" />
        <span class="name">产品</span>
      </a>
    </a-col>

    <a-col class="step s4">
      <router-link to="/myassets">
        <i class="iconfont iconzichan" />
        <span class="name">资产</span>
      </router-link>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Flows',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang='less' scoped>
  .flows {
    flex-flow: nowrap;
    margin-bottom: 120px;
    justify-content: space-around;
    .step {
      display: flex;
      align-items: center;
      width: 228px;
      min-width: 228px;
      height: 97px;
      border-radius: 4px;
      > a {
        width: 100%;
        height: 100%;
        padding: 18px 24px;
      }
      &.s1 {
        background: #8793F4;
        .iconfont {
          color: #8793F4;
          font-size: 30px;
        }
        .name {
          &::after {
            right: -10px;
          }
        }
      }
      &.s2 {
        background: #FF7372;
        .iconfont {
          color: #FF7372;
          font-size: 26px;
        }
      }
      &.s3 {
        background: #00A1FF;
        .iconfont {
          color: #00A1FF;
          font-size: 26px;
        }
      }
      &.s4 {
        background: #4B8DFF;
        .iconfont {
          color: #4B8DFF;
          font-size: 30px;
        }
      }
    }
    .iconfont {
      display: inline-block;
      width: 60px;
      height: 60px;
      line-height: 60px;
      background: #fff;
      border-radius: 50%;
      text-align: center;
    }
    .name {
      display: inline-block;
      width: 108px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 24px;
      color: #fff;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: 14px;
        top: 11px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #fff;
      }
    }
  }
</style>
