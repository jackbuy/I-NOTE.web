import Vue from 'vue';
import router from './router';
import store from './store';
import './directive';
import App from './App';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(ElementUI);
Vue.use(VueQuillEditor, {/* { default global options } */});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        let token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next({ path: '/article/all' });
        }
    } else {
        next();
    }
});

router.afterEach(transition => {
    window.scrollTo(0, 0);
    NProgress.done();
});

window.vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
