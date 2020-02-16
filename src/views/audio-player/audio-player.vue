<template>
    <div v-show="songList && songList.tracks.length > 0">
        <transition name="fullScreen">
            <div v-if="showState === 0" class="player-container">
                <div class="player-background" :style="backgroundImg"></div>
                <div class="player-list">
                    <back-button 
                        :isTransparent="true"
                        :title="'歌曲'"
                        :isWhite="true"
                        :click="setMiniScreen"
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
        </transition>
        <transition name="miniScreen">
            <div v-if="showState === 1" class="bottom-player-container" @click="setFullScreen">
                <img src="http://p1.music.126.net/RRBZ6_ROUJ711RboCQkXxA==/3417282143625721.jpg" />
                <div>
                    <p></p>
                    <p></p>
                </div>
                <img :src="isPlay ? buttons.blackPause : buttons.blackPlay" @click="handlePlay">
            </div>
        </transition>
        <audio id="audioPlayer"></audio>
    </div>
</template>
<script>
import backButton from "../../components/back-button.vue";
import playerProgress from "./components/progress.vue";
import { audioMixin } from "./components/audioMixin";
import { mapState, mapActions } from "vuex";
export default {
    name: "audio-player",
    components: {
        backButton,
        playerProgress
    },
    mixins: [audioMixin],
    computed: {
        handlePlayState() {
            return {
                "animation-play-state": this.isPlay ? 'running' : 'paused' 
            }
        },
        ...mapState({
            isPlay: state => state.audio.isPlay,
            songList: state => state.audio.songList,
            showState: state => state.audio.showState,
            index: state => state.audio.index
        })
    },
    mounted() {
        this.onDurition();
    },
    data() {
        return {
            backgroundImg: {
                backgroundImage: `url('${"https://p1.music.126.net/S795Ixp1XCjuloMgX1zumA==/109951164673872675.jpg"}')`
            },
            handleAnimation: "addKeyFrames",
            isCheck: false,
            buttons: {
                repeat: [require("assets/random_play_button.png")],
                last: require("assets/last_button.png"),
                play: require("assets/play_button.png"),
                blackPlay: require("assets/black_play_button.png"),
                pause: require("assets/pause_button.png"),
                blackPause: require("assets/black_pause_button.png"),
                next: require("assets/next_button.png"),
                play_list_button: require("assets/play_list_button.png")
            },
            isFirst: true
        }
    },
    methods: {
        onDurition() {
            let au = document.querySelector("#audioPlayer");
            au.oncanplay = function() {
                console.log(au.duration)
            }
        },
        onPlay() {
            console.log("接收消息");
        },
        handlePlayPattern() {
            
        },
        handlePlayLast() {
            
        },
        handlePlay(e) {
            e.stopPropagation();
            if (this.isPlay) {
                this.pausePlayer();
                document.querySelector("#audioPlayer").pause();
            } else {
                this.startPlayer();
                document.querySelector("#audioPlayer").play();
            }
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
            
        },
        setFullScreen() {
            this.checkShowState(0);
        },
        setMiniScreen() {
            this.checkShowState(1);  
        },
        ...mapActions(["checkShowState", "startPlayer", "pausePlayer"])
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/audio-player/audio-player.less";
</style>