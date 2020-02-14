<template>
    <div class="player-progress">
        <p>00:00</p>
        <div ref="progressLine" class="player-progress-line" @touchstart="lineTouchStart" @touchmove="handleTouchMove" @touchend="touchEnd">
            <div class="player-progress-isPlay" :style="{width: `${this.left}px`}"></div>
            <div class="player-progress-button" @touchstart="touchStart" @touchend="touchEnd" @touchmove="handleTouchMove" :style="[handleLeft, handleTransform]"></div>
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
            left: 0,
            initX: 0,
            startX: 0,
            percentage: 0
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
                left: `${this.left}px`
            }
        }
    },
    props: {
        totalTime: String
    },
    mounted() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.left = this.$refs.progressLine.offsetWidth * this.percentage;
        },
        handleTouchMove(e) {
            console.log(e)
            let lineWidth = this.$refs.progressLine.offsetWidth;
            let moveX = e.changedTouches[0].pageX - this.startX;
            if (moveX + this.initX <= 0) {
                this.left = 0;
            } else if (moveX + this.initX >= lineWidth - 10) {
                this.left = lineWidth - 10;
            } else {
                this.left = moveX + this.initX;
            }
        },
        lineTouchStart(e) {
            this.isDray = true;
            this.initX = e.changedTouches[0].pageX - (document.body.clientWidth - this.$refs.progressLine.offsetWidth) / 2;
            this.startX = e.changedTouches[0].pageX;
            if (this.initX <= 0) {
                this.initX = 0;
                this.left = 0;
            } else if (this.initX >= this.$refs.progressLine.offsetWidth - 10) {
                this.initX = this.$refs.progressLine.offsetWidth - 10;
                this.left = this.$refs.progressLine.offsetWidth - 10;
            } else {
                this.startX = e.changedTouches[0].pageX;
                this.left = this.initX;
            }
        },
        touchStart(e) {
            e.stopPropagation();
            this.isDray = true;
            this.initX = e.target.offsetLeft;
            this.startX = e.changedTouches[0].pageX;
        },
        touchEnd() {
            this.isDray = false;
            this.percentage = this.left / (this.$refs.progressLine.offsetWidth - 10);
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/audio-player/progress.less";
</style>