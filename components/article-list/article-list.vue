<template>
	<view class="list-wrap">
		<u-card
			v-for="item in list"
			:key="item._id"
			:title="item.nickname"
			:sub-title="item.last_modify_date | parseDate"
			:thumb="item.avatar"
			@click="$emit('detail', item)"
			class="article-list"
			padding="20"
			:border-radius="8"
		>
			<template v-slot:body>
				<view class="">
					<view style="font-weight: 600;font-size: 16px;">{{ item.title }}</view>
					<view style="margin-top: 12rpx;">{{ item.description }}</view>
				</view>
			</template>
			<template v-slot:foot>
				<view class="footer-box">
					<view style="flex: 1;" v-if="item.keywords.length > 0">
						<u-tag v-for="keyword in item.keywords.split(',')" :key="keyword" :text="keyword" type="info" shape="circle" size="mini" style="margin-right: 8rpx"></u-tag>
					</view>
					<!-- <u-icon v-if="userInfo._id === item.user_id" name="edit-pen" size="28" @tap.stop="$emit('edit', item)"></u-icon> -->
					<view v-if="userInfo && userInfo._id === item.user_id">
						<u-icon v-if="type === 'recycle'" name="file-text" size="28" @tap.stop="$emit('publish', item)"></u-icon>
						<u-icon v-if="type !== 'recycle'" name="edit-pen" size="28" @tap.stop="$emit('edit', item)"></u-icon>
						<u-icon name="trash" size="28" style="margin-left: 12rpx;" @tap.stop="$emit('delete', item)"></u-icon>
					</view>
				</view>
			</template>
		</u-card>
	</view>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
	name: 'article-list',
	props: {
		type: {
			type: String, // 回收站 recycle
			default: ''
		},
		list: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {};
	},
	filters: {
		parseDate(d) {
			if (!d) {
				return '';
			}
			return moment(d).format('YYYY-MM-DD HH:mm');
		}
	},
	computed: mapState(['userInfo'])
};
</script>

<style lang="scss" scoped>
.list-wrap {
	background-color: #f5f7fa;
}

.article-list {
	.u-card {
		border-radius: 4px !important;
	}
}
.footer-box {
	display: flex;
	justify-content: flex-end;
}
</style>
