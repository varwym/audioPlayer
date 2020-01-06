<template>
    <div ref="swiper" class="swiper">
        <img class="swiper_img" v-for="(item, index) in imgArray" :src="item"  :key="index" />
    </div>
</template>
<script>
export default {
    name: "banner",
    data() {
        return {
            imgArray: ["http://p1.music.126.net/hggCzQXcwB4oe4qTra2JLw==/109951164602910186.jpg", "http://p1.music.126.net/o4TXSVd4fMj9o1nJ8iFXYQ==/109951164602906935.jpg", "http://p1.music.126.net/Jtfsz1HNm7rwCFlqVFakqQ==/109951164602919586.jpg"]
        }
    },
    created() {
        console.log(this.$refs.swiper)
        
    },
    mounted () {
        console.log(this.$refs.swiper.querySelectorAll('.swiper_img'))
        this.$refs.swiper.querySelectorAll('.swiper_img')[0].style.transform = `translate3d(50px, 0, 0)`
        
    },
    methods: {
        initImgs() {
            if(imgArray.length > 1) {
                imgArray.push(imgArray[0]);
                imgArray.splice(0, 0, imgArray[imgArray.length - 1]);
                
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/discover/banner.less";
</style>