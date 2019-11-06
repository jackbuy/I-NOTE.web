import Vue from 'vue';
import Router from 'vue-router';
const Page404 = () => import('@/components/common/page404');
const Page403 = () => import('@/components/common/page403');
const Layout = () => import('@/components/common/layout');
const Home = () => import('@/components/page/home');
const Msg = () => import('@/components/page/msg');
const Search = () => import('@/components/page/search');
const Detail = () => import('@/components/page/detail');
const Write = () => import('@/components/page/write');
const Tag = () => import('@/components/page/tag');
const TagArticle = () => import('@/components/page/tagArticle');
const Topic = () => import('@/components/page/topic');
const TopicArticle = () => import('@/components/page/topicArticle');
const TopicWrite = () => import('@/components/page/topicWrite');
const Draft = () => import('@/components/page/draft');
const Zone = () => import('@/components/page/zone');
const Settings = () => import('@/components/page/settings');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/find'
                },
                {
                    path: '/find',
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
                    path: '/search',
                    name: 'search',
                    component: Search,
                    meta: { title: '搜索' }
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: Tag,
                    meta: { title: '话题' }
                },
                {
                    path: '/tag/:tagId',
                    name: 'tagArticle',
                    component: TagArticle,
                    meta: { title: '话题' }
                },
                {
                    path: '/topic',
                    name: 'topic',
                    component: Topic,
                    meta: { title: '专题' }
                },
                {
                    path: '/topic/:topicId',
                    name: 'topicArticle',
                    component: TopicArticle,
                    meta: { title: '专题' }
                },
                {
                    path: '/topicWrite',
                    name: 'topicAdd',
                    component: TopicWrite,
                    meta: { title: '创建专题', requireAuth: true }
                },
                {
                    path: '/topicWrite/:topicId',
                    name: 'topicEdit',
                    component: TopicWrite,
                    meta: { title: '编辑专题', requireAuth: true }
                },
                {
                    path: '/write',
                    name: 'articleAdd',
                    component: Write,
                    meta: { title: '写文章', requireAuth: true }
                },
                {
                    path: '/write/:articleId',
                    name: 'articleEdit',
                    component: Write,
                    meta: { title: '写文章', requireAuth: true }
                },
                {
                    path: '/follow',
                    name: 'follow',
                    component: Draft,
                    meta: { title: '关注', requireAuth: true }
                },
                {
                    path: '/msg',
                    name: 'msg',
                    component: Msg,
                    meta: { title: '消息', requireAuth: true }
                },
                {
                    path: '/zone/:userId/:zoneType',
                    name: 'zone',
                    component: Zone,
                    meta: { title: '空间' }
                },
                {
                    path: '/Settings',
                    name: 'settings',
                    component: Settings,
                    meta: { title: '设置', requireAuth: true }
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
        },
        {
            path: '/403',
            name: 'Page403',
            component: Page403,
            meta: { title: '403' }
        }
    ]
});
