<template>
    <div class="player-progress">
        <p>{{getOnDuration}}</p>
        <div ref="progressLine" class="player-progress-line" @touchstart="lineTouchStart" @touchmove="handleTouchMove" @touchend="touchEnd">
            <div class="player-progress-isPlay" :style="{width: `${this.left}px`}"></div>
            <div class="player-progress-button" @touchstart="touchStart" @touchend="touchEnd" @touchmove="handleTouchMove" :style="[handleLeft, handleTransform]"></div>
        </div>
        <p>{{getDuration}}</p>
    </div>
</template>
<script>
export default {
    name: "player-progress",
    props: {
        duration: Number,
        onduration: Number,
        onControl: Function
    },
    data() {
        return {
            isDray: false,
            left: 0,
            initX: 0,
            startX: 0,
            percentage: 0,
            isControl: false
        }
    },
    watch: {
        isDray() {
            this.onControl(this.isDray, this.percentage);      
        },
        onduration() {
            if (!this.isDray) {
                this.percentage = this.onduration / this.duration;
                this.handleResize();
            }
        }
    },
    computed: {
        getDuration() {
            return this.handleMinToSe(this.duration);
        },
        getOnDuration() {
            return this.handleMinToSe(this.onduration);
        },
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
    mounted() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleMinToSe(duration) {
            let min = parseInt(duration / 60);
            let se = Math.floor(duration % 60);
            if (min === 0 || min < 10) {
                min = `0${min.toString()}`;
            } else {
                min = min.toString();
            }
            if (se === 0 || se  < 10) {
                se = `0${se.toString()}`;
            } else if (se === 60) {
                se = '00';
            } else {
                se = se.toString();
            }
            return min + ':' + se;
        },
        handleResize() {
            this.left = (this.$refs.progressLine.offsetWidth - 10) * this.percentage;
        },
        handleTouchMove(e) {
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