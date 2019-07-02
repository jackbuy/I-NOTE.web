// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import Store from './store';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 滚动条
 * vuescroll(包含slide 和 native两种模式)，这里是全局全部引用
 */
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// import VueSocketio from 'vue-socket.io';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(Vuex);
Vue.use(vuescroll, {
    ops: {
        vuescroll: {},
        scrollPanel: {
            scrollingX: false
        },
        rail: {},
        bar: {
            background: 'rgba(0,0,0,.2)'
            // keepShow: true
        }
    }
});
Vue.use(VueQuillEditor, {/* { default global options } */});

// vuex
const store = new Vuex.Store(Store);

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//     NProgress.start();
//     if (to.meta.requireAuth) {
//         // 判断该路由是否需要登录权限
//         let token = localStorage.getItem('token');
//         if (token) { // 通过vuex state获取当前的token是否存在
//             next();
//         } else {
//             next({ path: '/login' });
//         }
//     } else {
//         next();
//     }
// });

// socket
// Vue.use(new VueSocketio({
//     debug: false,
//     connection: 'http://localhost:3000',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     }
//     // options: { query: {token: localStorage.getItem('token')} } // Optional options
// }));

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
        localStorage.clear();
        next();
    }
    let userData = localStorage.getItem('token');
    if ((!userData && to.path !== '/login')) {
        next({ path: '/login' });
        NProgress.done();
    } else {
        next();
    }
});

router.afterEach(transition => {
    NProgress.done();
});

window.vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
