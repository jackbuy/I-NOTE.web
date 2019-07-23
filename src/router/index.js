import Vue from 'vue';
import Router from 'vue-router';
const Page404 = () => import('@/components/common/Page404');
const Layout = () => import('@/components/common/layout/Layout');
const Home = () => import('@/components/page/home/Home');
const Msg = () => import('@/components/page/msg/Msg');
const Search = () => import('@/components/page/search/Search');
const ArticleDetail = () => import('@/components/page/articleDetail/ArticleDetail');
const Article = () => import('@/components/page/article/Article');
const ArticleAdd = () => import('@/components/page/articleAdd');
const Tag = () => import('@/components/page/tag/Tag');
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
                    redirect: '/home'
                },
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                    meta: {title: '发现'}
                },
                {
                    path: '/detail/:articleId',
                    name: 'detail',
                    component: ArticleDetail,
                    meta: {title: '文章-详情'}
                },
                {
                    path: '/article/add',
                    name: 'articleAdd',
                    component: ArticleAdd,
                    meta: {title: '文章-新增'}
                },
                {
                    path: '/tag/:tagId',
                    name: 'article',
                    component: Article,
                    meta: {title: '文章'}
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: Tag,
                    meta: {title: '标签-全部'}
                },
                {
                    path: '/msg',
                    name: 'msg',
                    component: Msg,
                    meta: {title: '消息'}
                },
                {
                    path: '/search/:keyword',
                    name: 'search',
                    component: Search,
                    meta: {title: '搜索'}
                },
                {
                    path: '/zone/:userId',
                    name: 'zone',
                    component: Zone,
                    meta: {title: '空间'}
                },
                {
                    path: '/zone',
                    name: 'zone',
                    component: Zone,
                    meta: {title: '空间'}
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
