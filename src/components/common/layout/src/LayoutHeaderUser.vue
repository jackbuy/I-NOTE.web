<template>
    <div class="layout__header-login">
        <div v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </div>
        <div v-else>
            <span @click="handleRoutePush('/write')"><i class="el-icon-circle-plus-outline"></i> 写文章</span>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zone">我的主页</el-dropdown-item>
                    <el-dropdown-item command="loginOut" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
    TOGGLE_LOGIN_MODAL,
    GET_USER_INFO
} from '@/store/mutation-types';
export default {
    name: 'LayoutHeaderUser',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        userName() {
            return this.userInfo.username;
        },
        userId() {
            return this.userInfo._id;
        },
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        }
    },
    created() {
        if (this.isLogin) {
            this.getUserInfo();
        }
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
        handleLogOut() {
            localStorage.clear();
            window.location.reload();
        },
        handleRoutePush(url) {
            this.$router.push(url);
        },
        handleCommand(command) {
            if (command === 'loginOut') this.handleLogOut();
            if (command === 'zone') this.handleRoutePush(`/zone/${this.userId}/article`);
        }
    }
};
</script>
