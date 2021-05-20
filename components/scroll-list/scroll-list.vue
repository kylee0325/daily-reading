<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" :topbar="true" top="44px">
		<article-list :list="dataList" v-on:detail="handleDetail" v-on:edit="handleUpdate" v-on:delete="handleDelete" :type="type" v-on:publish="handlePublish"></article-list>
	</mescroll-uni>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getArticles, getDeletedArticles, deleteArticleById, realDeleteArticleById, rePublishArticleById } from '@/api';

export default {
	name: 'scroll-list',
	mixins: [MescrollMixin],
	props: {
		type: {
			type: String, // 回收站 recycle
			default: ''
		},
		params: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			mescroll: null,
			downOption: {},
			upOption: {
				use: true,
				isLock: false,
				auto: false,
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				textNoMore: '-- 已经到底了 --',
				empty: {
					tip: '暂无相关数据'
				}
			},
			// 列表数据
			dataList: []
		};
	},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		/*下拉刷新的回调, 有3种处理方式:*/
		downCallback() {
			this.mescroll.resetUpScroll(true);
		},
		/*上拉加载的回调*/
		async upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;

			const finalParams = {
				pageNo: pageNum,
				pageSize: pageSize,
				...this.params
			};

			const [err, res] = await (this.type === 'recycle' ? getDeletedArticles(finalParams) : getArticles(finalParams));
			if (err) {
				this.mescroll.endErr();
				return;
			}

			let curPageData = res.data.rows || [];
			let curPageLen = curPageData.length;
			let hasNext = curPageLen >= 10;

			if (pageNum == 1) this.dataList = [];
			this.dataList = this.dataList.concat(curPageData);
			this.mescroll.endSuccess(curPageLen, hasNext);
		},
		handleDetail(item) {
			uni.navigateTo({
				url: '/pages/webview/webview?url=' + item.article_url
			});
		},
		handleUpdate(item) {
			let _this = this;
			uni.navigateTo({
				url: '/pages/articles/edit?id=' + item._id,
				events: {
					refreshData: () => {
						_this.downCallback();
					}
				}
			});
		},
		handleDelete(item) {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确定删除该文章吗？',
				success: function(res) {
					if (res.confirm) {
						_this.deleteArticle(item._id);
					}
				}
			});
		},
		handlePublish(item) {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确定重新发布该文章吗？',
				success: function(res) {
					if (res.confirm) {
						_this.publishArticle(item._id);
					}
				}
			});
		},
		async deleteArticle(id) {
			uni.showLoading({
				mask: true
			});
			const [err, res] = await (this.type === 'recycle' ? realDeleteArticleById(id) : deleteArticleById(id));
			uni.hideLoading();
			if (err) {
				console.log(err);
				return;
			}
			this.downCallback();
		},
		async publishArticle(id) {
			uni.showLoading({
				mask: true
			});
			const [err, res] = await rePublishArticleById(id);
			uni.hideLoading();
			if (err) {
				console.log(err);
				return;
			}
			this.downCallback();
		}
	}
};
</script>

<style lang="scss"></style>
