<template>
    <div class="item">
        <div v-if="data.type === 3">
            <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
            <span>{{ msgType }}</span>
        </div>
        <div v-else>
            <span class="user">{{ createUser }}</span>
            <span>{{ msgType }}</span>
            <span>你的文章 [</span>
            <span class="article" @click="handleRouter(`/detail/${relativeId}`)">{{ articleTitle }}</span>
            <span>]</span>
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
            if (this.data.createUserId) return this.data.createUserId._id;
        },
        createUser() {
            if (this.data.createUserId) return this.data.createUserId.nickname ? this.data.createUserId.nickname : this.data.createUserId.username;
        },
        receiveUser() {
            if (this.data.receiveUserId) return this.data.receiveUserId.username;
        },
        msgType() {
            if (this.data.type === 1) return '赞了';
            if (this.data.type === 2) return '收藏了';
            if (this.data.type === 3) return '关注了你';
            // if (this.data.type === 4) return '关注了你专题';
        },
        articleTitle() {
            if (this.data.relativeId) return this.data.relativeId.title;
        },
        relativeId() {
            if (this.data.relativeId) return this.data.relativeId._id;
        }
    },
    methods: {
        handleRouter(path) {
            this.$router.push(path);
        }
    }
};
</script>
