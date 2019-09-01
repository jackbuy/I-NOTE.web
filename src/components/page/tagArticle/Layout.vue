<template>
    <div class="tag-article">
        <div class="tag-article__content">
            <slot name="content"></slot>
        </div>
        <div class="tag-article__side">
            <slot name="detail"></slot>
        </div>
    </div>
</template>

<style lang="less">
    @import './layout.less';
</style>
