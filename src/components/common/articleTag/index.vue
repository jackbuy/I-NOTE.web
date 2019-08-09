<template>
    <div
        class="article-tag"
        @click="handleArticle(tagId)">
        {{ title }}
    </div>
</template>

<script>
export default {
    name: 'ArticleTagItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        title() {
            return this.item.title;
        },
        tagId() {
            return this.item._id;
        }
    },
    methods: {
        handleArticle(tagId) {
            this.$router.push({
                path: `/tag/${tagId}`
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
