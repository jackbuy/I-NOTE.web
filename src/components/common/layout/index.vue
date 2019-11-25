<template>
    <layout>
        <layout-header v-if="!isHiddenHeader">
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
                :is-active="activePath"
                :current-user-id="currentUserId"
                :new-msg="socketMsg"
                :socket-letter="socketLetter">
        </layout-header-user>
        </layout-header>
        <layout-content :class="{'header-hidden': isHiddenHeader, 'header-fixed': !isHiddenHeader}">
            <keep-alive include="Home">
                <router-view></router-view>
            </keep-alive>
        </layout-content>
        <login></login>
        <el-backtop></el-backtop>
    </layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
                    id: 2,
                    name: 'topic',
                    title: '专题',
                    url: '/topic'
                },
                {
                    id: 4,
                    name: 'tag',
                    title: '话题',
                    url: '/tag'
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
    computed: {
        ...mapState({
            isHiddenHeader: state => state.isHiddenHeader,
            socketMsg: state => state.socketMsg,
            socketLetter: state => state.socketLetter,
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
