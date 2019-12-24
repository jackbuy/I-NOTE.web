<template>
    <div class="item">
        <div class="item-title">
            <i v-if="!isRead" class="icon icon-weidu not-read"></i>
            <i v-else class="icon icon-yidu"></i>
            <template v-if="data.type === 0">
                <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
                <span :class="{'not-read': !isRead}">{{ msgTime }}</span>
                <span :class="{'not-read': !isRead}">{{ msgType }}</span>
                <span class="article" @click="handleRouter(`/p/${likeArticleId}`)">{{ likeArticleTitle }}</span>
            </template>
            <template v-if="data.type === 1">
                <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
                <span :class="{'not-read': !isRead}">{{ msgTime }}</span>
                <span :class="{'not-read': !isRead}">{{ msgType }}</span>
                <span class="article" @click="handleRouter(`/p/${collectArticleId}`)">{{ collectArticleTitle }}</span>
            </template>
            <template v-if="data.type === 2">
                <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
                <span :class="{'not-read': !isRead}">{{ msgTime }}</span>
                <span :class="{'not-read': !isRead}">{{ msgType }}</span>
            </template>
            <template v-if="data.type === 3">
                <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
                <span :class="{'not-read': !isRead}">{{ msgTime }}</span>
                <span :class="{'not-read': !isRead}">{{ msgType }}</span>
                <span class="article" @click="handleRouter(`/topic/${topicId}`)">{{ topicTitle }}</span>
            </template>
            <template v-if="data.type === 4">
                <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
                <span :class="{'not-read': !isRead}">{{ msgTime }}</span>
                <span :class="{'not-read': !isRead}">{{ msgType }}</span>
                <span class="article" @click="handleRouter(`/p/${commentArticleId}`)">{{ commentArticleTitle }}</span>
            </template>
            <template v-if="data.type === 5">
                <span class="user" @click="handleRouter(`/zone/${createUserId}/article`)">{{ createUser }}</span>
                <span :class="{'not-read': !isRead}">{{ msgTime }}</span>
                <span :class="{'not-read': !isRead}">{{ msgType }}</span>
                <span class="article" @click="handleRouter(`/p/${replyArticleId}`)">{{ replyArticleTitle }}</span>
            </template>
        </div>
        <div class="item-menu">
            <span
                v-if="!isRead && activeTabName === 'all'"
                title="标记为已读"
                @click="handleRead(messageId)">
                <i class="icon icon-biaoji"></i>
            </span>
            <span
                title="删除"
                @click="handleDelete(messageId)">
                <i class="el-icon-close"></i>
            </span>
        </div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
export default {
    name: 'MsgItem',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        activeTabName: String
    },
    computed: {
        messageId() {
            return this.data._id;
        },
        isRead() {
            return this.data.isRead;
        },
        createUserId() {
            if (this.data.fromUserId) return this.data.fromUserId._id;
        },
        createUser() {
            if (this.data.fromUserId) return this.data.fromUserId.nickname ? this.data.fromUserId.nickname : this.data.fromUserId.username;
        },
        msgType() {
            if (this.data.type === 0) return '赞了你的文章';
            if (this.data.type === 1) return '收藏了你的文章';
            if (this.data.type === 2) return '关注了你';
            if (this.data.type === 3) return '关注了你的专题';
            if (this.data.type === 4) return '评论了你的文章';
            if (this.data.type === 5) return '回复了你的评论';
        },
        msgTime() {
            if (this.data.createTime) {
                let end = utils.formatDate.time(this.data.createTime);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        },
        likeArticleTitle() {
            if (this.data.likeId) return this.data.likeId.title;
        },
        likeArticleId() {
            if (this.data.likeId) return this.data.likeId._id;
        },
        collectArticleTitle() {
            if (this.data.collectId) return this.data.collectId.title;
        },
        collectArticleId() {
            if (this.data.collectId) return this.data.collectId._id;
        },
        topicTitle() {
            if (this.data.topicId) return this.data.topicId.title;
        },
        topicId() {
            if (this.data.topicId) return this.data.topicId._id;
        },
        commentArticleTitle() {
            if (this.data.commentId) return this.data.commentId.title;
        },
        commentArticleId() {
            if (this.data.commentId) return this.data.commentId._id;
        },
        replyArticleTitle() {
            if (this.data.replyId) return this.data.replyId.title;
        },
        replyArticleId() {
            if (this.data.replyId) return this.data.replyId._id;
        }
    },
    methods: {
        handleRouter(path) {
            this.$router.push(path).catch(() => {});
        },
        handleRead(messageId) {
            this.$emit('read', messageId);
        },
        handleDelete(messageId) {
            this.$emit('del', messageId);
        }
    }
};
</script>
