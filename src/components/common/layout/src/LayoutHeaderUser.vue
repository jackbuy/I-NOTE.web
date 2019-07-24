<template>
    <div class="layout__header-login">
        <div v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </div>
        <div v-else>
            <span @click="handleRoutePush('/write')">+写文章</span>
            <span @click="handleRoutePush(`/zone/${userId}/article`)">{{ userName }}</span>
            <span @click="handleLogOut()">退出</span>
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
            window.location.reload();
        },
        handleRoutePush(url) {
            this.$router.push(url);
        }
    }
};
</script>
