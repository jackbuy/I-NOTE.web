<template>
    <div class="layout__header-login">
        <template v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </template>
        <template v-else>
            <el-dropdown v-if="!isWrite" @command="handleCommand" trigger="click">
                <span class="el-dropdown-link write">
                    <i class="icon icon-jia"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="write">写文章</el-dropdown-item>
                    <el-dropdown-item command="topicWrite">创建专题</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleCommand" trigger="click">
                <span class="el-dropdown-link user-img">
                    <img v-if="userInfo.avatar" :src="userImg" alt="">
                    <div v-else>{{ userImg }}</div>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zone"><i class="icon icon-zuozhe"></i> {{ userName }}</el-dropdown-item>
                    <el-dropdown-item divided command="zone"><i class="icon icon-wenzhang"></i> 文章</el-dropdown-item>
                    <el-dropdown-item command="collect"><i class="icon icon-like"></i> 收藏</el-dropdown-item>
                    <el-dropdown-item command="topic"><i class="icon icon-zhuanti"></i> 专题</el-dropdown-item>
                    <el-dropdown-item divided command="follow"><i class="icon icon-guanzhu"></i> 关注</el-dropdown-item>
                    <el-dropdown-item command="fans"><i class="icon icon-fensi"></i> 粉丝</el-dropdown-item>
                    <el-dropdown-item divided command="settings"><i class="el-icon-s-tools"></i> 设置</el-dropdown-item>
                    <el-dropdown-item divided command="loginOut"><i class="icon icon-tuichu"></i> 退出登录</el-dropdown-item>
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
            if (this.userInfo.avatar) {
                return `${imgBaseUrl}/${this.userInfo.avatar}`;
            } else if (this.userName) {
                return this.userName.split('')[0].toUpperCase();
            }
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
        handleLog(type) {
            this.toggleLoginModal({
                open: true,
                type
            });
        },
        handleCommand(command) {
            if (command === 'loginOut') this.handleLogOut();
            if (command === 'write') this.handleRoutePush(`/write`);
            if (command === 'topicWrite') this.handleRoutePush(`/topicWrite`);
            if (command === 'zone') this.handleRoutePush(`/zone/${this.userId}/article`);
            if (command === 'collect') this.handleRoutePush(`/zone/${this.userId}/collect`);
            if (command === 'follow') this.handleRoutePush(`/zone/${this.userId}/follow`);
            if (command === 'topic') this.handleRoutePush(`/zone/${this.userId}/topic`);
            if (command === 'fans') this.handleRoutePush(`/zone/${this.userId}/fans`);
            if (command === 'settings') this.handleRoutePush(`/settings`);
        },
        handleLogOut() {
            localStorage.clear();
            this.handleRoutePush('/');
            setTimeout(() => {
                window.location.reload();
            });
        },
        handleRoutePush(url) {
            this.$router.push(url);
        }
    }
};
</script>
