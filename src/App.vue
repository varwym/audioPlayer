<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <audio-player></audio-player>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { discoverRequest } from "./store/api.js";
import audioPlayer from "./views/audio-player/audio-player.vue";
export default {
  components: {
    audioPlayer
  }
}
</script>
<style lang="less">
  @import "./styles/reset.less";
#app {
  height: 100%;
}
.audio-seat {
	width: 100%;
	height: 50px;
	background-color: white;
}
</style>
