<template>
    <div class="detail">
        <slot name="menu"></slot>
        <div class="detail-content">
            <slot name="author"></slot>
            <slot name="content"></slot>
        </div>
        <div class="detail-side">
            <slot name="userinfo"></slot>
            <slot name="recommend"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './layout.less';
</style>
