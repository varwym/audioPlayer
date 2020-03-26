<template>
    <div>
        <banner :imgs="imgArray"/>
        <div class="option-list">
            <div class="option-list-item" v-for="(option, optionIndex) in option_types" :key="optionIndex + 200" @click="goOptions(optionIndex)">
                <img :src="option_imgs[optionIndex]">
                <span>{{option}}</span>
            </div>
        </div>
        <span class="span-title">推荐歌单</span>
        <div class="songList">
            <song-item 
                v-for="songItem in handlePlayCount" 
                :key="songItem.id" 
                :picUrl="songItem.picUrl" 
                :playCount="songItem.playCount" 
                :name="songItem.name"
                @click.native="pushSongDetail(songItem.id)"
            ></song-item>
            <div style="width: 32%; height: 0px;" v-for="(stuff, index) in getStuff" :key="index">
            </div>
        </div>
    </div>
</template>
<script>
import banner from "./components/banner.vue";
import songItem from "./components/song-item.vue";
import { discoverRequest } from '../../store/api';
export default {
    name: "discover",
    components: {
        banner,
        songItem
    },
    data() {
      return {
           imgArray: [],
           option_types: ['每日推荐', '歌单', '排行榜', '电台', '直播'],
           option_imgs: [require('assets/date_button.png'), 
                        require('assets/musicList_button.png'),
                        require('assets/rank_button.png'),
                        require('assets/audio_button.png'),
                        require('assets/video_button.png')],
           songList: []
      }  
    },
    computed: {
       handlePlayCount() {
           let newSongList = this.songList.map(item => {
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
           if (this.songList && this.songList.length % 3 !== 0) {
               let stuffDiv = [];
               for (let i=0; i<this.songList.length % 3; i++) {
                   stuffDiv.push(1);
               }
               return stuffDiv;
           } else {
               return [];
           }
       } 
    },
    methods: {
        goOptions(index) {
            switch (index) {
                case 0:
                    discoverRequest.getDayRecommend()
                        .then(res => {
                            if (res.status === 200) {
                                this.$router.push({name: 'normalRecommend', params: { data: res.data }})
                            }
                        })
                        .catch(error => {
                            if (error.response.status === 301) {
                                this.$router.push({name: 'login', params: { push: 'normalRecommend' }})
                            }
                        })
                    break;
                case 1:
                    discoverRequest.getHotlist()
                        .then(res => {
                            if (res.status === 200) {
                                this.$router.push({name: 'songSheet', params: { groupList: res.data.tags }});
                            }
                        })
                    break;
                case 2: 
                    discoverRequest.getRankList()
                        .then(res => {
                            if (res.status === 200) {
                                this.$router.push({name: 'rankList', params: { rankData: res.data }});
                            }
                        })
                    break;
                case 3:
                    break;
                case 4:
                    break;
                default: 
                    break;
            }
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
    mounted() {
        discoverRequest.getBanner()
            .then(res => {
                if (res.status === 200) {
                    this.imgArray = [];
                    res.data.banners.forEach(item => {
                        this.imgArray.push({
                            src: item.pic,
                            id: item.bannerId
                        })
                    })
                } else {
                    console.log(`轮播图加载失败,状态码为${res.status}`)
                }
            })
            .catch(error => {
                console.log(error)
            })
        discoverRequest.getSongList(6)
            .then(res => {
                if (res.status === 200) {
                    this.songList = JSON.parse(JSON.stringify(res.data.result));
                } else {
                    console.log(`推荐歌单加载失败,状态码为${res.status}`)
                }
            })
            .catch(error => {
                console.log(error)
            })      
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/discover/discover.less";
</style>
