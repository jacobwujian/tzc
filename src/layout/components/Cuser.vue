<!-- 用户信息 -->
<template>
  <div class="admin-user flex-box">
    <div class="menus">
      <router-link
        v-for="(item, index) in [
          {
            name: '交易大厅',
            path: '/home'
          }
        ]"
        :key="`menu-${index}`"
        class="item"
        :to="item.path"
      >
        {{ item.name }}
      </router-link>
      <span v-if="$store.state.user&&$store.state.user.userInfo&&$store.state.user.userInfo.userType!==0&&$store.state.user.userInfo.userType!==3">
        <a-badge
          title="Custom hover text"
          :count="$store.state.count"
          class="badge"
        >
          <a-icon
            type="message"
            style="font-size: 25px"
            @click="$router.push('/adm/warning/warningInfo')"
          />
        </a-badge>
      </span>
    </div>
    <a-tooltip placement="left">
      <template slot="title">
        <span>{{ userInfo && userInfo.plant_name }}</span>
      </template>
      <span
        id="companyName"
        class="system textover"
      >{{ userInfo && userInfo.plant_name }}</span>
      <a
        style="color: red;margin-left: 5px"
        @click="exit"
      >
        <a-icon type="poweroff" />
      </a>
    </a-tooltip>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  components: {},
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    })
  },
  beforeCreate() {
    let that = this
    this.$api.warning.count().then(res => {
      that.$store.state.count = res
    })
  },
  methods: {
    exit() {
      this.$store.dispatch('user/logout')
      this.$api.user.logout().then( res => {
      })
    }
  }
}
</script>
<style lang="less" scoped>
.admin-user {
  .menus {
    margin-right: 0;
    .item {
      display: inline-block;
      line-height: 20px;
      font-size: 18px;
      padding-right: 17px;
      margin-right: 17px;
      position: relative;
      color: #0e0e0e;
      border-color: rgba(0, 0, 0, 0.25);
      border-width: 1px;
      border-style: none solid none none;
      + .item {
        &::before {
          content: '';
          position: absolute;
          top: 4px;
          left: 0;
          width: 1px;
          height: 13px;
          background: rgba(0, 0, 0, 0.25);
        }
      }
    }
    .badge{
      display: inline-block;
      line-height: 20px;
      font-size: 15px;
      margin-right: 15px;
      position: relative;
      color: #0e0e0e;
    }
  }
  .system{
    height: 20px;
    width: 120px;
    color: #405554;
    border-color: rgba(0, 0, 0, 0.25);
    border-width: 1px;
    font-size:18px;
    padding-left: 15px;
    line-height: 20px;
    border-style: none none none solid;
    div{
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #eee;
    }
  }
  .head-example {
     width: 42px;
     height: 42px;
     border-radius: 4px;
     background: #eee;
     display: inline-block;
   }
}

</style>
