<template>
  <div>
    <Header />
    <Nav />
    <div class="home_list">
      <Banner />
      <h5 class="home_title">推荐歌单<span>&nbsp;></span></h5>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/home/Header.vue';
import Nav from '@/components/home/Nav.vue';
import Banner from '@/components/home/Banner.vue';
export default {
  name: 'Home',
  components: {
    Header,
    Nav,
    Banner
  }
}
</script>
<style lang="less" scoped>
@import "../styles/home/common.less";
</style>
