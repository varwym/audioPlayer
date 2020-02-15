<template>
  <div id="app">
    <router-view/>
    <!-- <div class="audio-seat"></div> -->
    <audio class="audio" src="http://m8.music.126.net/20200216011651/8bcf95a7e76b64831eaad68723da4d05/ymusic/0059/5453/540e/7365f22d22c9a3e37150cde252d30e2f.mp3"></audio>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { discoverRequest } from "./store/api.js";
export default {
  computed: mapState({
    isPlay: state => state.audio.isPlay
  }),
  data() {
    return {
      songUrl: "http://m8.music.126.net/20200216011651/8bcf95a7e76b64831eaad68723da4d05/ymusic/0059/5453/540e/7365f22d22c9a3e37150cde252d30e2f.mp3",
      isFirst: true
    }
  },
  provide() {
    return {
      playSong: this.playSong
    }
  },
  mounted() {
    this.hackAudio();
    this.saveAudio(document.querySelector(".audio"));
    // this.startPlayer();
    // var audio = document.querySelector(".audio");
    // audio.oncanplay = (e) => {
    //   audio.play();
    // }
    
  },
  methods: {
    clickhack() {
      console.log("播放")
      document.querySelector('.audio').play();
      // document.querySelector('.audio').pause();
    },
    hackAudio() {
      document.querySelector("#app").addEventListener("touchstart", this.clickhack);
    },
    playSong(id) {
      console.log("播放音乐")
      discoverRequest.getSong(id)
        .then(res => {
          if (res.status === 200) {
              document.querySelector('.audio').src = res.data.data[0].url;
              document.querySelector('.audio').play();
          }
        })
    },
    ...mapActions([
      'startPlayer',
      'saveAudio'
    ])
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
