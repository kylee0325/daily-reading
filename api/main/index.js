import {
	request
} from '@/common/request.js'

export function getArticles(params) {
	return request('article/getArticles', params)
}

export function getArticleById(id) {
	return request('article/getArticleById', id)
}

export function addArticle(params) {
	return request('article/addArticle', params)
}

export function updateArticleById(params) {
	return request('article/updateArticleById', params)
}

export function deleteArticleById(id) {
	return request('article/deleteArticleById', id)
}

export function realDeleteArticleById(id) {
	return request('article/realDeleteArticleById', id)
}

export function rePublishArticleById(id) {
	return request('article/rePublishArticleById', id)
}

export function getDeletedArticles(params) {
	return request('article/getDeletedArticles', params)
}

export function getKeywords(params) {
	return request('article/getKeywords', params)
}
