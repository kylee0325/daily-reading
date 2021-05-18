<template>
	<view>
		<view style="padding: 50rpx;text-align: center;" v-if="loading"><u-loading show size="48" v></u-loading></view>
		<view v-else><slot /></view>
	</view>
</template>

<script>
export default {
	name: 'spin',
	props: {
		loading: {
			type: [Boolean, String],
			default: false
		}
	}
};
</script>

<style lang="scss"></style>
