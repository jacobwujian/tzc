<template>
  <a-breadcrumb
    :routes="breadcrumblist"
    style="marginBottom:18px;"
  >
    <template
      slot="itemRender"
      slot-scope="{ route, routes }"
    >
      <template v-if="route.path">
        <span v-if="routes.indexOf(route) === routes.length - 1 || route.meta.noTouch">
          {{ route.meta.title }}
        </span>
        <span
          v-else
          :style="{cursor: 'pointer'}"
          @click="$router.push(route.path)"
        >
          {{ route.meta.title }}
        </span>
      </template>
    </template>
  </a-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      basePath: '/'
    }
  },
  computed: {
    ...mapGetters({
      breadcrumblist: 'permission/breadcrumb'
    })
  }
}
</script>

<style scoped>
.handpoint{
  cursor: pointer;
}
</style>
