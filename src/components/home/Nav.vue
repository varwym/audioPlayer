<template>
    <ul class="nav_list">
        <li :class="{nav_list_li_select: selectId === 0}" @click="changeSelectId(0)">推荐</li>
        <li :class="{nav_list_li_select: selectId === 1}" @click="changeSelectId(1)">朋友</li>
        <li :class="{nav_list_li_select: selectId === 2}" @click="changeSelectId(2)">电台</li>
    </ul>
</template>
<script>
    export default {
        name: 'Nav',
        data () {
            return {
                selectId: 0
            }
        },
        methods: {
            changeSelectId (id) {
                this.selectId = id;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../styles/home/nav.less";
</style>