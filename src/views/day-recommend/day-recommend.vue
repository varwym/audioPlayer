<template>
    <transition :name="typeof(this.$route.query.songData) !== 'string' ? 'push' : ''">
        <div class="day-list" v-if="songData !== null">
            <back-button 
                :isTransparent="true"
                :title="'歌单'"
                :isWhite="true"
                :click="goBack"
            />
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 40px; background-color: white;"></div>
            <div class="song-list-detail-container" :class="{onTopDetail: isTop}" :style="{opacity: topOpacity}">
                <div :class="backgroundImage" :style="backgroundImgUrl">
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
                <img src="../../assets/black_play_button.png">
                <span>播放全部</span>
            </div>
            <div class="song-list-content" :style="{marginTop: isTop ? '260px' : '0px'}">
                <song-list-item v-for="(songItem, index) in handleSongData.tracks" :key="songItem.id" :isPlay="songItem.id === song.id ? true : false" :title="songItem.alia[0] || songItem.name" :name="songItem.singer" :index="index + 1" @click.native="handlePlaySong(songItem.id, index)"/>
            </div>
        </div>
    </transition>
</template>
<script>
import songListItem from "./components/song-list-item.vue";
import { discoverRequest } from '../../store/api';
import backButton from "../../components/back-button.vue";
import { audioMixin } from "../audio-player/components/audioMixin";
import { mapState, mapActions } from "vuex";
export default {
    name: "day-recommend",
    components: {
        songListItem,
        backButton
    },
    mixins: [audioMixin],
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
      backgroundImage() {
          return {
              'song-list-detail-background-noImg': !this.handleSongData.backgroundCoverUrl,
              'song-list-detail-background': this.handleSongData.backgroundCoverUrl
          }
      },
      backgroundImgUrl() {
          return { backgroundImage: `url('${this.songData.backgroundCoverUrl || this.songData.coverImgUrl}')`};
      },
      playId() {
            return this.songData.tracks[this.index]
      },
      ...mapState({
          songList: state => state.audio.songList,
          songIndex: state => state.audio.index,
          song: state => state.audio.song
      })  
    },
    data() {
        return {
            songData: null,
            isTop: false,
            topOpacity: 1   
        }
    },
    methods: {
      touchmove() {
          if (window.pageYOffset >= 170) {
              !this.isTop ? this.isTop = !this.isTop : null
          } else {
              this.topOpacity = 1 - window.pageYOffset / 250; 
              this.isTop ? this.isTop = !this.isTop : null
          }
      },
      goBack() {
          this.$router.go(-1);
      },
      handlePlayAll() {
          this.addSongList({
              list: this.handleSongData,
              index: 0
          });
          this.playSong(this.song.id);
      },
      checkList(val, oldval) {
          for (let i=0; i<val.length; i++) {
              if (val[i].id !== oldval.tracks[i].id) {
                  return false
              }
          }
          return true;
      },
      handlePlaySong(id, index) {
          if (this.songList && this.songList.length === this.handleSongData.tracks.length && this.checkList(this.songList, this.handleSongData)) {
              if (this.song.id === id) {
                  this.checkShowState(0);
                  return
              } 
              this.checkIndex(index);
              this.playSong(id);       
          } else {
              let newList = [];
              this.handleSongData.tracks.forEach(item => {
                    let nameCombination = "";
                    item.ar.forEach(name => {
                        if (nameCombination) {
                            nameCombination += `/${name.name}`;
                        } else {
                            nameCombination += name.name;
                        }
                    })
                item.singer = nameCombination;
                newList.push({
                    singer: item.singer,
                    name: item.name,
                    id: item.id,
                    picUrl:item.al ? item.al.picUrl : ""
                })
              })
              this.addSongList({list: newList, index: index});
              this.playSong(id);       
          }
      },
      getData() {
        discoverRequest.getSongDetail(this.$route.params.id)
            .then(res => {
                this.songData = res.data.playlist;
            })
            .catch(error => {
                console.log(error);
            })
      },
      ...mapActions(["addSongList", "checkShowState", "checkIndex"])  
    },
    mounted() {
        window.addEventListener("scroll", this.touchmove);
    },
    activated() {
        if (typeof this.$route.query.songData !== 'undefined' && typeof this.$route.query.songData !== 'string') {
            this.songData = this.$route.query.songData;
        } else {
            discoverRequest.getSongDetail(this.$route.params.id)
                .then(res => {
                    this.songData = res.data.playlist;
                })
                .catch(error => {
                    console.log(error);
                })
            
        }
        
    },
    deactivated() {
        this.songData = null;
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.touchmove);
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/day-recommend/day-recommend.less";
</style>