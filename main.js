import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
