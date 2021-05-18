<template>
	<page-container title="回收站">
		<view class="index-content"><scroll-list ref="scrollList" type="recycle"></scroll-list></view>
	</page-container>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	// background-color: #f5f7fa;
	background-color: $uni-bg-color-grey;
}
.index-content {
	padding-bottom: 24rpx;
}
</style>
