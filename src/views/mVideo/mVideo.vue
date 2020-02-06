<template>
    <div class="video_list">
        <ul class="video_options">
            <li v-for="(video, videoIndex) in groupList" :class="{video_option_select: index === videoIndex}" :key="video.id" @click="checkGroup(videoIndex, video.id)">{{video.name}}</li>
        </ul>
        <div ref="videoItemList" class="video_item_list">
            <div class="video_item" v-for="(videoItem, videoItemIndex) in handleVideoList" :key="videoItem.threadId">
                <video controls="controls" :src="videoItem.videoUrl"></video>
                <div class="video_item_text">
                    <p :class="{video_item_text_noImg:!videoItem.title}">{{videoItem.title}}</p>
                    <img v-if="videoItem.relateSongPicUrl" :src="videoItem.relateSongPicUrl">
                </div>
                <div v-if="videoItem.bottomHeadPicUrl" class="video_item_bottom clearfix">
                    <img class="video_item_bottom_head" :src="videoItem.bottomHeadPicUrl">
                    <span class="video_item_bottom_text">{{videoItem.bottomText}}</span>
                    <div class="video_item_bottom_message">
                        <p>{{videoItem.commentCount}}</p>
                        <img src="../../assets/message_button.png" alt="评论">
                    </div>
                    <div class="video_item_bottom_like">
                        <p>{{videoItem.likeCount}}</p>
                        <img src="../../assets/like_button1.png" alt="点赞">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { videoRequest } from '../../store/api';
export default {
    name: "mVideo",
    data() {
        return {
            index: 0,
            groupList: [],
            videoList: [],
            hasmore: true
        }
    },
    computed: {
        handleVideoList() {
            let newList = [];
            this.videoList.forEach(item => {
                newList.push({
                    threadId: item.data.threadId,
                    videoUrl: item.data.urlInfo ? item.data.urlInfo.url : null,
                    title: item.data.title ? item.data.title : item.data.name ? item.data.name : null,
                    relateSongPicUrl: item.data.relateSong && item.data.relateSong.length > 0 ? item.data.relateSong[0].al.picUrl : null,
                    bottomHeadPicUrl: typeof(item.data.creator) !== "undefined" ? item.data.creator.avatarUrl : null || typeof(item.data.artists) !== "undefined" ? item.data.artists[0].img1v1Url : null,
                    bottomText: typeof(item.data.creator) !== "undefined" ? item.data.creator.nickname : null || typeof(item.data.artists) !== "undefined" ? item.data.artists[0].name : null,
                    commentCount: item.data.commentCount,
                    likeCount: item.data.praisedCount || item.data.likeCount
                })
            })
            return newList;
        }
    },
    methods: {
        checkGroup(index, id) {
            this.index = index;
            this.getVideoList(id);
        },
        getVideoList(id) {
            videoRequest.getVideoList(id)
                .then(res => {
                    if (res.status === 200) {
                        this.hasmore = res.data.hasmore || false;
                        let list = [];
                        res.data.datas.forEach(item => {
                            list.push(item)
                        })
                        this.videoList = list;
                        document.documentElement.scrollTop = 0;
                    } else {
                        console.log('获取视频列表失败');
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    mounted() {
        videoRequest.getVideoGroup()
            .then(res => {
                if (res.status === 200) {
                    let group = [];
                    res.data.data.forEach(item => {
                        group.push(item);
                    })
                    this.groupList = group;
                    this.getVideoList(this.groupList[0].id);
                } else {
                    console.log('获取视频分组失败');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/video/video.less";
</style>
