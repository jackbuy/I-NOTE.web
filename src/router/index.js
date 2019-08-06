import Vue from 'vue';
import Router from 'vue-router';
const Page404 = () => import('@/components/common/Page404');
const Layout = () => import('@/components/common/layout/Layout');
const Home = () => import('@/components/page/home');
const Msg = () => import('@/components/page/msg');
const Search = () => import('@/components/page/search');
const Detail = () => import('@/components/page/detail');
const Write = () => import('@/components/page/write');
const Tag = () => import('@/components/page/tag');
const Article = () => import('@/components/page/article');
const Zone = () => import('@/components/page/zone');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/find/newest'
                },
                {
                    path: '/find/:sortType',
                    name: 'find',
                    component: Home,
                    meta: { title: '发现' }
                },
                {
                    path: '/detail/:articleId',
                    name: 'detail',
                    component: Detail,
                    meta: { title: '详情' }
                },
                {
                    path: '/search/:keyword',
                    name: 'search',
                    component: Search,
                    meta: { title: '搜索' }
                },
                {
                    path: '/write',
                    name: 'articleAdd',
                    component: Write,
                    meta: { title: '文章-新增', requireAuth: true }
                },
                {
                    path: '/write/:articleId',
                    name: 'articleEdit',
                    component: Write,
                    meta: { title: '文章-编辑', requireAuth: true }
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: Tag,
                    meta: { title: '标签-管理' }
                },
                {
                    path: '/tag/:tagName',
                    name: 'article',
                    component: Article,
                    meta: { title: '标签-文章' }
                },
                {
                    path: '/msg',
                    name: 'msg',
                    component: Msg,
                    meta: { title: '消息', requireAuth: true }
                },
                {
                    path: '/zone/:userId/:articleType',
                    name: 'zone',
                    component: Zone,
                    meta: { title: '空间' }
                }
            ]
        },
        // 路由重定向404
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/404',
            name: 'Page404',
            component: Page404,
            meta: { title: '404' }
        }
    ]
});
