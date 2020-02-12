<template>
    <div ref="song_list_item" class="song-list-item" :class="{'song-list-item-text-animationStart' : tapOption === 1, 'song-list-item-text-animationEnd': tapOption === 2}" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <img v-if="isPlay" src="../../../assets/isPlay_button.png" />
        <p v-else class="song-list-item-number">
            {{index}}
        </p>
        <div class="song-list-item-text">
            <span>{{title}}</span>
            <span>{{name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "song-list-item",
    data() {
      return {
          tapOption: 0
      }  
    },
    props: {
        isPlay: {
            type: Boolean,
            default: false
        },
        title: {
          type: String,
          default: ""  
        },
        name: {
            type: String,
            default: ""
        },
        index: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.$refs.song_list_item.addEventListener("animationend", function () {
            if (this.tapOption === 2) {
                this.tapOption = 0;
            }
        }.bind(this))  
    },
    methods: {
        handleTouchStart() {
            this.tapOption = 1;
        },
        handleTouchEnd() {
            this.tapOption = 2;
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../styles/day-recommend/song-list-item.less";
</style>