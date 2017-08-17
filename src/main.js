// 全局JavaScript
import Vue from 'vue'
import App from './App'
import router from './router/index'
import './javascript/flexible'
import './common/less/index.less'

// 全局实例
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
