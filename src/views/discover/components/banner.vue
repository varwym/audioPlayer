<template>
    <div ref="banner" class="banner"
        @touchstart="moveStart"
        @touchmove="moving"
        @touchend="moveEnd">
        <banner-item v-for="(item, ItemIndex) in imgArray" :key="ItemIndex">
             <img :src="item">
        </banner-item>
    <ul class="banner_dotList">
        <li v-for="(dot, dotIndex) in oldImgArray" :key="dotIndex" :class="{selectedIndex: dotIndex === index}"></li>
    </ul>
    </div>
</template>
<script>
import BannerItem from "./banner-item.vue";
import { type } from 'os';
export default {
    name: "banner",
    components: {
        BannerItem
    },
    props: ["imgs"],
    data() {
        return {
            oldImgArray: [],
            imgArray: this.imgs,
            items: [],
            boxWidth: 0,
            index: 0,
            startX: 0,
            moveX: 0,
            transformX: 0,
            duration: 0
        }
    },
    created() {
       if (this.imgArray.length > 1) {
            this.oldImgArray = this.imgArray.concat();
            this.imgArray.splice(0, 0, this.imgArray[this.imgArray.length - 1]);
            this.imgArray.push(this.imgArray[1]);
        } else {
            this.oldImgArray = this.imgArray;
        }
    },
    mounted () {
        this.initImgs();
        this.autoPlay();
    },
    beforeDestroy() {
        typeof(this.swiperTimer) !== "undefined" ? clearInterval(this.swiperTimer) : console.log('timer不存在');
    },
    methods: {
        initImgs() {
            this.items = this.$refs.banner.querySelectorAll('.banner_item');
            if (this.items.length > 1) {
                this.boxWidth = this.$refs.banner.offsetWidth;
                this.items.forEach(item => {
                    item.style.transform = `translate3d(${-this.boxWidth - 10}px, 0, 0)`;
                });
                this.updateTransformX();
                
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
            typeof(this.swiperTimer) !== "undefined" ? clearInterval(this.swiperTimer) : console.log('timer不存在');
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
                let newTransformX = -(this.boxWidth + 10) * (this.imgs.length - 2) + this.transformX;
                this.updateTransformX(newTransformX);
                this.setTransform();
            } else if (transformX < -(this.boxWidth + 10) * (this.imgs.length - 2) - (this.boxWidth + 10) / 2) {
                let newTransformX = (this.boxWidth + 10) * (this.imgs.length - 2) + this.transformX;
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
            index = index === -1 ? 0 : index === this.imgArray.length - 2 ? this.imgArray.length - 3 : index;
            if (this.index !== index) {
                this.index = index;
            }
        },
        goIndex() {
            this.setTranslate(200);
            this.setTransformOfIndex(this.index);
        },
        autoPlay() {
            this.swiperTimer = setInterval(function() {
                this.index !== this.oldImgArray.length - 1 ? this.index++ : this.index = 0;
                this.goIndex();
            }.bind(this), 3000);
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/banner.less";
</style>