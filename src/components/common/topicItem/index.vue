<template>
    <div class="topic__item">
        <div class="img-box" @click="handleRouterPush(topicId)">
            <div class="count">{{ articleCount }} 篇</div>
            <div class="img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
        </div>
        <div class="content">
            <div class="content-title">
                <span @click="handleRouterPush(topicId)">{{ title }}</span>
            </div>
            <div v-if="description" class="content-des">{{ description }}</div>
            <div class="content-info">
                <span v-if="type === 'normal'">{{ username }}</span>
                <!-- <span>文章 {{ articleCount }}</span> -->
                <span>{{ createTime }}</span>
                <span>关注 {{ followCount }}</span>
            </div>
        </div>
        <div v-if="isAction" class="action">
            <div class="menu">
                <button @click="handleEdit(itemId)"><i class="el-icon-edit"></i></button>
                <button @click="handleDelete(itemId)"><i class="el-icon-delete"></i></button>
            </div>
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
        description() {
            return this.item.description;
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
