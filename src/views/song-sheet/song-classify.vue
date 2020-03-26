<template>
    <transition name="fade">
        <div>
            <back-button 
                :isTransparent="false"
                :title="songName"
                :isWhite="false"
                :click="goBack"
            />
            <scroll-up :loadMore="nextPage" v-if="songList" :isMoreProp="songList.more">
                <div class="sheet-list" style="margin-top: 40px;">
                    <song-item 
                        v-for="(songItem, index) in handlePlayCount" 
                        :key="songItem.id + index" 
                        :picUrl="songItem.coverImgUrl" 
                        :playCount="songItem.playCount" 
                        :name="songItem.name"
                        @click.native="pushSongDetail(songItem.id)"
                    ></song-item>
                </div>
                <div style="width: 32%; height: 0px;" v-for="(stuff, index) in getStuff" :key="index">
                </div>
            </scroll-up>
        </div>
    </transition>
</template>
<script>
import backButton from "src/components/back-button.vue";
import songItem from "../discover/components/song-item.vue";
import scrollUp from "src/components/scroll-up.vue";
import { discoverRequest } from "src/store/api.js";
export default {
    name: "song-classify",
    components: {
        backButton,
        songItem,
        scrollUp
    },
    computed: {
        handlePlayCount() {
            let newSongList = this.songList.playlists.map(item => {
                let newItem = JSON.parse(JSON.stringify(item));
                newItem.playCount = newItem.playCount.toString();
                if (newItem.playCount.length >= 5 && newItem.playCount.length <= 8) {
                    newItem.playCount = newItem.playCount.substring(0, newItem.playCount.length - 4) + '万';
                } else if (newItem.playCount.length > 8) {
                    newItem.playCount = newItem.playCount.substring(0, newItem.playCount.length - 8) + '亿';
                }
                return newItem;
            })
            return newSongList;
       },
       getStuff() {
           if (this.songList && this.songList.playlists.length % 3 !== 0) {
               let stuffDiv = [];
               for (let i=0; i<this.songList.playlists.length % 3; i++) {
                   stuffDiv.push(1);
               }
               return stuffDiv;
           } else {
               return [];
           }
       } 
    },
    data() {
        return {
            songList: null,
            isloading: false,
            songName: "歌单名称"
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
            this.$destroy();
        },
        pushSongDetail(id) {
            discoverRequest.getSongDetail(id)
                .then(res => {
                    if (res.status === 200) {
                        this.$router.push({name: 'dayRecommend', params: { songData: res.data.playlist }, query: { id: id }})
                    } else {
                        console.log("处理错误")
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getSongs(cat, updateTime, callback) {
            this.isloading = true;
            discoverRequest.getPlaylist(cat, updateTime)
                .then(res => {
                    this.isloading = false;
                    if (!this.songList) {
                        this.songList = res.data
                        this.songName = res.data.cat;
                    } else {
                        this.songList.playlists = this.songList.playlists.concat(res.data.playlists);
                    }
                    if (callback) {
                        callback();
                    }
                })
        },
        nextPage(callback) {
            if (!this.isloading) {
                if (this.songList.more) {
                    this.getSongs(this.$route.query.name, this.songList.playlists.length, callback);
                } else {
                    console.log("没有更多了");
                }
                
            }
        }
    },
    activated() {
        if (typeof this.$route.query !== "undefined") {
            this.getSongs(this.$route.query.name);
        }
    },
    deactivated() {
        
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/common.less";
@import "../../styles/song-sheet/song-sheet.less";
</style>