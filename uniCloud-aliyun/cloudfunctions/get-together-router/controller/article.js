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
}
