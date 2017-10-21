// 全局JavaScript
import Vue from 'vue';
import App from './App';
import router from './router/index';
import fastclick from 'fastclick';

import './javascript/flexible';
import './common/less/index.less';

// 移动端300延迟
fastclick.attach(document.body);

// 全局实例
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
