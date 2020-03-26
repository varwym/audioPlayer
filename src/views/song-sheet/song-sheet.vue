<template>
    <transition name="fade">
        <div class="song-sheet" v-if="groupList">
            <back-button 
                :isTransparent="false"
                :title="'歌单'"
                :isWhite="false"
                :click="goBack"
            />
            <div class="group-div">
                <ul ref="groupUl" class="video-options" v-if="groupList">
                    <li v-for="(songGroup, songIndex) in groupList" :class="{'video-option-select': index === songIndex}" :key="songGroup.id" @click="checkGroup(songIndex, songGroup.id)">{{songGroup.name}}</li>
                </ul>
                <div class="get-all">
                    <img :src="buttons.all" @click="getSort">
                </div>
            </div>
            <scroll-up :loadMore="nextPage" v-if="songList" :isMoreProp="songList.more">
                <div class="sheet-list">
                    <song-item 
                        v-for="(songItem, index) in handlePlayCount" 
                        :key="songItem.id + index" 
                        :picUrl="songItem.coverImgUrl" 
                        :playCount="songItem.playCount" 
                        :name="songItem.name"
                        @click.native="pushSongDetail(songItem.id)"
                    ></song-item>
                    <div style="width: 32%; height: 0px;" v-for="(stuff, index) in getStuff" :key="index">
                    </div>
                </div>
            </scroll-up>
            <transition name="fade">
                <div class="sheet-sort" v-show="sortShow">
                    <song-sort />
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
import backButton from "src/components/back-button.vue";
import songItem from "../discover/components/song-item.vue";
import scrollUp from "src/components/scroll-up.vue";
import { discoverRequest } from "src/store/api.js";
import songSort from "./song-sort.vue";
export default {
    name: "song-sheet",
    components: {
        backButton,
        songItem,
        scrollUp,
        songSort
    },
    data() {
        return {
            index: 0,
            groupList: null,
            buttons: {
                all: require("src/assets/all_button.png")
            },
            songList: null,
            isloading: false,
            sortShow: false
        }
    },
    provide() {
        return {
            closeSort: this.closeSort
        }
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
    methods: {
        nextPage(callback) {
            if (!this.isloading) {
                if (this.songList.more) {
                    this.getSongs(this.groupList[this.index].name, this.songList.playlists.length, callback);
                    console.log(this.songList.playlists.length)
                } else {
                    console.log("没有更多了");
                }
                
            }
        },
        scrollToIndex(index) {
            let groupUl = this.$refs.groupUl;
            let clientWidth = groupUl.clientWidth * 90 / 100;
            let childrens = groupUl.children;
            let scrollX = childrens[index].offsetLeft - groupUl.clientWidth * 5 / 100 - clientWidth / 2 + childrens[index].clientWidth / 2;
            groupUl.scrollTo(scrollX, 0);   
        },
        getGroups() {
            discoverRequest.getHotlist()
                .then(res => {
                    this.groupList = res.data.tags;
                    this.getSongs(res.data.tags[0].name);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getSongs(cat, updateTime, callback) {
            this.isloading = true;
            discoverRequest.getPlaylist(cat, updateTime)
                .then(res => {
                    this.isloading = false;
                    if (!this.songList) {
                        this.songList = res.data
                    } else {
                        this.songList.playlists = this.songList.playlists.concat(res.data.playlists);
                    }
                    if (callback) {
                        callback();
                    }
                })
        },
        checkGroup(songIndex, songId) {
            this.index = songIndex;
            this.scrollToIndex(songIndex);
            this.songList = null;
            this.getSongs(this.groupList[songIndex].name);
        },
        goBack() {
            this.$router.go(-1);
            this.$destroy();
        },
        getSort() {
            this.sortShow = true;
        },
        closeSort() {
            this.sortShow = false;  
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
            }
        },
        activated() {
            if (typeof this.$route.params.groupList !== 'undefined') {
                this.groupList = this.$route.params.groupList;
                this.getSongs(this.groupList[0].name);

            } else {
                if (!this.groupList) {
                    this.getGroups();
                }
            }
        },
        deactivated() {
            
        },
        mounted() {

        }
}
</script>
<style lang="less" scoped>
@import "../../styles/song-sheet/song-sheet.less";
@import "../../styles/common.less";
</style>