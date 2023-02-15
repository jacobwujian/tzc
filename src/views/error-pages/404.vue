<template>
  <div class="err">
    <a-empty description="页面没找到" />
  </div>
</template>

<script>
import {Empty} from 'ant-design-vue'
export default {
  components: {
    [Empty.name]: Empty
  }
}
</script>

<style scoped>
.err{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
