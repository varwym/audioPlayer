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
                    <img :src="buttons.all" @click="getAll">
                </div>
            </div>
            <div class="sheet-list" v-if="songList">
                <song-item 
                    v-for="songItem in handlePlayCount" 
                    :key="songItem.id" 
                    :picUrl="songItem.coverImgUrl" 
                    :playCount="songItem.playCount" 
                    :name="songItem.name"
                    @click.native="pushSongDetail(songItem.id)"
                ></song-item>
            </div>
        </div>
    </transition>
</template>
<script>
import backButton from "src/components/back-button.vue";
import songItem from "../discover/components/song-item.vue";
import { discoverRequest } from "src/store/api.js";
export default {
    name: "song-sheet",
    components: {
        backButton,
        songItem
    },
    data() {
        return {
            index: 0,
            groupList: null,
            buttons: {
                all: require("src/assets/all_button.png")
            },
            songList: null
        }
    },
    computed: {
        handlePlayCount() {
           let newSongList = this.songList.playlists.map(item => {
               let newItem = JSON.parse(JSON.stringify(item));
               newItem.playCount = newItem.playCount.toString();
               if (newItem.playCount.length >= 5 && newItem.playCount.length <= 8) {
                   newItem.playCount = newItem.playCount.substring(0, newItem.playCount.length - 4) + '万';
               } else if (item.playCount.length > 8) {
                   newItem.playCount = newItem.playCount.substring(0, newItem.playCount.length - 8) + '亿';
               }
               return newItem;
           })
           return newSongList;
       } 
    },
    methods: {
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
        getSongs(cat, updateTime) {
            discoverRequest.getPlaylist(cat, updateTime)
                .then(res => {
                    if (!this.songList) {
                        this.songList = res.data
                    } else {
                        this.songList.playlists = this.songList.playlists.concat(res.data.playlists);
                        this.songList.lasttime = res.data.lasttime;
                    }
                })
        },
        checkGroup(songIndex, songId) {
            this.index = songIndex;
            this.scrollToIndex(songIndex);
            this.songList = null;
            console.log(this.groupList[songIndex])
            this.getSongs(this.groupList[songIndex].name);
        },
        goBack() {
            this.$router.go(-1);
            this.$destroy();
        },
        getAll() {
            
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
<style lang="less">
@import "../../styles/song-sheet/song-sheet.less";
@import "../../styles/common.less";
</style>