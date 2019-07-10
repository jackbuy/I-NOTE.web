<template>
    <div class="layout__header-login">
        <div v-if="!isLogin">
            <span>登录</span>
            <span>注册</span>
        </div>
        <div v-else>
            <span>枫叶</span>
            <span>写文章</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeaderLogin',
    computed: {
        isLogin() {
            return true;
        }
    }
};
</script>
