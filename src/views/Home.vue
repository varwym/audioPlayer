<template>
  <div>
    <Header />
    <Nav />
    <div class="home_list">
      <Banner />
      
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
