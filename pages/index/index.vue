<template>
	<page-container title=" " :is-back="false">
		<template v-slot:navbar>
			<view class="nav-bar">
				<u-avatar :src="userInfo.avatar" size="mini" style="margin-right: 24rpx;"></u-avatar>
				<u-search placeholder="搜索关键词" v-model="keyword" :show-action="false" @search="handleSearch"></u-search>
			</view>
		</template>

		<view class="index-content"><scroll-list ref="scrollList" :params="{ keyword: keyword }"></scroll-list></view>

		<view class="start-wrap" @click="handleArticleAdd">
			<u-icon name="plus"></u-icon>
			<text>发布</text>
		</view>
	</page-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

let _this;
export default {
	data() {
		return {
			keyword: ''
		};
	},
	computed: mapState(['hasLogin', 'userInfo']),
	created() {
		_this = this;
	},
	onLoad() {
		let uniIdToken = uni.getStorageSync('uni_id_token');
		if (uniIdToken) {
			uniCloud.callFunction({
				name: 'user-center',
				data: {
					action: 'checkToken'
				},
				success: e => {
					if (e.result.code > 0) {
						_this.logout();
						uni.setStorageSync('uni_id_token', '');
						uni.setStorageSync('uni_id_token_expired', '');
						uni.showModal({
							title: '登录状态已失效,请重新登录',
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../login/login'
									});
								}
							}
						});
					} else {
						this.login(e.result.userInfo);
					}
				},
				fail(e) {
					uni.showModal({
						content: JSON.stringify(e),
						showCancel: false
					});
				}
			});
		} else {
			this.guideToLogin();
		}
	},
	methods: {
		...mapMutations(['login', 'logout']),
		guideToLogin() {
			uni.showModal({
				title: '未登录',
				content: '您未登录，需要登录后才能继续',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({
							url: '../login/login'
						});
					}
				}
			});
		},
		handleSearch(v) {
			_this.$refs.scrollList.downCallback();
		},
		handleArticleAdd() {
			if (!this.hasLogin) {
				this.guideToLogin();
				return;
			}
			uni.navigateTo({
				url: '/pages/articles/edit',
				events: {
					refreshData: () => {
						_this.$refs.scrollList.downCallback();
					}
				}
			});
		},
		fabClick() {
			// 打开新增页面
			uni.navigateTo({
				url: './add',
				events: {
					// 监听新增数据成功后, 刷新当前页面数据
					refreshData: () => {
						this.$refs.udb.loadData({
							clear: true
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	// background-color: #f5f7fa;
	background-color: $uni-bg-color-grey;
}
.nav-bar {
	display: flex;
	align-items: center;
}
.title {
	padding: 0 30rpx;
	color: $uni-color-primary;
}
.index-content {
	padding-bottom: 24rpx;
}
.start-wrap {
	position: fixed;
	right: 0;
	bottom: 50rpx;
	display: flex;
	align-items: center;
	height: 64rpx;
	padding: 0 12rpx;
	border-top-left-radius: 32rpx;
	border-bottom-left-radius: 32rpx;
	border: 1rpx solid $uni-color-primary;
	border-right: none;
	background: #fff;
	z-index: 99;
	text {
		margin-left: 8rpx;
		font-size: 12px;
		color: $uni-color-primary;
	}
}
</style>
