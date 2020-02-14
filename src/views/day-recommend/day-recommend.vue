<template>
    <div v-if="songData !== null">
        <back-button 
            :isTransparent="true"
            :title="'歌单'"
            :isWhite="true"
            :click="goBack"
        />
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 40px; background-color: white;"></div>
        <div class="song-list-detail-container" :class="{onTopDetail: isTop}">
            <div :class="backgroundImg" :style="backgroundImgUrl">
            </div>
            <div class="song-list-detail">
                <div class="song-list-detail-intro">
                    <div class="song-list-detail-img">
                        <img :src="handleSongData.coverImgUrl">
                        <p>{{handleSongData.playCount}}</p>
                    </div>
                    <div class="song-list-detail-text">
                        <p>{{handleSongData.name}}</p>
                        <div>
                            <img :src="handleSongData.creator.avatarUrl">
                            <span>{{`${handleSongData.creator.nickname}&nbsp;>`}}</span>
                        </div>
                        <p>{{handleSongData.description}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="song-list-playAllButton" :class="{onTop: isTop}" @click="handlePlayAll">
            <img src="../../assets/play_button.png">
            <span>播放全部</span>
        </div>
        <div class="song-list-content" :style="{marginTop: isTop ? '260px' : '0px'}">
            <song-list-item v-for="(songItem, index) in handleSongData.tracks" :key="songItem.id" :isPlay="false" :title="songItem.alia[0] || songItem.name" :name="songItem.singer" :index="index + 1" @click.native="handlePlaySong"/>
        </div>
    </div>
</template>
<script>
import songListItem from "./components/song-list-item.vue";
import { discoverRequest } from '../../store/api';
import backButton from "../../components/back-button.vue";
export default {
    name: "day-recommend",
    components: {
        songListItem,
        backButton
    },
    computed: {
      handleSongData() {
          this.songData.playCount = this.songData.playCount.toString();
            if (this.songData.playCount.length >= 5 && this.songData.playCount.length <= 8) {
                this.songData.playCount = this.songData.playCount.substring(0, this.songData.playCount.length - 4) + '万';
            } else if (this.songData.playCount.length > 8) {
                this.songData.playCount = this.songData.playCount.substring(0, this.songData.playCount.length - 8) + '亿';
            }
            this.songData.tracks.forEach(item => {
                let nameCombination = "";
                item.ar.forEach(name => {
                    if (nameCombination) {
                        nameCombination += `/${name.name}`;
                    } else {
                        nameCombination += name.name;
                    }
                })
                item.singer = nameCombination;
            })
            return this.songData;
      },
      backgroundImg() {
          return {
              'song-list-detail-background-noImg': !this.handleSongData.backgroundCoverUrl,
              'song-list-detail-background': this.handleSongData.backgroundCoverUrl
          }
      }  
    },
    data() {
        return {
            songData: null,
            backgroundImgUrl: {
                backgroundImage: "url('')"
            },
            isTop: false   
        }
    },
    methods: {
      touchmove() {
          if (window.pageYOffset >= 170) {
              !this.isTop ? this.isTop = !this.isTop : null
          } else {
              this.isTop ? this.isTop = !this.isTop : null
          }
      },
      goBack() {
          this.$router.go(-1);
      },
      handlePlayAll() {
          console.log("播放全部")
      },
      handlePlaySong() {
          console.log("播放单个歌曲")
      }  
    },
    created() {
        
    },
    mounted() {
        discoverRequest.getSongDetail(this.$route.params.id)
            .then(res => {
                this.songData = res.data.playlist;
                this.backgroundImgUrl = { backgroundImage: `url('${this.songData.backgroundCoverUrl}')`};
                window.addEventListener("scroll", this.touchmove);
            })
            .catch(error => {
                console.log(error);
            })
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.touchmove);
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/day-recommend/day-recommend.less";

</style>