<template>
    <div ref="banner" class="banner"
        @touchstart="moveStart"
        @touchmove="moving"
        @touchend="moveEnd">
        <banner-item v-for="(item, index) in imgArray" :key="item.id + index">
             <img :src="item.src">
        </banner-item>
    <ul class="banner-dotList">
        <li v-for="(dot, dotIndex) in oldImgArray" :key="dotIndex" :class="{selectedIndex: dotIndex === index}"></li>
    </ul>
    </div>
</template>
<script>
import BannerItem from "./banner-item.vue";
export default {
    name: "banner",
    components: {
        BannerItem
    },
    props: ["imgs"],
    data() {
        return {
            oldImgArray: [],
            imgArray: [],
            items: [],
            boxWidth: 0,
            index: 0,
            startX: 0,
            moveX: 0,
            transformX: 0,
            duration: 0,
            isListening: false
        }
    },
    watch: {
        imgs() {
            this.imgArray = JSON.parse(JSON.stringify(this.imgs));
            this.initImgList();
            this.$nextTick(function() {
              this.initImgs();
            })
        }
    },
    created() {
        this.imgArray = JSON.parse(JSON.stringify(this.imgs));
        this.initImgList();
    },
    mounted () {
        this.initImgs();
        this.autoPlay();
        window.addEventListener("resize", this.initImgs);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.initImgs);
        if (this.swiperTimer) {
            clearInterval(this.swiperTimer);
            this.swiperTimer = null;
        }
    },
    methods: {
        initImgList() {
            this.oldImgArray = JSON.parse(JSON.stringify(this.imgArray))
            if (this.imgArray.length > 1) {
                this.imgArray.splice(0, 0, this.imgArray[this.imgArray.length - 1]);
                this.imgArray.push(this.imgArray[1]);
            }
        },
        addAnimationListener(callback) {
            if (!this.isListening) {
                this.isListening = true;
                this.items[0].addEventListener('transitionend', function() {
                    callback();
                }.bind(this))
            }
        },
        initImgs() {
            this.index = 0;
            this.items = this.$refs.banner.querySelectorAll('.banner_item');
            if (this.items.length > 1) {
                this.boxWidth = this.$refs.banner.offsetWidth;
                this.items.forEach(item => {
                    item.style.transform = `translate3d(${-this.boxWidth - 10}px, 0, 0)`;
                });
                this.updateTransformX();
                this.addAnimationListener(this.checkLastImg);
            } else {
                console.log('轮播图数量小于2');
            }
        },
        updateTransformX(x) {
            this.transformX = x || parseInt(this.items[0].style.transform.split(',')[0].split('(')[1].split('px')[0]);
            return this.transformX;
        },
        setTransform(offsetNum) {
            offsetNum = offsetNum || 0;
            let offsetNew = offsetNum + this.transformX;
            this.items.forEach(item => {
                 item.style.transform = `translate3d(${offsetNew}px, 0, 0)`;
            });
        },
        setTransformOfIndex(index) {
            let offset = -(index + 1) * (this.boxWidth + 10);
            this.items.forEach(item => {
                 item.style.transform = `translate3d(${offset}px, 0, 0)`;
            });
            this.$refs.banner.querySelectorAll('.banner_item');
        },
        checkLastImg() {
            if (this.index === this.oldImgArray.length) {
                this.index = 0;
                this.setTranslate('none');
                this.setTransformOfIndex(0);
            }
        },
        setTranslate(duration) {
            duration = duration || this.duration;
            this.items.forEach(item => {
                item.style.transition = duration + 'ms';
            })
        },
        moveStart(e) {
            if (this.items.length <= 1) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            this.startX = e.changedTouches[0].pageX;
            this.moveX = e.changedTouches[0].pageX;
            this.setTranslate('none');
            if (this.swiperTimer) {
                clearInterval(this.swiperTimer);
                this.swiperTimer = null;
            }
        },
        moving(e) {
            if (this.items.length <= 1) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            let moveX = e.changedTouches[0].pageX - this.moveX;
            this.moveX = e.changedTouches[0].pageX;
            let transformX = this.updateTransformX();
            if (transformX >= -(this.boxWidth + 10) / 2) {
                let newTransformX = -(this.boxWidth + 10) * (this.imgArray.length - 2) + this.transformX;
                this.updateTransformX(newTransformX);
                this.setTransform();
            } else if (transformX < -(this.boxWidth + 10) * (this.imgArray.length - 2) - (this.boxWidth + 10) / 2) {
                let newTransformX = (this.boxWidth + 10) * (this.imgArray.length - 2) + this.transformX;
                this.updateTransformX(newTransformX)
                this.setTransform();
            } else {
                this.setTransform(moveX);
            }
            this.upDateIndex();
        },
        moveEnd(e) {
            if (this.items.length <= 1) {
                return
            }
            e.preventDefault();
            e.stopPropagation();
            this.goIndex();
            this.autoPlay();
        },
        upDateIndex() {
            let transformX = this.updateTransformX();
            let index = Math.abs(Math.floor((transformX - (this.boxWidth + 10) / 2) / (this.boxWidth + 10))) - 2;
            if (this.index !== index) {
                this.index = index;
            }
        },
        goIndex() {
            this.setTranslate(500);
            this.setTransformOfIndex(this.index);
        },
        autoPlay() {
            if (this.swiperTimer) {
                clearInterval(this.swiperTimer);
                this.swiperTimer = null;
            }
            this.swiperTimer = setInterval(function() {
                this.index !== this.oldImgArray.length ? this.index++ : this.index = 0;
                this.goIndex();
            }.bind(this), 3000);
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/banner.less";
</style>