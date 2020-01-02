<template>
    <header>
        <a class="home_icon home_menu"></a>
        <div class="home_iconCenter">
            <a :class="{home_music_select: selectedId === 0, home_music: selectedId !== 0}" @click="changeSelectedId(0)"></a>
            <a :class="{home_note1_select: selectedId === 1, home_note1: selectedId !== 1}" @click="changeSelectedId(1)"></a>
            <a :class="{home_video_select: selectedId === 2, home_video: selectedId !== 2}" @click="changeSelectedId(2)"></a>
        </div>
        <a class="home_icon home_search"></a>
    </header>
</template>
<script>
    export default {
        name: 'Header',
        data () {
            return {
                selectedId: 1
            }
        },
        methods: {
            changeSelectedId (id) {
                this.selectedId = id;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../styles/home/header.less";
</style>