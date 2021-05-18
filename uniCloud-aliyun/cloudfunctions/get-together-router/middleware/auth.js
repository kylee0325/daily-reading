const uniID = require('uni-id')
module.exports = (options) => {
	if (options) {
		uniID.init(options)
	}
	return async function auth(ctx, next) {
		const whiteList = ['article/getArticles']
		if (!whiteList.includes(ctx.event.action)) {
			const auth = await uniID.checkToken(ctx.event.uniIdToken)
			if (auth.code) {
				throw {
					code: auth.code,
					message: auth.message
				};
			}
			ctx.auth = auth
			ctx.event.userInfo = auth.userInfo
		}
		await next()
		ctx.body = {
			code: 0,
			message: '操作成功',
			...ctx.body
		}
	}
}
