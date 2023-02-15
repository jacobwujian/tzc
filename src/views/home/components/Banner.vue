<template>
  <a-carousel
    class="index-banner"
    dots-class="dots"
    autoplay
    :after-change="onChange"
  >
    <img
      src="../../../static/home/banner1.jpg"
      alt="banner1"
    >
    <img
      src="../../../static/home/banner2.jpg"
      alt="banner2"
    >

    <img
      src="../../../static/home/banner3.jpg"
      alt="banner3"
    >
  </a-carousel>
</template>

<script>
export default {
  name: 'IndexBanner',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    onChange() {}
  }
}
</script>

<style lang='less' scoped>
.index-banner {
  width: 100%;
  // height: 743px;
  margin-bottom: 110px;
  text-align: center;
  position: relative;
  /deep/.dots {
    height: 18px;
    bottom: -48px;
    li {
      button {
        width: 16px;
        height: 16px;
        border: 4px solid #006F6C;
        border-radius: 50%;
        opacity: .5;
        &:hover,
        &:focus {
          opacity: 1;
        }
      }
      + li {
        margin-left: 95px;
        &::before {
          content: '';
          position: absolute;
          top: 8px;
          right: 16px;
          width: 97px;
          height: 1px;
          background: rgba(0, 111, 108, .3);
        }
      }
      &.slick-active {
        button {
          opacity: 1;
        }
      }
    }
  }
}
</style>
