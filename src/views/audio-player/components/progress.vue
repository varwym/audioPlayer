<template>
    <div class="player-progress">
        <p>00:00</p>
        <div class="player-progress-line">
            <div class="player-progress-isPlay"></div>
            <div class="player-progress-button" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchmove" :style="[handleLeft, handleTransform]"></div>
        </div>
        <p>05:00</p>
    </div>
</template>
<script>
export default {
    name: "player-progress",
    data() {
        return {
            isDray: false,
            left: "30px",
            initX: 0
        }
    },
    computed: {
        handleTransform() {
            return {
                transform: this.isDray ? "scale(1.2)" : null
            }
        },
        handleLeft() {
            return {
                left: this.left
            }
        }
    },
    props: {
        totalTime: String
    },
    mounted() {
        console.log(this.handleLeft)
    },
    methods: {
        touchStart(e) {
            this.isDray = true;
            this.initX = e.changedTouches[0].pageX;
        },
        touchmove(e) {
            console.log(e.changedTouches[0].pageX - this.initX)
        },
        touchEnd() {
            this.isDray = false;
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/audio-player/progress.less";
</style>