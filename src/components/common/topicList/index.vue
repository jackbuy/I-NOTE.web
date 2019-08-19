<template>
    <div class="topic-list">
        <template v-if="data.length > 0">
            <slot
                v-for="item in data"
                :row="item">
            </slot>
        </template>
        <template v-if="!noMore && data.length === 0 && !LoadMore">
            <div class="norecord">暂无数据！</div>
        </template>
        <div v-if='LoadMore' class="loading-tip">加载中...</div>
        <div v-if='noMore && data.length > 0 && !LoadMore' class="loading-tip">~ 我是有底线的 ~</div>
    </div>
</template>

<script>
export default {
    name: 'TopicList',
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        LoadMore: {
            type: Boolean,
            default: false
        },
        noMore: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
