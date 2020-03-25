<template>
    <div class="sort-list">
        <back-button 
            :isTransparent="false"
            :title="'歌单标签'"
            :isWhite="false"
            :click="closeSort"
        />
        <h5 class="sort-title">我的歌单广场</h5>
        <div class="sort-view" v-if="sortList">
            <div class="sort-label" v-for="(item, index) in sortList.sub" :key="index">
                {{item.name}}
            </div>
        </div>
        <div v-if="this.songList" style="position: relative; width: 100%; height: 50px"></div>
    </div>
</template>
<script>
import backButton from "src/components/back-button.vue";
import { discoverRequest } from "src/store/api.js";
import { mapState } from "vuex";
export default {
    name: "song-sort",
    components: {
        backButton
    },
    computed: {
        ...mapState({
            songList: state => state.audio.songList
        })
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
                        console.log(this.sortList)
                    }
                })
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/song-sheet/song-sort.less";
</style>