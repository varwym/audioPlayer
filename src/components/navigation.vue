<template>
    <div class="navigation">
        <a>
            <img src="../assets/more_button.png" alt="">
        </a>
        <ul class="navigation-options">
            <router-link tag="li" v-for="(item, index) in options" :key="index + 100" :to="`/${navigations[index]}`" replace>{{item}}</router-link>
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
            navigations: ["me", "discover", "square", "video"]
        }
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
@import '../styles/navigation.less';
</style>