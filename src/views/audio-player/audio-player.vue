<template>
    <div v-show="songList && songList.length > 0">
        <div style="width: 100%; height: 50px"></div>
        <transition name="fullScreen">
            <div v-if="showState === 0" class="player-container">
                <div class="player-background" :style="backgroundImg"></div>
                <div class="player-list">
                    <back-button 
                        :isTransparent="true"
                        :title="name"
                        :isWhite="true"
                        :click="setMiniScreen"
                    />
                    <div class="songImg-container">
                        <img :class="handleAnimation" :style="[handlePlayState]" :src="picUrl">
                        <player-progress 
                            :duration="duration"
                            :onduration="onduration"
                            :onControl="onControl"
                        />
                    </div>
                </div>
                <div ref="bottomButtons" class="player-bottom-container">
                    <img @click="handlePlayPattern" class="normal-button" :src="buttons.repeat[this.playerState]">
                    <img @click="handlePlayLast" class="normal-button" :src="buttons.last">
                    <img @click="handlePlay" class="play-button" :src="isPlay ? buttons.pause : buttons.play">
                    <img @click="handlePlayNext" class="normal-button" :src="buttons.next">
                    <img @click="handlePlayList" class="normal-button" :src="buttons.play_list_button">
                </div>
            </div>
        </transition>
        <transition name="miniScreen">
            <div v-if="showState === 1" class="bottom-player-container" @click="setFullScreen">
                <img :src="picUrl" />
                <div>
                    <p>{{name}}</p>
                    <p>{{singer}}</p>
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
        name() {
            return this.song.name;
        },
        picUrl() {
            return this.song.picUrl;
        },
        backgroundImg() {
            return { backgroundImage: `url('${this.song.picUrl}')`}
        },
        singer() {
            return this.song.singer;
        },
        ...mapState({
            isPlay: state => state.audio.isPlay,
            songList: state => state.audio.songList,
            showState: state => state.audio.showState,
            index: state => state.audio.index,
            song: state => state.audio.song,
            playerState: state => state.audio.playerState
        })
    },
    mounted() {
        this.setOnDuration();
    },
    beforeDestroy() {
        let au = document.querySelector("#audioPlayer");
        au.removeEventListener("timeupdate", this.setCurrentTime);
        au.removeEventListener("ended", this.setEnded);
    },
    data() {
        return {
            handleAnimation: "addKeyFrames",
            isCheck: false,
            buttons: {
                repeat: [require("assets/list_play_button.png"), require("assets/random_play_button.png"), require("assets/single_play_button.png")],
                last: require("assets/last_button.png"),
                play: require("assets/play_button.png"),
                blackPlay: require("assets/black_play_button.png"),
                pause: require("assets/pause_button.png"),
                blackPause: require("assets/black_pause_button.png"),
                next: require("assets/next_button.png"),
                play_list_button: require("assets/play_list_button.png")
            },
            duration: 0,
            onduration: 0
        }
    },
    methods: {
        onControl(b, pe) {
            this.isCheck = b;
            if (!b) {
                document.querySelector("#audioPlayer").currentTime = pe * this.duration;
            } 
        },
        setOnDuration() {
            let this_ = this;
            let au = document.querySelector("#audioPlayer");
            au.oncanplay = function() {
                this_.duration = au.duration;
            }
            au.addEventListener("timeupdate", this.setCurrentTime);
            au.addEventListener("ended", this.setEnded);
        },
        setCurrentTime() {
            this.onduration = document.querySelector("#audioPlayer").currentTime;
        },
        setEnded() {
            switch (this.playerState) {
                case 0: {
                    this.nextSong();
                    this.playSong(this.song.id);
                    break;
                }
                case 1: {
                    this.checkIndex(Math.floor(Math.random() * (this.songList.length)));
                    this.playSong(this.song.id);
                    break;
                }
                case 2: {
                    this.playSong(this.song.id);
                    break;
                }
                default:
                    break;
            }
        },
        handlePlayPattern() {
            if (this.playerState < 2) {
                this.checkPlayerState(this.playerState + 1);
            } else {
                this.checkPlayerState(0);
            }
        },
        handlePlayLast() {
            this.lastSong();
            this.playSong(this.song.id);
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
            this.nextSong();
            this.playSong(this.song.id); 
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
        ...mapActions(["checkShowState", "startPlayer", "pausePlayer", "nextSong", "lastSong", "checkPlayerState", "checkIndex"])
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/audio-player/audio-player.less";
</style>