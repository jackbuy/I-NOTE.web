<template>
    <div
        class="article-tag"
        :class="{'active': tagName === activeTagName}"
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
        },
        activeTagName() {
            return this.$route.params.tagName || 'all';
        }
    },
    methods: {
        handleArticle(tagName) {
            this.$router.push({
                path: `/article/${tagName}`
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
