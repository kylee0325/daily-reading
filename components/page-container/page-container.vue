<template>
	<view :class="isFullPage ? 'full-page' : ''">
		<u-navbar
			v-if="hasNavbar"
			:is-back="isBack"
			:title="title"
			:is-fixed="isFullPage ? false : isFixed"
			:border-bottom="borderBottom"
			:z-index="zIndex"
			:custom-back="customBack"
		>
			<template>
				<view class="slot-wrap"><slot name="navbar"></slot></view>
			</template>
			<template v-slot:right>
				<slot name="navbar-right"></slot>
			</template>
		</u-navbar>
		<!-- <view class="loading-wrap" v-if="loading"><u-loading :show="loading" size="48"></u-loading></view> -->
		<u-no-network></u-no-network>
		<view class="page-content"><slot></slot></view>
	</view>
</template>

<script>
export default {
	name: 'page-container',
	props: {
		isFullPage: {
			type: [Boolean, String],
			default: false
		},
		hasNavbar: {
			type: [Boolean, String],
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: true
		},
		// 导航栏是否固定在顶部
		isFixed: {
			type: Boolean,
			default: true
		},
		// 是否显示导航栏的下边框
		borderBottom: {
			type: Boolean,
			default: true
		},
		zIndex: {
			type: [String, Number],
			default: ''
		},
		// 自定义返回逻辑
		customBack: {
			type: Function,
			default: null
		}
	},
	// data() {
	// 	return {
	// 		loading: true
	// 	};
	// },
	// mounted() {
	// 	this.loading = false;
	// }
};
</script>

<style lang="scss">
.full-page {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.page-content {
		flex: 1;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}
}
.slot-wrap {
	display: flex;
	align-items: center;
	/* 如果您想让slot内容占满整个导航栏的宽度 */
	flex: 1;
	/* 如果您想让slot内容与导航栏左右有空隙 */
	padding: 0 30rpx;
}
.loading-wrap {
	display: flex;
	justify-content: center;
	padding: 30rpx;
}
</style>
