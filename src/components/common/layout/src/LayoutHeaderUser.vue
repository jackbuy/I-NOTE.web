<template>
    <div class="layout__header-login">
        <template v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </template>
        <template v-else>
            <span
                v-if="!isWrite"
                class="search-btn"
                @click="handleRoutePush('/search')">
                <i class="icon icon-sousuo"></i>
            </span>
            <span
                v-if="!isWrite"
                class="write"
                title="写文章"
                @click="handleRoutePush('/write')">
                <i class="icon icon-write"></i>
            </span>
            <span
                v-if="!isWrite"
                class="theme"
                @click="handleTheme()">
                <i v-if="themeLight" class="icon icon-baitian"></i>
                <i v-else class="icon icon-yejian"></i>
            </span>
            <el-dropdown
                v-if="!isWrite"
                trigger="click"
                @command="handleCommand">
                <el-avatar v-if="userImg" :size="30" fit="cover" :src="userImg"></el-avatar>
                <el-avatar v-else :size="30"><i class="icon icon-yonghu"></i></el-avatar>
                <el-dropdown-menu>
                    <el-dropdown-item command="zone"><i class="icon icon-yonghu"></i> 我的主页</el-dropdown-item>
                    <el-dropdown-item divided command="settings"><i class="icon icon-settings-o"></i> 设置</el-dropdown-item>
                    <el-dropdown-item command="loginOut"><i class="icon icon-tuichu"></i> 退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
    TOGGLE_LOGIN_MODAL,
    GET_USER_INFO
} from '@/store/mutation-types';
import { imgBaseUrl } from '@/constants/url-config';
import api from '@/utils/api';
export default {
    name: 'LayoutHeaderUser',
    props: {
        isWrite: Boolean
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        userName() {
            return this.userInfo.nickname ? this.userInfo.nickname : this.userInfo.username;
        },
        userId() {
            return this.userInfo._id;
        },
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        },
        userImg() {
            if (this.isAvatar) {
                return `${imgBaseUrl}/${this.userInfo.avatar}`;
            }
        },
        isAvatar() {
            return this.userInfo.avatar;
        },
        themeLight() {
            return this.userInfo.theme === 'light';
        }
    },
    watch: {
        userInfo: {
            handler(n, o) {
                if (n && n.theme) this.setTheme(`theme-${n.theme}`);
            },
            immediate: true
        }
    },
    created() {
        if (this.isLogin) this.getUserInfo();
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        ...mapActions({
            getUserInfo: GET_USER_INFO
        }),
        handleTheme() {
            const params = {
                theme: this.userInfo.theme === 'light' ? 'dark' : 'light'
            };
            api.userInfoEdit(params).then(() => {
                this.setTheme(`theme-${params.theme}`);
                this.getUserInfo();
            });
        },
        setTheme(theme) {
            document.querySelector('html').setAttribute('class', theme);
        },
        handleLog(type) {
            this.toggleLoginModal({
                open: true,
                type
            });
        },
        handleCommand(command) {
            if (command === 'loginOut') this.handleLogOut('/');
            if (command === 'zone') this.handleRoutePush(`/zone/${this.userId}/article`);
            if (command === 'collect') this.handleRoutePush(`/zone/${this.userId}/collect`);
            if (command === 'follow') this.handleRoutePush(`/zone/${this.userId}/follow`);
            if (command === 'topic') this.handleRoutePush(`/zone/${this.userId}/topic`);
            if (command === 'fans') this.handleRoutePush(`/zone/${this.userId}/fans`);
            if (command === 'settings') this.handleRoutePush(`/settings`);
        },
        handleLogOut(path) {
            localStorage.clear();
            this.handleRoutePush(path);
            setTimeout(() => {
                window.location.reload();
            });
        },
        handleRoutePush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
