<template>
    <div class="player-container">
        <div class="player-background" :style="backgroundImg"></div>
        <div class="player-list">
            <back-button 
                :isTransparent="true"
                :title="'歌曲'"
                :isWhite="true"
                :click="goBack"
            />
            <div class="songImg-container">
                <img :class="handleAnimation" :style="[handlePlayState]" src="http://p1.music.126.net/RRBZ6_ROUJ711RboCQkXxA==/3417282143625721.jpg">
                <player-progress />
            </div>
        </div>
        <div ref="bottomButtons" class="player-bottom-container">
            <img @click="handlePlayPattern" class="normal-button" :src="buttons.repeat[0]">
            <img @click="handlePlayLast" class="normal-button" :src="buttons.last">
            <img @click="handlePlay" class="play-button" :src="isPlay ? buttons.pause : buttons.play">
            <img @click="handlePlayNext" class="normal-button" :src="buttons.next">
            <img @click="handlePlayList" class="normal-button" :src="buttons.play_list_button">
        </div>
    </div>
</template>
<script>
import backButton from "../../components/back-button.vue";
import playerProgress from "./components/progress.vue";
import { mapState } from "vuex";
export default {
    name: "audio-player",
    components: {
        backButton,
        playerProgress
    },
    computed: {
        handlePlayState() {
            return {
                "animation-play-state": this.isPlay ? 'running' : 'paused' 
            }
        },
        ...mapState({
            audio: state => state.audio.audio
        })
    },
    mounted() {
        
    },
    data() {
        return {
            backgroundImg: {
                backgroundImage: `url('${"https://p1.music.126.net/S795Ixp1XCjuloMgX1zumA==/109951164673872675.jpg"}')`
            },
            handleAnimation: "addKeyFrames",
            isPlay: true,
            isCheck: false,
            buttons: {
                repeat: [require("assets/random_play_button.png")],
                last: require("assets/last_button.png"),
                play: require("assets/play_button.png"),
                pause: require("assets/pause_button.png"),
                next: require("assets/next_button.png"),
                play_list_button: require("assets/play_list_button.png")
            }
        }
    },
    methods: {
        handlePlayPattern() {
            this.audio.play()
        },
        handlePlayLast() {
            
        },
        handlePlay() {
            this.isPlay = !this.isPlay;
        },
        handlePlayNext() {
            this.handleAnimation = "none";
            setTimeout(function() {
                this.handleAnimation = "addKeyFrames";    
            }.bind(this), 1000)
        },
        handlePlayList() {
            
        },
        goBack() {
            
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/audio-player/audio-player.less";
</style>