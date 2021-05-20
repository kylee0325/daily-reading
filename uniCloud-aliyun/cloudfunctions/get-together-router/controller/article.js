const {
	Controller
} = require('uni-cloud-router')
module.exports = class ArticleController extends Controller {
	async getArticles({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.getArticles(data)
	}

	async getArticleById({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.getArticleById(data)
	}

	async updateArticleById({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.updateArticleById(data)
	}

	async addArticle({
		event,
		context
	}) {
		const {
			data,
			userInfo
		} = event;
		return this.service.article.addArticle({
			...data,
			user_id: userInfo._id
		})
	}

	async deleteArticleById({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.deleteArticleById(data)
	}

	async getDeletedArticles({
		event,
		context
	}) {
		const {
			data,
			userInfo
		} = event;
		return this.service.article.getDeletedArticles({
			...data,
			user_id: userInfo._id
		})
	}

	async realDeleteArticleById({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.realDeleteArticleById(data)
	}

	async rePublishArticleById({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.rePublishArticleById(data)
	}

	async getKeywords({
		event,
		context
	}) {
		const {
			data
		} = event;
		return this.service.article.getKeywords(data)
	}
}
