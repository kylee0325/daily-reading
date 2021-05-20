<template>
	<page-container title=" " :is-back="false" :border-bottom="false">
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="toLogin">
			<view class="u-m-r-20"><u-avatar :src="userInfo.avatar || ''" size="100"></u-avatar></view>
			<view class="u-flex-1">
				<view class="u-font-18" v-if="hasLogin">{{ userInfo.nickname || '' }}</view>
				<view class="u-font-18" v-else>请先登录</view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10"><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view> -->
		</view>

		<view class="u-m-t-20">
			<u-cell-group><u-cell-item icon="trash" title="回收站" @tap="fabClick"></u-cell-item></u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="收藏"></u-cell-item>
				<u-cell-item icon="photo" title="相册"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item>
				<u-cell-item icon="heart" title="关注"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group><u-cell-item icon="setting" title="设置"></u-cell-item></u-cell-group>
		</view>
	</page-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	onLoad() {},
	methods: {
		toLogin() {
			if (this.hasLogin) return;
			uni.navigateTo({
				url: '../login/login'
			});
		},
		fabClick() {
			if (!this.hasLogin) {
				uni.showToast({
					title: '请先登录'
				});
				return;
			}
			uni.navigateTo({
				url: './recycle-station'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f7fa;
}

.camera {
	width: 54px;
	height: 44px;

	&:active {
		background-color: #ededed;
	}
}
.user-box {
	background-color: #fff;
}
</style>
