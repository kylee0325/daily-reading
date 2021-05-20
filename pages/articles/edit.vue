<template>
	<page-container :title="id ? '编辑文章' : '新增文章'">
		<spin :loading="loading">
			<view class="main">
				<u-form :model="form" ref="uForm" label-width="160rpx" label-align="right" :label-style="{ marginRight: '24rpx' }">
					<u-form-item label="标题" prop="title"><u-input v-model="form.title" /></u-form-item>
					<u-form-item label="简介"><u-input v-model="form.description" /></u-form-item>
					<u-form-item label="关键词">
						<u-input v-model="form.keywords" type="select" @click="show = true" />
						<multiple-select v-model="show" :list="keywordList" :selected-list="form.keywords.split(',')" @change="handleKeywordChange"></multiple-select>
					</u-form-item>
					<u-form-item label="链接地址" prop="article_url">
						<view style="display: flex;align-items: center;">
							<u-input v-model="form.article_url" style="flex: 1;" />
							<u-button type="primary" size="mini" @click="scanCode" style="margin-right: 24rpx;margin-left: 24rpx;">扫码</u-button>
						</view>
					</u-form-item>
					<u-form-item label="文章状态">
						<u-radio-group v-model="form.article_status">
							<u-radio v-for="(item, index) in articleStatusList" :key="item.value" :name="item.value" :disabled="item.disabled">{{ item.text }}</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
				<view style="padding: 50rpx 0;"><u-button type="primary" @click="submit">提交</u-button></view>
			</view>
		</spin>
	</page-container>
</template>

<script>
import { getArticleById, addArticle, updateArticleById, getKeywords } from '@/api';

let _this;
export default {
	data() {
		return {
			loading: false,
			id: '',
			form: {
				title: '',
				description: '',
				keywords: '',
				article_url: '',
				article_status: 0
			},
			articleStatusList: [
				{
					value: 0,
					text: '公有'
				},
				{
					value: 1,
					text: '私有'
				}
			],
			rules: {
				title: [
					{
						required: true,
						message: '请输入标题',
						trigger: ['blur', 'change']
					}
				],
				article_url: [
					{
						required: true,
						message: '请输入链接地址',
						trigger: ['blur', 'change']
					},
					{
						type: 'url',
						message: '请输入正确的链接地址',
						trigger: ['blur', 'change']
					}
				]
			},
			show: false,
			keywordList: ['HTML', 'css', 'js', 'vue', 'react', '1fs', '3asd', 'abc', 'ddff', 'dcccx', 'zsdf', 'sd']
		};
	},
	onLoad(e) {
		_this = this;
		this.id = e.id;
		this.getKeywords();
		if (e.id) {
			this.getDetail();
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		handleKeywordChange(val) {
			this.form.keywords = val.join(',');
		},
		async getDetail() {
			this.loading = true;
			const [err, res] = await getArticleById(this.id);
			this.loading = false;
			if (err) {
				console.log(err);
				return;
			}
			this.form = res.data[0];
		},
		async getKeywords() {
			const [err, res] = await getKeywords();
			console.log('<-----res----->');
			console.log(res);
			if (err) {
				console.log(err);
				return;
			}
			this.keywordList = res.data;
		},
		async addArticle() {
			uni.showLoading({
				mask: true
			});
			const [err, res] = await addArticle(this.form);
			uni.hideLoading();
			if (err) {
				console.log(err);
				return;
			}
			uni.showToast({
				icon: 'none',
				title: '新增成功'
			});
			this.getOpenerEventChannel().emit('refreshData');
			setTimeout(() => uni.navigateBack(), 500);
		},
		async updateArticle() {
			uni.showLoading({
				mask: true
			});
			const [err, res] = await updateArticleById({
				...this.form,
				id: this.id
			});
			uni.hideLoading();
			if (err) {
				console.log(err);
				return;
			}
			uni.showToast({
				icon: 'none',
				title: '修改成功'
			});
			this.getOpenerEventChannel().emit('refreshData');
			setTimeout(() => uni.navigateBack(), 500);
		},
		scanCode() {
			uni.scanCode({
				success: function(res) {
					_this.form.article_url = res.result;
				}
			});
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					if (_this.id) {
						_this.updateArticle();
					} else {
						_this.addArticle();
					}
				} else {
					console.log('验证失败');
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 0 24rpx;
}
</style>
