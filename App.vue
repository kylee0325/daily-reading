<script>
import { mapMutations } from 'vuex';

export default {
	onLaunch: function() {
		console.log('App Launch');
		// let uniIdToken = uni.getStorageSync('uni_id_token');
		// if (uniIdToken) {
		// 	this.login(uni.getStorageSync('username'));
		// }
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapMutations(['login'])
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
// page {
// 	background-color: #f5f7fa;
// }
</style>
