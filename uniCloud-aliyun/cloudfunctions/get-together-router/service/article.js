const {
	Service
} = require('uni-cloud-router')
const db = uniCloud.database()
const $ = db.command.aggregate

module.exports = class ArticleService extends Service {
	async getArticles(params = {}) {
		const {
			pageSize = 10, pageNo = 1, ...rest
		} = params;
		const res = await db.collection('ink-articles').aggregate()
			.match({
				...rest
			})
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
}
