<template>
    <div class="sort-list">
        <back-button 
            :isTransparent="false"
            :title="'歌单标签'"
            :isWhite="false"
            :click="closeSort"
        />
        <h5 class="sort-title">我的歌单广场</h5>
    </div>
</template>
<script>
import backButton from "src/components/back-button.vue";
import { discoverRequest } from "src/store/api.js" 
export default {
    name: "song-sort",
    components: {
        backButton
    },
    data() {
        return {
            sortList: null      
        }
    },
    inject: ["closeSort"],
    mounted() {
        this.getSortList();
    },
    methods: {
        getSortList() {
            discoverRequest.getCatlist()
                .then(res => {
                    if (res.status === 200) {
                        this.sortList = res.data;
                    }
                })
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/song-sheet/song-sort.less";
</style>