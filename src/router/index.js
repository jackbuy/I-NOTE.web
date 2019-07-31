import Vue from 'vue';
import Router from 'vue-router';
const Page404 = () => import('@/components/common/Page404');
const Layout = () => import('@/components/common/layout/Layout');
const Article = () => import('@/components/page/article');
const Msg = () => import('@/components/page/msg');
const Search = () => import('@/components/page/search/Search');
const ArticleDetail = () => import('@/components/page/articleDetail');
const articleAddEdit = () => import('@/components/page/articleAddEdit');
const Tag = () => import('@/components/page/tag/Tag');
const Zone = () => import('@/components/page/zone');
const Test = () => import('@/components/common/ckEditor');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/article/all'
                },
                {
                    path: '/article/:tagName',
                    name: 'article',
                    component: Article,
                    meta: {title: '发现'}
                },
                {
                    path: '/test',
                    name: 'test',
                    component: Test,
                    meta: {title: '测试'}
                },
                {
                    path: '/detail/:articleId',
                    name: 'detail',
                    component: ArticleDetail,
                    meta: {title: '发现-详情'}
                },
                {
                    path: '/search/:keyword',
                    name: 'search',
                    component: Search,
                    meta: {title: '搜索'}
                },
                {
                    path: '/write',
                    name: 'articleAdd',
                    component: articleAddEdit,
                    meta: {title: '文章-新增', requireAuth: true}
                },
                {
                    path: '/write/:articleId',
                    name: 'articleEdit',
                    component: articleAddEdit,
                    meta: {title: '文章-编辑', requireAuth: true}
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: Tag,
                    meta: {title: '标签-全部', requireAuth: true}
                },
                {
                    path: '/msg',
                    name: 'msg',
                    component: Msg,
                    meta: {title: '消息', requireAuth: true}
                },
                {
                    path: '/zone/:userId/:articleType',
                    name: 'zone',
                    component: Zone,
                    meta: {title: '我的主页', requireAuth: true}
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
            meta: {title: '404'}
        }
    ]
});
