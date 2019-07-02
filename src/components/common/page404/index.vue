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
            this.$router.push('/');
        }
    }
};
</script>

<style lang="less">
    .page404{
        padding: 50px;
        &-title{
            font-size: 24px;
        }
        &-descript{
            padding-top: 20px;
        }
        &-button{
            margin-top: 15px;
        }
    }
</style>
