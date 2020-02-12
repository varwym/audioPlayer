<template>
    <div class="back-button" :class="{noTransparent: !isTransparent, isWhite: isWhite}">
        <img :src="isWhite ? imgUrl[1] : imgUrl[0]" @click="click">
        <span>{{title}}</span>
    </div>
</template>
<script>
export default {
    name: "back-button",
    props: {
        isTransparent: {
            default: false,
            type: Boolean
        },
        title: {
            default: "",
            type: String
        },
        isWhite: {
            default: false,
            type: Boolean
        },
        click: {
            type: Function
        }
    },
    created() {
        
    },
    data() {
        return {
            imgUrl: [require("../assets/black_backButton.png"), require("../assets/white_backButton.png")]
        }
    }
}
</script>
<style lang="less" scoped>
    .back-button {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 40px;
        z-index: 101;
        img {
            margin-left: 10px;
            width: 20px;
        }
        span {
            margin-left: 10px;
            font-size: 16px;
        }
    }
    .noTransparent {
        background-color: white;
    }
    .isWhite {
        span {
            color: white;
        }
    }
</style>