<template>
    <layout>
        <layout-header>
            <layout-header-logo></layout-header-logo>
            <layout-header-menu
                v-if="menuDate.length > 0 && !isHiddenBreadcrumb"
                :data="menuDate"
                @push="handleRouterPush">
            </layout-header-menu>
            <layout-header-search
                v-if="!isHiddenBreadcrumb"
                @search="handleSearch">
            </layout-header-search>
            <layout-header-user :is-write="isHiddenBreadcrumb"></layout-header-user>
        </layout-header>
        <layout-content>
            <breadcrumb v-if="!isHiddenBreadcrumb"></breadcrumb>
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
import Breadcrumb from '@/components/common/breadcrumb';
import Login from '@/components/common/Login';
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
        Breadcrumb,
        Login
    },
    data() {
        return {
            baseMenuDate: [
                {
                    id: 1,
                    title: '发现',
                    url: '/'
                },
                // {
                //     id: 14,
                //     title: '专题',
                //     url: '/'
                // },
                {
                    id: 2,
                    title: '消息',
                    url: '/msg'
                }
            ]
        };
    },
    watch: {
        $route: {
            handler(to, from) {
                // 新增、编辑文章时，隐藏面包屑
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
            isHiddenBreadcrumb: state => state.isHiddenBreadcrumb
        }),
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        },
        menuDate() {
            return this.isLogin ? this.baseMenuDate : [];
        }
    },
    methods: {
        ...mapMutations({
            hiddenBreadcrumb: HIDDEN_BREADCRUMB
        }),
        handleSearch(keyword) {
            if (keyword.length > 0) {
                this.$router.push({
                    path: `/search/${keyword}`
                });
            }
        },
        handleRouterPush(url) {
            this.$router.push(url);
        }
    }
};
</script>
