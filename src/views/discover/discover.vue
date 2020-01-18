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
import { discoverRequest } from '../../store/api';
export default {
    name: "discover",
    components: {
        banner
    },
    data() {
      return {
           imgArray: []
      }  
    },
    methods: {
        
    },
    mounted() {
        discoverRequest.getBanner()
            .then(res => {
                if (res.status === 200) {
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
@import "../../styles/common.less";
</style>
