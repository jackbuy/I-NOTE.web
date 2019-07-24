<template>
    <div
        class="article-tag__content-item"
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
                path: `/article/${tagName}`
            });
        }
    }
};
</script>
