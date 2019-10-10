<template>
    <layout>
        <layout-header>
            <layout-header-logo></layout-header-logo>
            <layout-header-menu
                v-if="menuDate.length > 0 && !isHiddenBreadcrumb"
                :data="menuDate"
                :msg-count="socketMsgCount"
                @push="handleRouterPush">
            </layout-header-menu>
            <layout-header-search
                v-if="!isHiddenBreadcrumb"
                @search="handleSearch">
            </layout-header-search>
            <layout-header-user :is-write="isHiddenBreadcrumb"></layout-header-user>
        </layout-header>
        <layout-content>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </layout-content>
        <login></login>
        <el-backtop></el-backtop>
    </layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HIDDEN_BREADCRUMB } from '@/store/mutation-types';
import Layout from './src/LayoutMain';
import LayoutHeader from './src/LayoutHeader';
import LayoutHeaderLogo from './src/LayoutHeaderLogo';
import LayoutHeaderMenu from './src/LayoutHeaderMenu';
import LayoutHeaderSearch from './src/LayoutHeaderSearch';
import LayoutHeaderUser from './src/LayoutHeaderUser';
import LayoutContent from './src/LayoutContent';
import Login from '@/components/page/Login';
import api from '@/utils/api';
export default {
    name: 'LayoutContainer',
    components: {
        Layout,
        LayoutHeader,
        LayoutHeaderLogo,
        LayoutHeaderMenu,
        LayoutHeaderSearch,
        LayoutHeaderUser,
        LayoutContent,
        Login
    },
    data() {
        return {
            baseMenuDate: [
                {
                    id: 1,
                    name: 'find',
                    title: '发现',
                    url: '/'
                },
                // {
                //     id: 3,
                //     name: 'follow',
                //     title: '关注',
                //     url: '/'
                // },
                {
                    id: 2,
                    name: 'msg',
                    title: '消息',
                    url: '/msg'
                }
            ],
            socketMsgCount: 0
        };
    },
    watch: {
        $route: {
            handler(to, from) {
                // 创建文章、专题时，隐藏面包屑
                if (to.path.split('/')[1] === 'write') {
                    this.hiddenBreadcrumb(true);
                } else {
                    this.hiddenBreadcrumb(false);
                }
            },
            immediate: true
        },
        socketMsg: {
            handler(n, o) {
                this.pushMsg(n);
            },
            immediate: true
        }
    },
    computed: {
        ...mapState({
            isHiddenBreadcrumb: state => state.isHiddenBreadcrumb,
            socketMsg: state => state.socketMsg
        }),
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        },
        menuDate() {
            return this.isLogin ? this.baseMenuDate : [];
        },
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    methods: {
        ...mapMutations({
            hiddenBreadcrumb: HIDDEN_BREADCRUMB
        }),
        handleSearch(keyword) {
            if (keyword.length > 0) {
                const path = {
                    path: `/search`,
                    query: {
                        keyword
                    }
                };
                this.handleRouterPush(path);
            }
        },
        handleRouterPush(path) {
            this.$router.push(path).catch(() => {});
        },
        // 请求消息
        pushMsg(msg) {
            const { type, data } = msg;
            if (type === 'newMsg') {
                const { toUserId } = data;
                if (this.currentUserId === toUserId) {
                    api.getNewMessage({ toUserId }).then((res) => {
                        this.socketMsgCount = res.data;
                    }).catch(() => {});
                }
            }
        }
    }
};
</script>
