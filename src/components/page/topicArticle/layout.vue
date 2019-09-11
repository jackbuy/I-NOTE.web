<template>
    <div v-if="isHas" class="topic-article">
        <div class="topic-article__content">
            <slot name="content"></slot>
        </div>
        <div class="topic-article__side">
            <slot name="topicDetail"></slot>
            <slot name="author"></slot>
        </div>
    </div>
    <div v-else class="no-has">专题不存在</div>
</template>

<script>
export default {
    name: '',
    props: {
        isHas: Boolean
    }
};
</script>

<style lang="less">
    @import './layout.less';
</style>
