import {
	request
} from '@/common/request.js'

export function getArticles(params) {
	return request('article/getArticles', params)
}
