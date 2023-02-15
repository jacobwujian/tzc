<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    class="c-layout-index"
  >
    <Cside :collapsed="collapsed" />
    <a-layout>
      <a-layout-header class="layout-header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <Cuser />
      </a-layout-header>

      <a-layout-content class="c-layout-content">
        <Cbreadcrumb />
        <transition
          v-if="$route.meta && $route.meta.noLayout"
          name="fade-transform"
          mode="out-in"
        >
          <router-view />
        </transition>
        <a-card
          v-else
          class="c-card"
        >
          <div class="c-card-title">
            {{ $route.meta.title }}
          </div>
          <transition
            name="fade-transform"
            mode="out-in"
          >
            <router-view />
          </transition>
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Cside from './components/Cside'
import Cbreadcrumb from './components/Cbreadcrumb'
import Cuser from './components/Cuser'
export default {
  components: {
    Cside,
    Cbreadcrumb,
    Cuser
  },
  data() {
    return {
      collapsed: false
    }
  },
  created() {}
}
</script>

<style scoped lang="less">
.c-layout-index {
  .c-layout-content {
    height: 100%;
    padding: 24px;
    margin: 0 16px;
    overflow: initial;
  }
  .c-card {
    min-height: calc(100% - 32px);
    .c-card-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}

#components-layout-demo-custom-trigger {
  height: 100%;
  .layout-header {
    background: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
