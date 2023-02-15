<template>
  <div class="knows-wrap">
    <div class="home-container">
      <div class="flex-box knows-inner">
        <Menus class="menus-wrap" />

        <div class="content-wrap">
          联系我们
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menus from './components/Menus'

export default {
  name: 'Contact',
  components: {
    Menus
  }
}
</script>

<style src="@/styles/knows.less" lang='less' scoped></style>
