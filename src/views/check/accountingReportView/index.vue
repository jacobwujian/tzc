<template>
  <div>
    <accounting-report v-if="$store.state.user&&$store.state.user.userInfo&&$store.state.user.userInfo.plantType === 1" />
    <accounting-report-city v-if="$store.state.user&&$store.state.user.userInfo&&$store.state.user.userInfo.plantType === 2" />
  </div>
</template>

<script>
import accountingReport from '@/views/check/accountingReportView/accountingReport'
import accountingReportCity from '@/views/check/accountingReportView/accountingReportCity'

export default {
  name: 'Index',
  components: { accountingReport, accountingReportCity }
}
</script>

<style scoped>

</style>