<template>
    <div class="topic__item">
        <div v-if="type === 'normal'" class="user">
            <el-avatar v-if="userImg" :size="40" :src="userImg"></el-avatar>
            <el-avatar v-else :size="40"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="content">
            <div v-if="type === 'normal'" class="content-name">{{ username }}</div>
            <div class="content-title">
                <span @click="handleRouterPush(topicId)">{{ title }}</span>
            </div>
            <div class="content-info">
                <span>文章 {{ articleCount }}</span>
                <span>关注 {{ followCount }}</span>
                <span>{{ createTime }}</span>
            </div>
        </div>
        <div v-if="isAction" class="action">
            <div class="menu">
                <button @click="handleEdit(itemId)"><i class="el-icon-edit"></i></button>
                <button @click="handleDelete(itemId)"><i class="el-icon-delete"></i></button>
            </div>
        </div>
        <div v-else class="img">
            <div :style="{backgroundImage: 'url(' + img + ')'}"></div>
        </div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'TopicItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        itemId: String,
        isAction: {
            type: Boolean,
            default: false
        },
        // 列表模式
        type: {
            type: String,
            default: 'normal' // normal simple 两种模式
        }
    },
    computed: {
        username() {
            if (this.item && this.item.userId) return this.item.userId.nickname ? this.item.userId.nickname : this.item.userId.username;
        },
        title() {
            if (this.item && this.item.title) {
                return this.item.title;
            } else {
                return '未命名专题';
            }
        },
        topicId() {
            if (this.item) return this.item._id || '';
        },
        createTime() {
            if (this.item) {
                let end = utils.formatDate.time(this.item.createTime);
                let start = utils.formatDate.now();
                return utils.diffDate(start, end);
            }
        },
        userImg() {
            return this.item.userId && this.item.userId.avatar ? `${imgBaseUrl}/${this.item.userId.avatar}` : '';
        },
        img() {
            return this.item.img ? `${imgBaseUrl}/${this.item.img}` : '';
        },
        followCount() {
            return this.item.followCount;
        },
        articleCount() {
            return this.item.articleCount;
        }
    },
    methods: {
        handleRouterPush(topicId) {
            let path = `/topic/${topicId}`;
            this.$router.push({ path }).catch(() => {});
        },
        handleEdit(itemId) {
            this.$emit('edit', itemId);
        },
        handleDelete(itemId) {
            this.$emit('delete', itemId);
        }
    }
};
</script>
