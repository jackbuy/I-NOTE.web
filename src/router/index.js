import Vue from 'vue';
import Router from 'vue-router';
const Page404 = () => import('@/components/common/Page404');
const Layout = () => import('@/components/common/layout/Layout');
const Home = () => import('@/components/page/home/Home');
const Msg = () => import('@/components/page/msg');
const Search = () => import('@/components/page/search');
const ArticleDetail = () => import('@/components/page/articleDetail');
const Article = () => import('@/components/page/article/Article');
const Tag = () => import('@/components/page/tag/Tag');

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
                    meta: {title: '发现', keepAlive: true}
                },
                {
                    path: '/detail/:articleId',
                    name: 'detail',
                    component: ArticleDetail,
                    meta: {title: '文章-详情'}
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
