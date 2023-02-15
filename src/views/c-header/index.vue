<!-- header -->
<template>
  <div class="index-main">
    <div class="header flex-box home-container">
      <div class="logo flex-box">
<!--        <img
          class="logo-img"
          src="../../static/home/logo_01.png"
          alt="logo"
        >-->
        <span class="name">碳排放辅助管理平台</span>
      </div>

      <transition
        name="fade-transform"
        mode="out-in"
      >
        <a-menu
          class="menus"
          mode="horizontal"
        >
          <a-menu-item
            v-for="item of menuList"
            :key="`menu-${item.enname}`"
            class="item"
          >
            <router-link :to="item.path">
              {{ item.name }}
            </router-link>
          </a-menu-item>

          <a-sub-menu
            key="menu-system"
            class="item"
            popup-class-name="menus-popup"
          >
            <span
              slot="title"
              @click="exit"
            >退出系统</span>
          </a-sub-menu>
        </a-menu>
      </transition>

      <div class="user flex-box">
        <i
          class="iconfont iconlist i-list"
          @click="isShowMenus = !isShowMenus"
        />
        <i
          class="iconfont iconuser i-avatar"
        />
        <a-tooltip placement="left">
          <template slot="title">
            <span>{{ userInfo && userInfo.plant_name }}</span>
          </template>
          <span
            id="plantName"
            class="name textover"
          >{{ userInfo && userInfo.plant_name }}</span>
        </a-tooltip>
      </div>
    </div>
    <Banner v-if="isShowMenus" style="padding-left: 7%" />
    <!--    <div class="sub-user flex-box home-container">
      <div class="name flex-1">
        <div class="title">
          用户
        </div>
        <div class="content">
          {{ plantName }}
        </div>
      </div>
      <div class="account flex-1 text-right" />
      <div class="account flex-3 text-right">
        <div class="title">
          年配额
        </div>
        <div class="content">
          {{ credentials }}<span class="unit">千瓦时</span>
        </div>
      </div>
    </div>-->
    <transition
      name="sade-transform"
      mode="out-in"
    >
      <a-menu
        :selected-keys="currentPath"
        class="menus1"
        mode="horizontal"
      >
        <a-menu-item
          v-for="item of menuList1"
          :key="`menu-${item.enname}`"
          class="item"
        >
          <router-link :to="item.path">
            {{ item.name }}
          </router-link>
        </a-menu-item>
        <a-sub-menu
          key="menu-system"
          class="item"
          popup-class-name="menus-green"
        >
          <span
            slot="title"
            @click="openGreen"
          >绿电认购</span>
        </a-sub-menu>
        <a-sub-menu
          key="menu-change"
          class="item"
          popup-class-name="menus-popup"
        >
          <span
            slot="title"
            @click="openChange"
          >绿色技术交易</span>
        </a-sub-menu>
      </a-menu>
    </transition>
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {localeString} from '@/utils/means'
import Banner from './components/Banner'
export default {
  components: {
    Banner
  },
  data() {
    return {
      isChangePwd: false,
      isShowMenus: true,
      subMenuCurrent: 0,
      menuList1: [
        {
          name: '首页',
          enname: 'home',
          path: '/home'
        },
        {
          name: '交易大厅',
          enname: 'dating',
          path: '/dating'
        },
        {
          name: '订单管理',
          enname: 'orderManagement',
          path: '/orderManagement'
        }
      ],
      menuList: [
        {
          name: '管理中心',
          enname: 'glzx',
          path: '/adm/index'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo'
    }),
    currentPath() {
      const menusCode = this.menuList1.map(item => item.enname)
      const currentPathName = this.$route.name
      if (menusCode.includes(currentPathName)) {
        return [`menu-${this.$route.name}`]
      }
      return ['menu-home']
    },
    credentials() {
      if (!this.userInfo || !this.userInfo.credentials) {
        return '--'
      }
      return localeString(this.userInfo.credentials)
    },
    plantName() {
      if (!this.userInfo || !this.userInfo.plant_name) {
        return '--'
      }
      return this.userInfo.plant_name
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    exit() {
      this.$store.dispatch('user/logout')
      this.$api.user.logout().then( res => {
      })
    },
    login() {
      this.$router.replace('/login')
    },
    openGreen(){
      window.open('http://121.5.150.148:8001/home')
    },
    openChange(){
      window.open('http://green.zjipx.com')
    }
  }
}
</script>
<style lang='less' scoped>
.index-main{
  // padding-bottom: 20px;
  .header{
    height: 98px;
    padding: 0 6.25vw;
    justify-content: space-between;
    background-color: #FBFBFB;

    .logo {
      width: 400px;
      align-items: center;
      .logo-img {
        width: 85px;
      }
      .name {
        margin-left: 1.25vw;
        font-size: 22px;
        color: #006F6C;
      }
    }

    .menus {
      margin-left: auto;
      background-color: transparent;
      border-bottom: 0;
      font-size: 20px;
      color: #000;
      .item {
        height: 98px;
        line-height: 98px;
        + .item {
          margin-left: 1.04vw;
        }
      }

      /deep/.ant-menu-item,
      /deep/.ant-menu-submenu,
      /deep/.ant-menu-submenu-title {
        &:hover {
          color: #006F6C;
          border-bottom-color: #006F6C;
        }
        > a {
          color: #000;
          &:hover {
            color: #006F6C;
          }
        }
      }

      /deep/.ant-menu-submenu-active,
      /deep/.ant-menu-item-selected {
        color: #006F6C;
        border-bottom-color: #006F6C;
      }
    }
    .user {
      margin-left: 5.21vw;
      align-items: center;
      .i-list { font-size: 20px; }
      .i-avatar {
        margin: 0 16px 0 32px;
        font-size: 24px;
      }
      .name {
        display: inline-block;
        max-width: 112px;
        font-size: 16px;
        color: #000;
      }
    }

    @media (max-width: 1366px) {
      .user {
        margin-left: 50px;
      }
    }
  }

  .sub-header {
    height: 66px;
    box-shadow: 0px 2px 4px 0px rgba(0, 145, 255, 0.1);
    li {
      position: relative;
      top: 1px;
      display: inline-block;
      height: 66px;
      line-height: 66px;
      margin-right: 96px;
      border-bottom: 3px solid transparent;
      border-radius: 3px;
      font-weight: 500;
      font-size: 16px;
      color: rgba(0, 0, 0, .6);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &.active,
      &:hover {
        border-color: #006F6C;
        font-weight: 600;
      }
    }
  }
  .menus1 {
    margin-left: 130px;
    background-color: transparent;
    border-bottom: 0;
    font-size: 16px;
    color: #000;
    margin-bottom: 20px;
    .item {
      height: 58px;
      line-height: 58px;
      margin-right: 120px;
      + .item {
        margin-left: 1.04vw;
      }
    }
    /deep/.ant-menu{
      font-size: 18px;
    }
    /deep/.ant-menu-item,
    /deep/.ant-menu-submenu,
    /deep/.ant-menu-submenu-title {
      &:hover {
        color: #628e7b;
        border-bottom-color: #628e7b;
      }
      > a {
        color: #000;
        &:hover {
          color: #628e7b;
        }
      }
    }

    /deep/.ant-menu-submenu-active,
    /deep/.ant-menu-item-selected {
      color: #628e7b;
      border-bottom-color: #628e7b;
    }
  }
  .sub-user {
    height: 108px;
    border-bottom: 1px solid #E9E9E9;
    align-items: center;
    justify-content: space-between;

    .title {
      height: 22px;
      line-height: 22px;
      margin-bottom: 10px;
      color: rgba(0, 0, 0, 0.45);
    }
    .content {
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.85);
    }
    .account {
      .content {
        font-size: 18px;
        letter-spacing: 4px;
      }
      .unit {
        height: 24px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 24px;
      }
      padding-left: 45px;
    }
  }
}

</style>