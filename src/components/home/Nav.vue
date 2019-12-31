<template>
    <ul class="nav_list">
        <li v-bind:class="{nav_list_li_select: selectId === 0}" @click="changeSelectId(0)">推薦</li>
        <li v-bind:class="{nav_list_li_select: selectId === 1}" @click="changeSelectId(1)">朋友</li>
        <li v-bind:class="{nav_list_li_select: selectId === 2}" @click="changeSelectId(2)">電臺</li>
    </ul>
</template>
<script>
    export default {
        name: 'Nav',
        data () {
            return {
                selectId: 1
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
@import "../../styles/nav.less";
</style>