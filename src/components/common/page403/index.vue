<template>
    <div class="page403">
        <div class="page403-title">403</div>
        <div class="page403-descript">抱歉，您没有权限访问该页面！</div>
        <div class="page403-button"><el-button size="mini " round @click="handleToHome">返回首页</el-button></div>
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
    .page403{
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
