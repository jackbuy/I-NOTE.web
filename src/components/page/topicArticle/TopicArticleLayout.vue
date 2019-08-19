<template>
    <div class="topic-article">
        <div class="topic-article__content">
            <slot name="header"></slot>
            <slot name="content"></slot>
        </div>
        <div class="topic-article__side">
            <slot name="tag"></slot>
            <slot name="topic"></slot>
            <slot name="author"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './index.less';
</style>
