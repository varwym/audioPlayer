<template>
    <div class="rank-item-row">
        <div class="rank-item-row-container">
            <img :src="imgUrl" />
            <p>{{update}}</p>
        </div>
        <p>云音乐说唱榜</p>
    </div>
</template>
<script>
import { itemMixins } from "./item-mixins";
export default {
    name: "rank-item",
    props: {
        imgUrl: String,
        update: String
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/rank-list/rank-item.less";
</style>