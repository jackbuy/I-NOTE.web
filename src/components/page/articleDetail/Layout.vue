<template>
    <div class="home">
        <slot name="menu"></slot>
        <div class="home-content">
            <slot name="author"></slot>
            <slot name="content"></slot>
        </div>
        <div class="home-side">
            <slot name="userinfo"></slot>
            <slot name="recommend"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './layout.less';
</style>
