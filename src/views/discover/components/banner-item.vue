<template>
    <div class="banner_item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "banner-item"
}
</script>
<style lang="less" scoped>
.banner_item {
    flex-shrink: 0;
    margin-right: 10px;
    width: 100%;
    img, h1, h2, h3, h4, h5, div, span {
        width: 100%;
    }
    img {
        border-radius: 8px;
    }
}
</style>