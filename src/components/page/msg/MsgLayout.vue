<template>
    <div class="msg">
        <div class="msg__header">
            <slot name="header"></slot>
        </div>
        <div class="msg__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './msgLayout.less';
</style>
