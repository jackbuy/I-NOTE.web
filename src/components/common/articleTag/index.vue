<template>
    <div
        class="article-tag"
        @click="handleArticle(tagName)">
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
        tagName() {
            return this.item.name;
        }
    },
    methods: {
        handleArticle(tagName) {
            this.$router.push({
                path: `/tag/${tagName}`
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
