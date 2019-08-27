<template>
    <div class="topic-article">
        <div class="topic-article__content">
            <slot name="header"></slot>
            <slot name="content"></slot>
        </div>
        <div class="topic-article__side">
            <slot name="userInfo"></slot>
            <slot name="topicDetail"></slot>
        </div>
    </div>
</template>

<style lang="less">
@import './layout.less';
</style>
