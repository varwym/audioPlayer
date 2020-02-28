<template>
    <transition name="push">
        <div class="song-sheet">
            <back-button 
                :isTransparent="false"
                :title="'歌单'"
                :isWhite="false"
                :click="goBack"
            />
            <ul ref="groupUl" class="video-options" v-if="groupList !== null">
                <li v-for="(songGroup, songIndex) in groupList" :class="{'video-option-select': index === songIndex}" :key="songGroup.id" @click="checkGroup(songIndex, songGroup.id)">{{songGroup.name}}</li>
            </ul>
        </div>
    </transition>
</template>
<script>
import backButton from "src/components/back-button.vue";
import { discoverRequest } from "src/store/api.js";
export default {
    name: "song-sheet",
    components: {
        backButton
    },
    data() {
        return {
            index: 0,
            groupList: null
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
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        checkGroup(songIndex, songId) {
            this.index = songIndex;
            this.scrollToIndex(songIndex);
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    mounted() {
        if (typeof(this.$route.query.groupList[0]) !== 'string') {
            this.groupList = this.$route.query.groupList;
        } else {
            this.getGroups();
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/song-sheet/song-sheet.less";
@import "../../styles/video/video.less";
@import "../../styles/common.less";
</style>