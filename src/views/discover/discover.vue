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
               item.playCount = item.playCount.toString();
               if (item.playCount.length >= 5 && item.playCount.length <= 8) {
                   item.playCount = item.playCount.substring(0, item.playCount.length - 4) + '万';
               } else if (item.playCount.length > 8) {
                   item.playCount = item.playCount.substring(0, item.playCount.length - 8) + '亿';
               }
               return item;
           })
           return newSongList;
       } 
    },
    methods: {
        goOptions(index) {
            switch (index) {
                case 0:
                    discoverRequest.getDayRecommend()
                        .then(res => {
                            this.$router.push({path: 'normalRecommend', query: { data: res.data }})
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    break;
                case 1:
                    discoverRequest.getHotlist()
                        .then(res => {
                            this.$router.push({path: '/songSheet', query: { groupList: res.data.tags }});
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    break;
                case 2: 
                    discoverRequest.getRankList()
                        .then(res => {
                            if (res.status === 200) {
                                this.$router.push({path: '/rankList', query: { rankData: res.data }});
                            } else {
                                console.log("处理错误")
                            }
                        })
                        .catch(error => {
                            console.log(error)
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
                    this.$router.push({path: `/dayRecommend/${id}`, query: { songData: res.data.playlist }})
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
