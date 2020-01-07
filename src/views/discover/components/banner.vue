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
            startX: 0
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
                this.setTransform();
            } else {
                console.log('轮播图数量小于2');
            }
        },
        setTransform(offsetNum) {
            let offset = offsetNum || 0;
            let offsetNew = (this.index + 1) * (this.boxWidth + 10) - offset;
            this.items.forEach(item => {
                 item.style.transform = `translate3d(${-offsetNew}px, 0, 0)`;
            });
        },
        setTranslate() {
            this.items.forEach(item => {
                
            })
        },
        moveStart(e) {
            e.preventDefault();
            e.stopPropagation();
            this.startX = e.changedTouches[0].pageX;
        },
        moving(e) {
            e.preventDefault();
            e.stopPropagation();
            let moveX = e.changedTouches[0].pageX - this.startX;
            this.setTransform(moveX);
        },
        moveEnd(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(this.items[0].style.transform.split(',')[0].split('(')[1])
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/banner.less";
</style>