<template>
    <div ref="banner" class="banner"
        @touchstart="moveStart"
        @touchmove="moving"
        @touchend="moveEnd">
        <banner-item v-for="(item, index) in imgArray" :key="index">
             <img :src="item">
        </banner-item>
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
            this.imgArray.splice(0, 0, this.imgArray[this.imgArray.length - 1]);
            this.imgArray.push(this.imgArray[1]);
        }
    },
    mounted () {
        this.initImgs();
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
        setTranslate(duration) {
            duration = duration || this.duration;
            this.items.forEach(item => {
                item.style.transition = this.duration + 'ms';
            })
        },
        moveStart(e) {
            e.preventDefault();
            e.stopPropagation();
            this.startX = e.changedTouches[0].pageX;
            this.moveX = e.changedTouches[0].pageX;
            this.setTranslate('none');
        },
        moving(e) {
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
            console.log(this.updateTransformX())
            console.log(this.getIndex());
        },
        moveEnd(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        getIndex() {
            let transformX = this.updateTransformX();
            return Math.abs(Math.floor((transformX - (this.boxWidth + 10) / 2) / (this.boxWidth + 10))) - 2;
        },
        goIndex() {
            
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/banner.less";
</style>