<template>
    <div class="comment-user-item">
        <div class="title">评论：<span @click="handleDetail(articleId)">{{title}}</span></div>
        <div class="content">{{content}}</div>
    </div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        articleId() {
            return this.item.articleId._id;
        },
        title() {
            return this.item.articleId.title;
        },
        content() {
            return this.item.content;
        }
    },
    methods: {
        handleDetail(articleId) {
            this.$router.push(`/p/${articleId}`);
        }
    }
};
</script>
