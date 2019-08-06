<template>
    <div class="tag">
        <div class="tag-content">
            <slot name="list"></slot>
        </div>
        <div class="tag-side">
            <slot name="search"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './index.less';
</style>
