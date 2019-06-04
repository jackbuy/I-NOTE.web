import Vue from 'vue';
import Router from 'vue-router';
const Page404 = () => import('@/common/components/Page404');
// const Layout = () => import('@/common/components/layout/Layout');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                // {
                //     path: '/home',
                //     name: 'Home',
                //     component: Home,
                //     meta: {title: '大厅', isUseCache: false, keepAlive: true}
                // },
                {
                    path: '/404',
                    name: 'Page404',
                    component: Page404,
                    meta: {title: '404'}
                },
                // {
                //     path: '/403',
                //     name: 'Page403',
                //     component: Page403,
                //     meta: {title: '403'}
                // }
            ]
        },
        // 路由重定向404
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
