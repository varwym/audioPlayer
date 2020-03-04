<template>
    <transition :name="typeof(this.$route.query.songData) !== 'string' ? 'push' : ''">
        <div class="normal-recommend-list">
            <back-button 
                :isTransparent="true"
                :title="'每日推荐'"
                :isWhite="true"
                :click="goBack"
            />
            <div class="top-view" :class="{onTopDetailNormal: isTop}">
                <p>{{day}}</p>
            </div>
            <div class="song-list-playAllButton song-list-playAllButton-normal" :class="{onTop: isTop}" @click="handlePlayAll">
                <img src="../../assets/black_play_button.png">
                <span>播放全部</span>
            </div>
            <div class="song-list-content" v-if="songData !== null" :style="{marginTop: isTop ? '200px' : '0px'}">
                <song-list-item v-for="(songItem, index) in handleSongData" :key="songItem.id" :isPlay="songItem.id === song.id ? true : false" :title="songItem.name" :name="songItem.singer" :index="index + 1" @click.native="handlePlaySong(songItem.id, index)"/>
            </div>
        </div>
    </transition>
</template>
<script>
import backButton from "src/components/back-button.vue";
import { audioMixin } from "../audio-player/components/audioMixin";
import { discoverRequest } from '../../store/api';
import { mapState, mapActions } from "vuex";
import songListItem from "./components/song-list-item.vue";
export default {
    name: "normalRecommend",
    components: {
        backButton,
        songListItem
    },
    mixins: [audioMixin],
    data() {
        return {
            isTop: false,
            songData: null
        }
    },
    computed: {
        handleSongData() {
            this.songData.forEach(item => {
                let nameCombination = "";
                item.artists.forEach(name => {
                    if (nameCombination) {
                        nameCombination += `/${name.name}`;
                    } else {
                        nameCombination += name.name;
                    }
                })
                item.album.name ? nameCombination += `-${item.album.name}` : null;
                item.singer = nameCombination;
            })
            return this.songData;
        },
        day() {
            let date = new Date();
            return date.getDate() + ' / ' + (date.getMonth() + 1).toString();
        },
        ...mapState({
            songList: state => state.audio.songList,
            songIndex: state => state.audio.index,
            song: state => state.audio.song
        })  
    },
    mounted() {
        window.addEventListener("scroll", this.touchmove);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.touchmove);
    },
    activated() {
        if (typeof this.$route.query.data !== 'undefined' && typeof this.$route.query.data !== 'string') {
            this.songData = this.$route.query.data.recommend;
        } else {
            discoverRequest.getDayRecommend()
                .then(res => {
                    this.songData = res.data.recommend;
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    methods: {
        checkList(val, oldval) {
            for (let i=0; i<val.length; i++) {
                if (val[i].id !== oldval[i].id) {
                    return false
                }
            }
            return true;
        },
        handlePlaySong(id, index) {
            if (this.songList && this.checkList(this.songList, this.handleSongData) && this.songList.length === this.handleSongData.length) {
                if (this.song.id === id) {
                    this.checkShowState(0);
                    return
                } 
                this.checkIndex(index);
                this.playSong(id);       
            } else {
                let newList = [];
                this.handleSongData.forEach(item => {
                    let nameCombination = "";
                    item.artists.forEach(name => {
                        if (nameCombination) {
                            nameCombination += `/${name.name}`;
                        } else {
                            nameCombination += name.name;
                        }
                    })
                    item.album.name ? nameCombination += `-${item.album.name}` : null;
                    item.singer = nameCombination;
                    newList.push({
                        singer: item.singer,
                        name: item.name,
                        id: item.id,
                        picUrl:item.album ? item.album.picUrl : ""
                    })
                })
                this.addSongList({list: newList, index: index});
                this.playSong(id);          
            }
        },
        touchmove() {
          if (window.pageYOffset >= 110) {
              !this.isTop ? this.isTop = !this.isTop : null
          } else {
              this.isTop ? this.isTop = !this.isTop : null
          }
        },
        handlePlayAll() {
          this.addSongList({
              list: this.handleSongData,
              index: 0
          });
          this.playSong(this.song.id);
        },
        goBack() {
            this.$router.go(-1);
        },
        ...mapActions(["addSongList", "checkShowState", "checkIndex"])
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/day-recommend/day-recommend.less";
</style>