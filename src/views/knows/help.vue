<template>
  <div class="knows-wrap">
    <div class="home-container">
      <div class="flex-box knows-inner">
        <Menus class="menus-wrap" />

        <div class="content-wrap">
          <h2>1、注册</h2>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHd0Cq.png"
            width="1078px"
            height="544px"
          >
          <p>（1）通过登录入口寻找注册页面，点击“用户注册”进入新用户注册页面</p>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHdjPI.png"
            width="1078px"
            height="544px"
          >
          <p>
            （2）在注册页面填写详细信息，上传自己的信息用来注册完成注册信息验证，生成自己的账户。
            （3）提交并验证您的注册信息，完成注册拥有唯一绿证账户。
          </p>

          <h2>2、直接购买绿证</h2>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHwZR0.png"
            width="1078px"
            height="544px"
          >
          <p>（1）进入首页，浏览感兴趣的绿证产品和公司信息。如有意购买，点击“查看详情”进入详情页。</p>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHwUsO.png"
            width="1078px"
            height="544px"
          >
          <p>（2）查看您所需要的绿证产品，了解产品的详情和内容。</p>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHwsJI.png"
            width="1078px"
            height="544px"
          >
          （3）提交您所选购的绿证产品，生成订单并检查订单内容，确认无误后可进行支付操作。获得选购的绿证产品，完成本次交易。

          <h2>3、协商购买绿证</h2>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHwZR0.png"
            width="1078px"
            height="544px"
          >
          <p>（1）浏览感兴趣的绿证产品和公司信息。如有意购买，点击“查看详情”进入详情页。</p>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHwROS.png"
            width="1078px"
            height="544px"
          >
          <p>（2）查看您所需要的绿证产品，了解产品的详情和内容，并选择下载协议</p>
          <img
            src="https://z3.ax1x.com/2021/09/08/hHwTWq.png"
            width="1078px"
            height="544px"
          >
          （3）提交您所选购的绿证产品，上传协议生成订单并检查订单内容，确认无误后可进行支付操作。获得选购的绿证产品，完成本次交易。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menus from './components/Menus'

export default {
  name: 'Help',
  components: {
    Menus
  }
}
</script>

<style src="@/styles/knows.less" lang='less' scoped></style>
