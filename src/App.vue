<template>
  <div id="app">
    <navigation />
    <router-view/>
  </div>
</template>
<script>
import navigation from './components/navigation';
export default {
  components: {
    navigation
  }
}
</script>
<style lang="less">
  @import "./styles/reset.less";
</style>
