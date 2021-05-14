export async function request(action, data, name = 'get-together-router') {
	return new Promise((resolve) => {
		uniCloud
			.callFunction({
				name,
				data: {
					action,
					data
				}
			})
			.then(({
				result
			}) => {
				if (result.code > 10000) {
					uni.showModal({
						title: result.message || '请求失败,请重新登录',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					});
					resolve([result, null]);
				} else if (result.code) {
					uni.showToast({
						title: result.message || '请求服务失败'
					});
					resolve([result, null]);
				} else {
					resolve([null, result]);
				}
			})
			.catch(err => {
				uni.showToast({
					title: err.message || '请求服务失败'
				});
				resolve([err, null]);
			});
	})
}
