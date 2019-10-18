<template>
    <layout>
        <layout-header>
            <layout-header-logo></layout-header-logo>
            <layout-header-menu
                v-if="menuDate.length > 0 && !isHiddenBreadcrumb"
                :data="menuDate"
                :is-new-msg="isSocketNewMsg"
                @push="handleRouterPush">
            </layout-header-menu>
            <layout-header-search
                v-if="!isHiddenBreadcrumb"
                @search="handleSearch">
            </layout-header-search>
            <layout-header-user :is-write="isHiddenBreadcrumb"></layout-header-user>
        </layout-header>
        <layout-content>
            <keep-alive include="Home">
                <router-view></router-view>
            </keep-alive>
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
            isSocketNewMsg: false
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
        // socket消息处理
        pushMsg(msg) {
            const { type, data } = msg;
            if (type === 'newMsg') {
                const { toUserId, msgCount } = data;
                if (this.currentUserId === toUserId) {
                    if (msgCount > 0) {
                        this.isSocketNewMsg = true;
                    } else {
                        this.isSocketNewMsg = false;
                    }
                }
            }
        }
    }
};
</script>
