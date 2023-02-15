<template>
  <div>
    <WriteLimit v-if="$store.state.user&&$store.state.user.userInfo&&$store.state.user.userInfo.plantType === 1" />
    <NoThing v-if="$store.state.user&&$store.state.user.userInfo&&$store.state.user.userInfo.plantType === 2" />
  </div>
</template>

<script>
import NoThing from '@/views/check/WriteLimit/noThing'
import WriteLimit from '@/views/check/WriteLimit/writeLimit'

export default {
  name: 'Index',
  components: { NoThing, WriteLimit }
}
</script>

<style scoped>

</style>