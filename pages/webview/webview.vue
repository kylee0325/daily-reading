<template>
	<view><web-view :webview-styles="webviewStyles" :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			url: '',
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		};
	},
	onLoad(e) {
		this.url = e.url;
	}
};
</script>

<style></style>
