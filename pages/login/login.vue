<template>
	<page-container title="登录" :is-full-page="true">
		<view class="title">欢迎登录</view>
		<view class="loginType">
			<view class="loginItem">
				<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
				微信
				<button class="submitBtn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
			</view>
		</view>
		<view class="hint">
			登录代表同意
			<text class="link">用户协议、隐私政策</text>
		</view>
	</page-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {};
	},
	methods: {
		...mapMutations(['login']),
		oauth() {
			return new Promise((resolve, reject) => {
				uni.login({
					provider: 'weixin',
					success(res) {
						resolve(res.code);
					},
					fail(err) {
						console.error('授权登录失败：' + JSON.stringify(err));
						reject(new Error('微信登录失败'));
					}
				});
			});
		},
		getUserInfo({ detail }) {
			if (detail.userInfo) {
				this.loginByWeixin(detail.userInfo);
			} else {
				uni.showToast({
					icon: 'none',
					title: '获取个人信息失败'
				});
			}
		},
		loginByWeixin(value) {
			this.oauth()
				.then(code => {
					return uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'loginByWeixin',
							params: {
								code,
								...value
							}
						}
					});
				})
				.then(res => {
					console.log(res);
					if (res.result.code === 0) {
						uni.setStorageSync('uni_id_token', res.result.token);
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired);
						this.login(res.result.userInfo);
						uni.navigateBack();
					}
				})
				.catch(e => {
					console.error(e);
					uni.showModal({
						showCancel: false,
						content: '微信登录失败，请稍后再试'
					});
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	padding: 30rpx 60rpx;
	text-align: left;
	font-size: 60rpx;
	font-weight: 500;
}
.loginType {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;

	.loginItem {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: $u-content-color;
		font-size: 28rpx;
		.submitBtn {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			opacity: 0;
			z-index: 99;
		}
	}
}

.hint {
	padding: 20rpx 40rpx 50rpx;
	font-size: 28rpx;
	text-align: center;
	color: $u-tips-color;

	.link {
		color: $u-type-warning;
	}
}
</style>
