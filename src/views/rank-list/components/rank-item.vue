<template>
    <div class="rank-item">
        <img ref="img" :src="imgUrl" />
        <p>{{update}}</p>
        <ul :style="{height: height}">
            <li v-for="(item, index) in songs" :key="index + imgUrl">
                {{`${index+1}${item.first}-${item.second}`}}
            </li>
        </ul>
    </div>
</template>
<script>
import { itemMixins } from "./item-mixins";
export default {
    name: "rank-item",
    props: {
        imgUrl: String,
        update: String,
        songs: Array
    },
    mixins: [itemMixins]
}
</script>
<style lang="less" scoped>
@import "../../../styles/rank-list/rank-item.less";
</style>