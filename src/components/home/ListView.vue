<template>
    <div class="ListView-center">
        <LeftList />
        <RightList />
    </div>
</template>
<script>
import LeftList from '@/components/home/LeftList.vue';
import RightList from '@/components/home/RightList.vue';
export default {
    name: "ListView",
    components: {
        LeftList,
        RightList
    }
}
</script>
<style lang="less" scoped>
    .ListView-center {
        position: absolute;
        top: 45px;
        height: calc(100% - 45px);
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }
</style>