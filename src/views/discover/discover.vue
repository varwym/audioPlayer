<template>
    <div class="list">
        <banner style="marginTop: 20px;"/>
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
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/common.less";
</style>
