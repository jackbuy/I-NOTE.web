<template>
    <div class="article-recommend">
        <div
            class="list"
            :title="title"
            @click="doDetail(articleId)">
            {{ title }}
        </div>
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
