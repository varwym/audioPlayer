<template>
	<div style="overflow: hidden;">
		<navigation :navigations="navigations"/>
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
	data() {
		return {
			select: 1,
			navigations: ["me", "discover", "square", "video"]
		}	
	},
	components: {
		navigation,
		discover
	},
	methods: {
		checkSelect(i) {
			this.select = i;
		}
	}
}

</script>
<style lang="less" scoped>
.list {
	margin-left: 10px;
    margin-top: 45px;
    width: calc(100% - 20px);
}
</style>
