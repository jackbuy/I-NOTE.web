import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';
import { apiBaseUrl } from '@/constants/url-config';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import VueQuillEditor from 'vue-quill-editor';
import VueSocketio from 'vue-socket.io';
import Highlight from './directive/highlight';

Vue.use(Highlight);
Vue.use(ElementUI, {size: 'small'});
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
            next({ path: '/403' });
        }
    } else {
        next();
    }
});

Vue.use(new VueSocketio({
    debug: false,
    connection: apiBaseUrl,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: { // Optional options
        query: {
            token: localStorage.getItem('token')
        }
    }
}));

router.afterEach(transition => {
    window.scrollTo(0, 0);
    NProgress.done();
});

window.vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
