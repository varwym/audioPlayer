<template>
    <div class="list">
        <banner style="marginTop: 20px;" :imgs="imgArray"/>
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

export default {
    name: "discover",
    components: {
        banner
    },
    data() {
      return {
           imgArray: ["http://p1.music.126.net/hggCzQXcwB4oe4qTra2JLw==/109951164602910186.jpg", "http://p1.music.126.net/o4TXSVd4fMj9o1nJ8iFXYQ==/109951164602906935.jpg", "http://p1.music.126.net/Jtfsz1HNm7rwCFlqVFakqQ==/109951164602919586.jpg"]
      }  
    },
    methods: {
        
    },
    mounted() {
        
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/common.less";
</style>
