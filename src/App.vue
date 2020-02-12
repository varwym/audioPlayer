<template>
  <div id="app">
    <router-view/>
    <div class="audio-seat"></div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
  @import "./styles/reset.less";
.audio-seat {
	width: 100%;
	height: 50px;
	background-color: white;
}
</style>
