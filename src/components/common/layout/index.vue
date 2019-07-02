<template>
    <layout>
        <layout-header>
            <layout-header-logo></layout-header-logo>
            <layout-header-menu
                :data="menuDate">
            </layout-header-menu>
            <layout-header-search
                @search="handleSearch">
            </layout-header-search>
            <layout-header-login></layout-header-login>
        </layout-header>
        <layout-content>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </layout-content>
        <!-- <layout-footer>footer</layout-footer> -->
    </layout>
</template>

<script>
import Layout from './src/Layout';
import LayoutHeader from './src/LayoutHeader';
import LayoutHeaderLogo from './src/LayoutHeaderLogo';
import LayoutHeaderMenu from './src/LayoutHeaderMenu';
import LayoutHeaderSearch from './src/LayoutHeaderSearch';
import LayoutHeaderLogin from './src/LayoutHeaderLogin';
import LayoutContent from './src/LayoutContent';
import LayoutFooter from './src/LayoutFooter';
export default {
    name: 'LayoutContainer',
    components: {
        Layout,
        LayoutHeader,
        LayoutHeaderLogo,
        LayoutHeaderMenu,
        LayoutHeaderSearch,
        LayoutHeaderLogin,
        LayoutContent,
        LayoutFooter
    },
    data() {
        return {
            menuDate: [
                {
                    id: 1,
                    title: '发现',
                    url: '/'
                },
                {
                    id: 2,
                    title: '消息',
                    url: '/msg_center'
                }
            ]
        };
    },
    methods: {
        handleSearch(keyword) {
            console.log(keyword);
        }
    }
};
</script>
