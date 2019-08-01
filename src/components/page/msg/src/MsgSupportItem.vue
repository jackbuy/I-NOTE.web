<template>
    <div class="item">
        <span class="user">{{ createUser }}</span>
        <span>{{ msgType }}</span>
        <!-- <span>{{ receiveUser }}</span> -->
        <span>你的文章 [</span>
        <span class="article" @click="handleRouter(articleId)">{{ articleTitle }}</span>
        <span>]</span>
    </div>
</template>

<script>
export default {
    name: 'Msg',
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        createUser() {
            if (this.data.createUserId) return this.data.createUserId.username;
        },
        receiveUser() {
            if (this.data.receiveUserId) return this.data.receiveUserId.username;
        },
        msgType() {
            if (this.data.type === 0) return '赞了';
            if (this.data.type === 1) return '收藏了';
            if (this.data.type === 2) return '取消收藏了';
            if (this.data.type === 3) return '关注了';
        },
        articleTitle() {
            if (this.data.articleId) return this.data.articleId.title;
        },
        articleId() {
            if (this.data.articleId) return this.data.articleId._id;
        }
    },
    methods: {
        handleRouter(articleId) {
            this.$router.push(`/detail/${articleId}`);
        }
    }
};
</script>
