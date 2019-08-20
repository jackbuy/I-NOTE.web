<template>
    <div class="home">
        <div class="home-content">
            <slot name="header"></slot>
            <slot name="content"></slot>
        </div>
        <div class="home-side">
            <slot name="tag"></slot>
            <slot name="topic"></slot>
            <slot name="author"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './layout.less';
</style>
