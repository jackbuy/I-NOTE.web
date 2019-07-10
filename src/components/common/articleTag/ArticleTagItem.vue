<template>
    <div
        class="article-tag__content-item"
        @click="handleArticle(tagId)">
        {{ name }}
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
        name() {
            return this.item.name;
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
