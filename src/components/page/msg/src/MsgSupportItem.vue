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
            return this.data.type === 0 ? '赞了' : '收藏了';
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
