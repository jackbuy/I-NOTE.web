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
    IS_LOGIN,
    CHECK_USER_IS_LOGIN,
    GET_LOGIN_USERINFO
} from '@/store/mutation-types';
export default {
    name: 'LayoutHeaderUser',
    computed: {
        ...mapState({
            isLogin: state => state.isLogin,
            loginUserInfo: state => state.loginUserInfo
        }),
        userName() {
            return this.loginUserInfo.username;
        },
        userId() {
            return this.loginUserInfo._id;
        }
    },
    created() {
        this.checkUserIsLogin();
        this.getLoginUserInfo();
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL,
            setIsLogin: IS_LOGIN
        }),
        ...mapActions({
            checkUserIsLogin: CHECK_USER_IS_LOGIN,
            getLoginUserInfo: GET_LOGIN_USERINFO
        }),
        handleLog(type) {
            this.toggleLoginModal({
                open: true,
                type
            });
        },
        handleLogOut() {
            localStorage.clear();
            this.$router.push('/');
            setTimeout(() => {
                window.location.reload();
            });
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
