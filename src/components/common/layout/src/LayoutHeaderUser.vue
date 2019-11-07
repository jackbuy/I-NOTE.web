<template>
    <div class="layout__header-login">
        <template v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </template>
        <template v-else>
            <span
                :class="{'active': isActive === 'search'}"
                class="search-btn"
                @click="handleRoutePush('/search')">
                <i class="icon icon-sousuo"></i>
            </span>
            <span
                :class="{'active': isActive === 'write'}"
                title="写文章"
                @click="handleRoutePush('/write', isActive === 'write')">
                <i class="icon icon-xie1"></i>
            </span>
            <!-- <span
                class="theme"
                title="私信"
                @click="handleTheme()">
                <i class="icon icon-sixin"></i>
            </span> -->
            <span
                :class="{'new-msg': isNewMsg, 'active': isActive === 'msg'}"
                title="消息"
                @click="handleRoutePush('/msg')">
                <i class="icon icon-xiaoxi"></i>
            </span>
            <span
                :class="{'active': !themeLight}"
                title="夜间模式"
                @click="handleTheme()">
                <i class="icon icon-light"></i>
            </span>
            <el-dropdown
                trigger="click"
                @command="handleCommand">
                <el-avatar v-if="userImg" :class="{'active': isActive === 'zone' || isActive === 'settings'}" :size="32" fit="cover" :src="userImg" class="user"></el-avatar>
                <el-avatar v-else :class="{'active': isActive === 'zone' || isActive === 'settings'}" :size="32" class="user"><i class="icon icon-yonghu"></i></el-avatar>
                <el-dropdown-menu>
                    <el-dropdown-item command="zone"><i class="icon icon-yonghu"></i> 我的</el-dropdown-item>
                    <el-dropdown-item divided command="settings"><i class="icon icon-settings-o"></i> 设置</el-dropdown-item>
                    <el-dropdown-item command="loginOut"><i class="icon icon-tuichu"></i> 退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import {
    TOGGLE_LOGIN_MODAL,
    GET_USER_INFO
} from '@/store/mutation-types';
import { imgBaseUrl } from '@/constants/url-config';
import api from '@/utils/api';
export default {
    name: 'LayoutHeaderUser',
    props: {
        newMsg: {
            type: Object,
            default: () => {}
        },
        isActive: String,
        isWrite: Boolean,
        currentUserId: String
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters({
            isLogin: 'isLogin'
        }),
        isNewMsg() {
            const { type, data } = this.newMsg;
            if (type && data) {
                const { toUserId, msgCount } = data;
                if (this.currentUserId === toUserId) {
                    if (msgCount > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        userName() {
            return this.userInfo.nickname ? this.userInfo.nickname : this.userInfo.username;
        },
        userId() {
            return this.userInfo._id;
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
            window.location.href = '/';
        },
        handleRoutePush(path, type) {
            if (type && type === true) return;
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
