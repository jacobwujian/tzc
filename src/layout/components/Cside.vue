<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo">
      <router-link :to="$cPath">
        碳排放辅助管理平台
      </router-link>
    </div>
    <a-menu
      v-model="name"
      theme="dark"
      :default-selected-keys="[$route.path]"
      :default-open-keys="[$route.path]"
      mode="inline"
    >
      <template v-for="Mitem in menulist">
        <a-sub-menu
          v-if="Mitem.children"
          :key="Mitem.path"
        >
          <span
            slot="title"
          ><a-icon :type="Mitem.icon" /><span>{{ Mitem.name }}</span></span>
          <a-menu-item
            v-for="Sitem in Mitem.children"
            :key="Sitem.path"
            @click="alink(Sitem.path)"
          >
            {{ Sitem.name }}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="Mitem.path"
          @click="alink(Mitem.path)"
        >
          <a-icon :type="Mitem.icon" />
          <span>
            {{ Mitem.name }}
          </span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    collapsed: {
      type: Boolean
    }
  },
  data(){
    return{
      name: []
    }
  },
  computed: {
    ...mapGetters({
      menulist: 'menu/menulist'
    })
  },
  watch:{
    $route(to){
      this.name = [to.path]
    }
  },
  methods: {
    alink(data){
      this.$router.push(data)
    }
  }
}
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  line-height: 32px;
  color: #ddd;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
