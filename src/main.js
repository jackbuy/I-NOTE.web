import Vue from 'vue';
import NProgress from 'nprogress';
import VueQuillEditor from 'vue-quill-editor';
import VueSocketio from 'vue-socket.io';
import router from './router';
import store from './store';
import App from './App';
import './directive';
import VueClipboard from 'vue-clipboard2';
import { apiBaseUrl } from '@/constants/url-config';

import {
    Button,
    Popover,
    Form,
    FormItem,
    Input,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Dialog,
    Backtop,
    Avatar,
    Icon,
    Upload,
    Cascader,
    MessageBox,
    Message,
    Loading,
    Carousel,
    CarouselItem
} from 'element-ui';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Backtop);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Cascader);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Loading.directive);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(VueClipboard);

Vue.use(VueQuillEditor, {/* { default global options } */});

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
            token: store.state.token
        }
    }
}));

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        if (store.getters.isLogin) {
            next();
        } else {
            window.location.href = '/';
            // next({ path: '/403' });
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    NProgress.done();
    if (from.name === 'find') {
        let homeOffsetY = document.documentElement.scrollTop || document.body.scrollTop;
        store.commit('SET_HOME_OFFSET_Y', homeOffsetY);
    }
    if (to.name !== 'find') window.scrollTo(0, 0);
});

window.vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
