<template>
    <div ref="container" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @mousewheel.prevent>
        <slot></slot>
        <div class="loadmore">正在加载</div>
    </div>    
</template>
<script>
export default {
    name: "scroll-up",
    data() {
        return {
            startY: 0,
            spring: 0.44,
            transformY: 0
        }
    },
    methods: {
        touchstart(e) {
            this.startY = e.changedTouches[0].clientY;
        },
        getTransformY() {
            return parseInt(this.$refs.container.style.transform.split(',')[1].split('px')[0]);
        },
        setTransform(y) {
            this.$refs.container.style.transform = `translate3d(0, ${y}px, 0)`;
        },
        touchmove(e) {
            e.preventDefault();
            e.stopPropagation();
            let moveY = e.changedTouches[0].clientY - this.startY;
            this.setTransform()
            if (this.transformY <=0) {
                
            } else if (this.transformY) {
                
            } else {
                
            }
            this.transformY += moveY;
            console.log(this.transformY)
            this.setTransform(this.transformY);
            this.startY = e.changedTouches[0].clientY;
        },
        touchend() {
            this.startY = 0;
        }
    }
}
</script>
<style lang="less" scoped>
.loadmore {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: red;
}
</style>