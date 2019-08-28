<template>
    <div class="topic-article">
        <div class="topic-article__content">
            <slot name="content"></slot>
        </div>
        <div class="topic-article__side">
            <slot name="topicDetail"></slot>
            <slot name="author"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './layout.less';
</style>
