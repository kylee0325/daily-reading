<template>
	<u-popup :value="value" mode="bottom" height="600rpx" @open="$emit('input', true)" @close="$emit('input', false)">
		<view class="u-picker-header" @touchmove.stop.prevent="">
			<view class="u-btn-picker u-btn-picker--tips" :style="{ color: cancelColor }" hover-class="u-opacity" :hover-stay-time="150" @tap="cancel">{{ cancelText }}</view>
			<view class="u-picker__title">{{ title }}</view>
			<view
				class="u-btn-picker u-btn-picker--primary"
				:style="{ color: moving ? cancelColor : confirmColor }"
				hover-class="u-opacity"
				:hover-stay-time="150"
				@touchmove.stop=""
				@tap.stop="confirm"
			>
				{{ confirmText }}
			</view>
		</view>
		<scroll-view scroll-y="true" style="height: 420rpx; padding: 0 40rpx;">
			<view class="checkbox-wrap">
				<view v-for="(item, index) in dataSource" :key="index" class="checkbox-item">
					<u-checkbox v-model="item.checked" :name="item.name">{{ item.name }}</u-checkbox>
				</view>
			</view>
		</scroll-view>
		<view class="select-btn">
			<u-button @click="checkedAll" throttle-time="100" size="mini">全选</u-button>
			<u-button @click="unCheckedAll" throttle-time="100" size="mini">全不选</u-button>
		</view>
	</u-popup>
</template>

<script>
export default {
	name: 'multiple-select',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		list: {
			type: Array,
			default: () => []
		},
		selectedList: {
			type: Array,
			default: () => []
		},
		// 顶部标题
		title: {
			type: String,
			default: ''
		},
		// 取消按钮的文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 确认按钮的文字
		confirmText: {
			type: String,
			default: '确认'
		},
		// "取消"按钮的颜色
		cancelColor: {
			type: String,
			default: '#606266'
		},
		// "确定"按钮的颜色
		confirmColor: {
			type: String,
			default: '#2979ff'
		}
	},
	watch: {
		list: {
			handler: 'getFinalDataSource',
			immediate: true
		},
		selectedList: {
			handler: 'getFinalDataSource',
			immediate: true
		},
		value(newV) {
			if (newV) {
				this.getFinalDataSource();
			}
		}
	},
	data() {
		return {
			dataSource: []
		};
	},
	methods: {
		getFinalDataSource() {
			let arr = [];
			if (this.list && this.list.length > 0) {
				arr = this.list.map(item => ({
					name: item,
					checked: this.selectedList.includes(item)
				}));
			}
			this.dataSource = arr;
		},
		// 全选
		checkedAll() {
			this.dataSource.map(val => {
				val.checked = true;
			});
		},
		// 全不选
		unCheckedAll() {
			this.dataSource.map(val => {
				val.checked = false;
			});
		},
		cancel() {
			this.$emit('input', false);
		},
		confirm() {
			const arr = this.dataSource.filter(item => item.checked).map(item => item.name);
			this.$emit('change', arr);
			this.$emit('input', false);
		}
	}
};
</script>

<style lang="scss" scoped>
.u-picker-header,
.select-btn {
	width: 100%;
	height: 90rpx;
	padding: 0 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	font-size: 30rpx;
	background: #fff;
	position: relative;
}

.u-picker-header::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

.select-btn::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	top: 0;
	right: 0;
	left: 0;
}

.u-picker__title {
	color: $u-content-color;
}

.u-btn-picker {
	padding: 16rpx;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
}

.u-opacity {
	opacity: 0.5;
}

.u-btn-picker--primary {
	color: $u-type-primary;
}

.u-btn-picker--tips {
	color: $u-tips-color;
}

.checkbox-wrap {
	display: flex;
	flex-wrap: wrap;
}

.checkbox-item {
	width: 50%;
	display: flex;
	justify-content: flex-start;
}
</style>
