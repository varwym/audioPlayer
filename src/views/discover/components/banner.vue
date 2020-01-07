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
            console.log(this.items[0])
            if (this.items.length > 1) {
                this.boxWidth = this.$refs.banner.offsetWidth;
                this.items.forEach(item => {
                    item.style.transform = `translate3d(${-this.boxWidth - 10}px, 0, 0)`;
                });
                //设置初始偏移量
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
            if (this.transformX !== 0) {
                //点击设置x轴值防止动画时点击问题
                this.updateTransformX();
            }
            this.startX = e.changedTouches[0].pageX;
        },
        moving(e) {
            e.preventDefault();
            e.stopPropagation();
            let moveX = e.changedTouches[0].pageX - this.startX;
            this.startX = e.changedTouches[0].pageX;
            let transformX = this.updateTransformX();
            if (transformX > -(this.boxWidth + 10) / 2) {
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
        },
        moveEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            //保存x轴值
            this.updateTransformX();
            if (this.transformX) {
                
            }
        },
        goIndex() {
            
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/banner.less";
</style>