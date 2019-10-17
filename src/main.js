import Vue from 'vue';
import NProgress from 'nprogress';
import VueQuillEditor from 'vue-quill-editor';
import VueSocketio from 'vue-socket.io';
import router from './router';
import store from './store';
import App from './App';
import Highlight from './directive/highlight';
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
    Message
} from 'element-ui';

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
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(Highlight);
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

router.afterEach(() => {
    window.scrollTo(0, 0);
    NProgress.done();
});

window.vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
