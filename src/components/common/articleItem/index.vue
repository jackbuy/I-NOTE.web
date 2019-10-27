<template>
    <div class="article__item">
        <div
            v-if="type === 'normal'"
            class="user"
            @click="handleUser(userId)">
            <el-avatar v-if="userImg" :size="40" fit="cover" :src="userImg"></el-avatar>
            <el-avatar v-else :size="40"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="content">
            <div
                v-if="type === 'normal'"
                class="content-name"
                @click="handleUser(userId)">
                <span>{{ username }}</span>
            </div>
            <div class="content-title">
                <span @click="handleDetail(articleId)">{{ title }}</span>
            </div>
            <div class="content-description">{{ description }}</div>
            <div class="content-info">
                <span v-if="tag">{{ tag }}</span>
                <span>{{ time }}</span>
                <span v-if="viewCount > 0">浏览 {{ viewCount }}</span>
                <!-- <span v-if="collectCount > 0"><i class="icon icon-like"></i> {{ collectCount }}</span> -->
                <!-- <span v-if="commentCount > 0"><i class="icon icon-pinglun"></i> {{ commentCount }}</span> -->
                <span v-if="likeCount > 0">点赞 {{ likeCount }}</span>
            </div>
        </div>
        <div v-if="isAction" class="action">
            <slot :row="item" :item-id="itemId"></slot>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
import utils from '@/utils/utils';
export default {
    name: 'ArticleListItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        // 此字段为特殊自定义字段
        itemId: {
            type: String,
            default: ''
        },
        isAction: {
            type: Boolean,
            default: true
        },
        /*
        * 列表模式
        * normal simple 两种模式
        */
        type: {
            type: String,
            default: 'normal'
        }
    },
    computed: {
        username() {
            if (this.item && this.item.userId) {
                return this.item.userId.nickname ? this.item.userId.nickname : this.item.userId.username;
            }
        },
        userId() {
            if (this.item && this.item.userId) {
                return this.item.userId._id;
            }
        },
        userImg() {
            if (this.item && this.item.userId) {
                return this.item.userId && this.item.userId.avatar ? `${imgBaseUrl}/${this.item.userId.avatar}` : '';
            }
        },
        title() {
            if (this.item && this.item.title) {
                return this.item.title;
            } else {
                return '无标题';
            }
        },
        description() {
            if (this.item && this.item.contentText) return this.item.contentText;
        },
        isPublish() {
            if (this.item) return this.item.publishTime;
        },
        articleId() {
            if (this.item) return this.item._id;
        },
        time() {
            if (this.item && this.item.title) {
                let time = this.item && this.item.publishTime ? this.item.publishTime : this.item.editTime;
                let end = utils.formatDate.time(time);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        },
        tag() {
            if (this.item && this.item.tagId && this.item.tagId.parentId) {
                return `${this.item.tagId.parentId.title} · ${this.item.tagId.title}`;
            };
        },
        viewCount() {
            if (this.item) return this.item.viewCount > 0 ? this.item.viewCount : '';
        },
        likeCount() {
            if (this.item) return this.item.likeCount > 0 ? this.item.likeCount : '';
        },
        collectCount() {
            if (this.item) return this.item.collectCount > 0 ? this.item.collectCount : '';
        },
        commentCount() {
            if (this.item) return this.item.commentCount > 0 ? this.item.commentCount : '';
        }
    },
    methods: {
        handleDetail(articleId) {
            let path = this.isPublish ? `/detail/${articleId}` : `/write/${articleId}`;
            this.handleRouterPush(path);
        },
        handleUser(userId) {
            const path = `/zone/${userId}/article`;
            this.handleRouterPush(path);
        },
        handleEdit(itemId) {
            this.$emit('edit', itemId);
        },
        handleDelete(itemId) {
            this.$emit('delete', itemId);
        },
        handleRouterPush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
