<template>
    <div class="home">
        <div class="home-content">
            <slot name="content"></slot>
        </div>
        <div class="home-side">
            <slot name="userinfo"></slot>
            <slot name="recommend"></slot>
        </div>
        <el-backtop></el-backtop>
    </div>
</template>

<style lang="less">
@import './layout.less';
</style>
