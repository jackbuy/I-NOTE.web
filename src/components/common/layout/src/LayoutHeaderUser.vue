<template>
    <div class="layout__header-login">
        <div v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </div>
        <div v-else>
            <span @click="handleRoutePush('/article/add')">+写文章</span>
            <span @click="handleRoutePush('/zone')">枫叶</span>
            <span @click="handleLogOut()">退出</span>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import { TOGGLE_LOGIN_MODAL, IS_LOGIN, CHECK_USER_IS_LOGIN } from '@/store/mutation-types';
export default {
    name: 'LayoutHeaderUser',
    computed: {
        ...mapState({
            isLogin: state => state.isLogin
        })
    },
    created() {
        this.checkUserIsLogin();
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL,
            setIsLogin: IS_LOGIN
        }),
        ...mapActions({
            checkUserIsLogin: CHECK_USER_IS_LOGIN
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
