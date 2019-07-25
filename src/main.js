import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import './directive';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import Store from './store';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueQuillEditor, {/* { default global options } */});

// vuex
const store = new Vuex.Store(Store);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
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
