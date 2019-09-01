<template>
    <div
        class="article-recommend"
        @click="doDetail(articleId)">
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: 'ArticleRecommend',
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        currentArticleId: {
            type: String,
            default: ''
        }
    },
    computed: {
        title() {
            return this.item.title;
        },
        articleId() {
            return this.item._id;
        }
    },
    methods: {
        doDetail(articleId) {
            this.$emit('doDetail', articleId);
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
