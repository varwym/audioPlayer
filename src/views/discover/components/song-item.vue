<template>
    <div class="songList-item">
        <img :src="picUrl">
        <p>{{playCount}}</p>
        <p>{{name}}</p>
    </div>
</template>
<script>
export default {
    name: "song-item",
    props: {
        picUrl: String,
        playCount: String,
        name: String
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/song-item.less";
</style>