<template>
    <div class="page404">
        <div class="page404-title">404</div>
        <div class="page404-descript">抱歉，您访问的页面不存在！</div>
        <div class="page404-button"><el-button size="mini " round @click="handleToHome">返回首页</el-button></div>
    </div>
</template>

<script>
export default {
    name: 'Page404',
    methods: {
        handleToHome() {
            this.$router.push('/').catch(() => {});
        }
    }
};
</script>
