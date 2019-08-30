<template>
    <div class="item">
        <div v-if="data.type === 0">
            <span class="user">{{ createUser }}</span>
            <span>{{ msgType }}</span>
            <span class="article" @click="handleRouter(`/detail/${relativeId}`)">{{ likeArticleTitle }}</span>
        </div>
        <div v-if="data.type === 1">
            <span class="user">{{ createUser }}</span>
            <span>{{ msgType }}</span>
            <span class="article" @click="handleRouter(`/detail/${relativeId}`)">{{ collectArticleTitle }}</span>
        </div>
        <div v-if="data.type === 2">
            <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
            <span>{{ msgType }}</span>
        </div>
        <div v-if="data.type === 3">
            <span class="user">{{ createUser }}</span>
            <span>{{ msgType }}</span>
            <span class="article" @click="handleRouter(`/detail/${relativeId}`)">{{ topicTitle }}</span>
        </div>
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
        createUserId() {
            if (this.data.fromUserId) return this.data.fromUserId._id;
        },
        createUser() {
            if (this.data.fromUserId) return this.data.fromUserId.nickname ? this.data.fromUserId.nickname : this.data.fromUserId.username;
        },
        msgType() {
            if (this.data.type === 0) return '赞了';
            if (this.data.type === 1) return '收藏了';
            if (this.data.type === 2) return '关注了你';
            if (this.data.type === 3) return '关注了你专题';
        },
        likeArticleTitle() {
            if (this.data.likeId) return this.data.likeId.title;
        },
        collectArticleTitle() {
            if (this.data.collectId) return this.data.collectId.title;
        },
        topicTitle() {
            if (this.data.topicId) return this.data.topicId.title;
        }
    },
    methods: {
        handleRouter(path) {
            this.$router.push(path);
        }
    }
};
</script>
