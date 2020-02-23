<template>
	<div style="overflow: hidden;">
		<navigation/>
		<div class="list">
			<keep-alive>
				<router-view/>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import navigation from '../components/navigation';
import discover from './discover/discover';
export default {
	name: "home",
	components: {
		navigation,
		discover
	}
}

</script>
<style lang="less" scoped>
@import "../styles/common.less";
.list {
	margin-left: 10px;
    margin-top: 45px;
    width: calc(100% - 20px);
}
</style>
