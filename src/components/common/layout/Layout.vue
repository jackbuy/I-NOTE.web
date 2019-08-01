<template>
    <layout>
        <layout-header>
            <layout-header-logo></layout-header-logo>
            <layout-header-menu
                v-if="menuDate.length > 0"
                :data="menuDate"
                @push="handleRouterPush">
            </layout-header-menu>
            <layout-header-search
                @search="handleSearch">
            </layout-header-search>
            <layout-header-user></layout-header-user>
        </layout-header>
        <layout-content>
            <breadcrumb></breadcrumb>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </layout-content>
        <!-- <layout-footer>footer</layout-footer> -->
        <login></login>
    </layout>
</template>

<script>
import Layout from './src/LayoutMain';
import LayoutHeader from './src/LayoutHeader';
import LayoutHeaderLogo from './src/LayoutHeaderLogo';
import LayoutHeaderMenu from './src/LayoutHeaderMenu';
import LayoutHeaderSearch from './src/LayoutHeaderSearch';
import LayoutHeaderUser from './src/LayoutHeaderUser';
import LayoutContent from './src/LayoutContent';
import LayoutFooter from './src/LayoutFooter';
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
        LayoutFooter,
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
                {
                    id: 2,
                    title: '消息',
                    url: '/msg'
                }
            ]
        };
    },
    computed: {
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        },
        menuDate() {
            return this.isLogin ? this.baseMenuDate : [];
        }
    },
    methods: {
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
