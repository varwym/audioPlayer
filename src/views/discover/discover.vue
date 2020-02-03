<template>
    <div>
        <banner :imgs="imgArray"/>
        <div class="option_list">
            <div class="option_list_item" v-for="(option, optionIndex) in option_types" :key="optionIndex + 200">
                <img :src="option_imgs[optionIndex]">
                <span>{{option}}</span>
            </div>
        </div>
        <span class="span_title">推荐歌单</span>
        <div class="titleBetween">
            <span class="common_title">为您精挑细选</span>
            <span class="common_button">查看更多</span>
            <div>
                <div>
                    <img src="" alt="">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import banner from "./components/banner.vue";
import { discoverRequest } from '../../store/api';
export default {
    name: "discover",
    components: {
        banner
    },
    data() {
      return {
           imgArray: [],
           option_types: ['每日推荐', '歌单', '排行榜', '电台', '直播'],
           option_imgs: [require('../../assets/date_button.png'), 
                        require('../../assets/musicList_button.png'),
                        require('../../assets/rank_button.png'),
                        require('../../assets/audio_button.png'),
                        require('../../assets/video_button.png')]
      }  
    },
    methods: {
        
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
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/discover/discover.less";
</style>
