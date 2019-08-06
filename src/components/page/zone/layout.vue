<template>
    <div class="zone">
        <div class="zone__header">
            <slot name="header"></slot>
        </div>
        <div class="zone__menu">
            <slot name="menu"></slot>
        </div>
        <div class="zone__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './index.less';
</style>
