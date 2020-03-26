<template>
    <div ref="container" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @mousewheel.prevent>
        <slot></slot>
        <div v-if="isMoreProp" class="loadmore">正在加载</div>
        <div v-else class="loadmore">没有更多了</div>
    </div>    
</template>
<script>
export default {
    name: "scroll-up",
    props: {
        loadMore: {
            type: Function
        },
        isMoreProp: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            startY: 0,
            spring: 0.24,
            transformY: 0,
            duration: 0
        }
    },
    methods: {
        touchstart(e) {
            this.startY = e.changedTouches[0].clientY;
            this.setTransform();
        },
        getTransformY() {
            return parseInt(this.$refs.container.style.transform.split(',')[1].split('px')[0]);
        },
        setTransform(y) {
            this.$refs.container.style.transform = `translate3d(0, ${y}px, 0)`;
        },
        setTranslate(duration) {
            duration = duration || this.duration;
            this.$refs.container.style.transition = duration + 'ms';
        },
        touchmove(e) {
            e.preventDefault();
            let moveY = e.changedTouches[0].clientY - this.startY;
            if (this.transformY >=0) {
                this.transformY += moveY * this.spring;
            } else if (this.transformY <= -(document.documentElement.scrollHeight - document.body.clientHeight - 40)) {
                this.transformY += moveY * this.spring;
            } else {
                this.transformY += moveY
            }
            this.setTranslate(0);
            this.setTransform(this.transformY);
            this.startY = e.changedTouches[0].clientY;
        },
        touchend(e) {
            e.stopPropagation();
            this.startY = 0;
            if (this.transformY > 0) {
                this.setTranslate(200);
                this.transformY = 0;
                this.setTransform(this.transformY);
            } else if (this.transformY <= -(document.documentElement.scrollHeight - document.body.clientHeight - 40)) {
                this.setTranslate(200);
                this.transformY = -(document.documentElement.scrollHeight - document.body.clientHeight - 40);
                this.setTransform(this.transformY);
                if (this.isMoreProp) {
                    this.loadMore(this.moveto);   
                }
            }
        },
        moveto() {
            this.transformY -= 40;
            this.setTransform(this.transformY);
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
}
</style>