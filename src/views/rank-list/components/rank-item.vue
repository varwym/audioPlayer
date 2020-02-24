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
export default {
    name: "rank-item",
    props: {
        imgUrl: String,
        update: String,
        songs: Array
    },
    data() {
        return {
            height: "50px"
        }
    },
    methods: {
        setHeight() {
            this.height = `${this.$refs.img.offsetHeight - 5}px`;
        }  
    },
    mounted() {
        window.addEventListener("resize", this.setHeight);
        this.setHeight();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHeight);
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/rank-list/rank-item.less";
</style>