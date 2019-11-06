<template>
    <layout>
        <layout-header>
            <layout-header-logo></layout-header-logo>
            <layout-header-menu
                v-if="menuDate.length > 0"
                :data="menuDate"
                :is-active="activePath"
                :socket-post="socketPost"
                @push="handleRouterPush">
            </layout-header-menu>
            <layout-header-search
                @search="handleSearch">
            </layout-header-search>
            <layout-header-user
                :is-write="isHiddenBreadcrumb"
                :is-active="activePath"
                :current-user-id="currentUserId"
                :newMsg="socketMsg">
        </layout-header-user>
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
import { mapState, mapMutations, mapGetters } from 'vuex';
import { HIDDEN_BREADCRUMB } from '@/store/mutation-types';
import Layout from './src/LayoutMain';
import LayoutHeader from './src/LayoutHeader';
import LayoutHeaderLogo from './src/LayoutHeaderLogo';
import LayoutHeaderMenu from './src/LayoutHeaderMenu';
import LayoutHeaderSearch from './src/LayoutHeaderSearch';
import LayoutHeaderUser from './src/LayoutHeaderUser';
import LayoutContent from './src/LayoutContent';
import Login from '@/components/page/login';
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
                {
                    id: 4,
                    name: 'tag',
                    title: '话题',
                    url: '/tag'
                },
                {
                    id: 2,
                    name: 'topic',
                    title: '专题',
                    url: '/topic'
                }
                // {
                //     id: 3,
                //     name: 'follow',
                //     title: '关注',
                //     url: '/follow'
                // }
            ]
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
        }
    },
    computed: {
        ...mapState({
            isHiddenBreadcrumb: state => state.isHiddenBreadcrumb,
            socketMsg: state => state.socketMsg,
            socketPost: state => state.socketPost
        }),
        ...mapGetters({
            isLogin: 'isLogin',
            currentUserId: 'currentUserId'
        }),
        menuDate() {
            // return this.isLogin ? this.baseMenuDate : [];
            return this.baseMenuDate;
        },
        activePath() {
            return this.$route.path.split('/')[1];
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
        }
    }
};
</script>
