<template>
  <div class="index-title">
    <i
      class="iconfont"
      :class="icon"
    />
    <span class="name">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'IndexTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'iconfahangzongliang'
    }
  }
}
</script>

<style lang='less' scoped>
.index-title {
  width: 100%;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  border-bottom: 1px solid #E9E9E9;
  .iconfont {
    width: 16px;
    height: 25px;
    margin-right: 14px;
    font-size: 24px;
    color: #006F6C;
  }
  .name {
    height: 24px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);;
    font-size: 18px;
  }
}
</style>
