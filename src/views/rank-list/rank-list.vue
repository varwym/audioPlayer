<template>
    <transition name="fade">
        <div class="rank-list" v-if="rankData !== null">
            <back-button 
                :isTransparent="false"
                :title="'排行榜'"
                :isWhite="false"
                :click="goBack"
            />
            <div class="rank-list-container" v-if="rankData !== null">
                <h3>官方榜</h3>
                <rankItem v-for="rankItem in handleRankData.authority"
                    :key="rankItem.id"
                    :imgUrl="rankItem.coverImgUrl"
                    :update="rankItem.updateFrequency"
                    :songs="rankItem.tracks"
                    @click.native="pushSongDetail(rankItem.id)"
                />
                <h3>推荐榜</h3>
                <div class="rank-list-row">
                    <rank-item-row v-for="rankItemRow in handleRankData.recommend"
                        :key="rankItemRow.id"
                        :imgUrl="rankItemRow.coverImgUrl"
                        :update="rankItemRow.updateFrequency"
                        @click.native="pushSongDetail(rankItemRow.id)"
                    />
                </div>
                <h3>全球榜</h3>
                <div class="rank-list-row">
                    <rank-item-row v-for="rankItemRow in handleRankData.global"
                        :key="rankItemRow.id"
                        :imgUrl="rankItemRow.coverImgUrl"
                        :update="rankItemRow.updateFrequency"
                        @click.native="pushSongDetail(rankItemRow.id)"
                    />
                </div>groupList
                <h3>更多榜单</h3>
                <div class="rank-list-row">
                    <rank-item-row v-for="rankItemRow in handleRankData.more"
                        :key="rankItemRow.id"
                        :imgUrl="rankItemRow.coverImgUrl"
                        :update="rankItemRow.updateFrequency"
                        @click.native="pushSongDetail(rankItemRow.id)"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import backButton from "src/components/back-button.vue";
import rankItem from "src/views/rank-list/components/rank-item.vue";
import rankItemRow from "src/views/rank-list/components/rank-item-row.vue";
import { discoverRequest } from "src/store/api.js"; 
export default {
    name: "rank-list",
    components: {
        backButton,
        rankItem,
        rankItemRow
    },
    computed: {
        handleRankData() {
            let authority = [], recommend = [], global = [], more = [];
            this.rankData.list.forEach(item => {
                switch (true) {
                    case item.name === '云音乐飙升榜' || item.name === '云音乐新歌榜' || item.name === '网易原创歌曲榜' || item.name === '云音乐热歌榜': 
                        authority.push(item);
                        break;
                    case item.name === '云音乐说唱榜' || item.name === '云音乐古典音乐榜' || item.name === '云音乐电音榜' || item.name === '抖音排行榜' || item.name === '云音乐ACG音乐榜' || item.name === '云音乐欧美新歌榜':
                        recommend.push(item);
                        break;
                    case item.name === '英国Q杂志中文版周榜' || item.name === 'UK排行榜周榜' || item.name === '美国Billboard周榜' || item.name === 'Beatport全球电子舞曲榜' || item.name === 'iTunes榜' || item.name === '日本Oricon周榜':
                        global.push(item);
                        break;
                    case item.name === '新声榜' || item.name === '云音乐韩语榜' || item.name === '云音乐国电榜' || item.name === '电竞音乐榜' || item.name === 'KTV唛榜' || item.name === 'Hit FM Top榜' || item.name === '台湾Hito排行榜' || item.name === '云音乐欧美热歌榜' || item.name === '法国 NRJ Vos Hits 周榜' || item.name === '中国新乡村音乐排行榜':
                        more.push(item);
                        break;
                    default:
                        more.push(item);
                        break;
                }
            })            
            return { authority: authority, recommend: recommend, global: global, more: more }
        }
    },
    data() {
        return {
            rankData: null
        }
    },
    mounted() {
        
    },
    activated() {
        if (typeof this.$route.params.rankData !== 'undefined') {
            this.rankData = this.$route.params.rankData;
        } else {
            discoverRequest.getRankList()
                .then(res => {
                    if (res.status === 200) {
                        this.rankData = res.data;
                    } else {
                        console.log("处理错误")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    deactivated() {
        this.rankData = null;
    },
    methods: {
        pushSongDetail(id) {
            discoverRequest.getSongDetail(id)
                .then(res => {
                    if (res.status === 200) {
                        this.$router.push({name: 'dayRecommend', params: { songData: res.data.playlist }, query: { id: id }})
                    } else {
                        console.log("处理错误")
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                })  
        },
        goBack() {
          this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/common.less";
@import "../../styles/rank-list/rank-list.less";
</style>