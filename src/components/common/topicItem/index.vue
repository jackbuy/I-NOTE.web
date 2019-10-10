<template>
    <div
        class="topic__item"
        :class="{'has-img': img}">
        <div class="topic__item-menu">
            <button v-if="showMenuEdit" @click="handleEdit(itemId)"><i class="el-icon-edit"></i></button>
            <button v-if="showMenuDelete" @click="handleDelete(itemId)"><i class="el-icon-delete"></i></button>
        </div>
        <div class="topic__item-header">
            <div class="img" :style="{backgroundImage: 'url(' + userImg + ')'}"></div>
            <div class="name">{{ username }}</div>
            <div class="time">{{ createTime }}</div>
            <!-- <span class="menu edit" v-if="showMenuEdit" @click="handleEdit(itemId)">编辑</span>
            <span class="menu del" v-if="showMenuDelete" @click="handleDelete(itemId)">删除</span> -->
        </div>
        <div class="topic__item-title">
            <span @click="handleRouterPush(topicId)">{{ title }}</span>
        </div>
        <div class="topic__item-description">
            {{ description }}
        </div>
        <div class="topic__item-img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
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
        showMenuEdit: {
            type: Boolean,
            default: true
        },
        showMenuDelete: {
            type: Boolean,
            default: true
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
            return this.item.description ? this.item.description : '';
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
