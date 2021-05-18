const {
	Service
} = require('uni-cloud-router')
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

module.exports = class ArticleService extends Service {
	async getArticles(params = {}) {
		const {
			pageSize = 10, pageNo = 1, keyword = '', ...rest
		} = params;
		const reg = new RegExp(keyword.trim(), 'gi')
		let command = dbCmd.and({
			is_delete: dbCmd.neq(1),
			...rest
		}, dbCmd.or([{
			title: reg
		}, {
			description: reg
		}, {
			keywords: reg
		}]))
		const res = await db.collection('ink-articles').aggregate()
			.match(command)
			.lookup({
				from: 'uni-id-users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'user',
			})
			.replaceRoot({
				newRoot: $.mergeObjects([$.arrayElemAt(['$user', 0]), '$$ROOT'])
			})
			.project({
				user: 0,
				last_login_date: 0,
				last_login_ip: 0,
				register_ip: 0,
				role: 0,
				token: 0,
				wx_openid: 0,
				register_date: 0
			})
			.sort({
				last_modify_date: -1
			})
			.skip((pageNo - 1) * pageSize)
			.limit(pageSize)
			.end()

		return {
			data: {
				rows: res.data,
				pageSize,
				pageNo
			}
		}
	}

	async getArticleById(id) {
		const res = await db.collection('ink-articles')
			.doc(id)
			.field({
				user_id: true,
				keywords: true,
				title: true,
				description: true,
				article_url: true,
				article_status: true,
				view_count: true,
				like_count: true,
				publish_date: true,
				last_modify_date: true,
				mode: true
			})
			.get()

		return {
			data: res.data
		}
	}

	async addArticle(params = {}) {
		const res = await db.collection('ink-articles')
			.add({
				...params,
				publish_date: Date.now(),
				last_modify_date: Date.now()
			})

		return {
			data: res
		}
	}

	async updateArticleById(params = {}) {
		const {
			id,
			_id,
			...rest
		} = params;

		const res = await db.collection('ink-articles')
			.doc(id)
			.update({
				...rest,
				last_modify_date: Date.now()
			})

		return {
			data: res
		}
	}

	async deleteArticleById(id) {
		const res = await db.collection('ink-articles')
			.doc(id)
			.update({
				is_delete: 1
			})

		return {
			data: res
		}
	}

	async rePublishArticleById(id) {
		const res = await db.collection('ink-articles')
			.doc(id)
			.update({
				publish_date: Date.now(),
				last_modify_date: Date.now(),
				is_delete: 0
			})

		return {
			data: res
		}
	}

	async realDeleteArticleById(id) {
		const res = await db.collection('ink-articles')
			.doc(id)
			.remove()

		return {
			data: res
		}
	}
}
