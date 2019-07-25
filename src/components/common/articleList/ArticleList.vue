<template>
    <div class="article-list">
        <template v-if="data.length > 0">
            <slot
                v-for="item in data"
                :row="item">
            </slot>
        </template>
        <template v-else>
            <div class="norecord">暂无数据！</div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ArticleList',
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
