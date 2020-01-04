<template>
    <div class="navigation">
        <a>
            <img src="../assets/more_button.png" alt="">
        </a>
        <ul class="navigation_options">
            <li :class="{navigation_options_selected: selectedId === index}" v-for="(item, index) in options" :key="index" @click="navigationToPages(index)">{{item}}</li>
        </ul>
        <a>
            <img src="../assets/search_button.png" alt="">
        </a>
    </div>
</template>
<script>
export default {
    name: "navigation",
    data () {
        return {
            options: ["我的","发现","云村","视频"],
            selectedId: 1
        }
    },
    methods: {
        navigationToPages (index) {
            this.selectedId = index;
        }
    }
}
</script>
<style lang="less" scoped>
@import '../styles/navigation.less';
</style>