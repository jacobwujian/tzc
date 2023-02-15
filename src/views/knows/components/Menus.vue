<template>
  <div class="menus">
    <div class="title text-center">
      <i class="iconfont iconyonghuhui" />关于我们
    </div>
    <a-menu
      class="menu-item"
      :default-selected-keys="currentPath"
      mode="inline"
    >
      <a-menu-item
        v-for="item in menus"
        :key="item.key"
      >
        <router-link :to="item.path">
          <a-icon :type="item.icon" />
          {{ item.name }}
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      menus: [
        {
          key: 'about',
          icon: 'apartment',
          name: '了解我们',
          path: '/about'
        }, {
          key: 'help',
          icon: 'compass',
          name: '新手帮助',
          path: '/help'
        }, {
          key: 'contact',
          icon: 'contacts',
          name: '联系我们',
          path: '/contact'
        }
      ]
    }
  },
  computed: {
    currentPath() {
      return [this.$route.name]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang='less' scoped>
.menus {
  .title {
    line-height: 50px;
    font-size: 16px;
    background-color: #e8e8e8;
    .iconfont { margin-right: 15px; }
  }
  .menu-item {
    border-right: 0;
  }
}
</style>
