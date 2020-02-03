<template>
	<div>
		<navigation :select="select" @onSelect="checkSelect"/>
		<div class="list">
			<router-view/>
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
			select: 1
		}	
	},
	components: {
		navigation,
		discover
	},
	created() {
		let navigations = ["me", "discover", "square", "video"];
		navigations.forEach((item, index) => {
			if (window.location.href.indexOf(navigations[index]) >= 0) {
				this.select = index;
			}
		})
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
    position: relative;
    top: 35px;
    left: 10px;
    margin-top: 10px;
    width: calc(100% - 20px);
}
</style>
