<template>
    <div class="article-list__item">
        <div class="article-list__item-header">
            <span>{{ username }}</span>
            <span :title="createTime">{{ editTime }}</span>
            <span>{{ tag }}</span>
        </div>
        <div class="article-list__item-title">
            <span @click="handleDetail(articleId)">{{ title }}</span>
        </div>
        <div class="article-list__item-action">
            <span>赞 {{ support }}</span>
            <span>收藏 {{ collect }}</span>
        </div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
export default {
    name: 'ArticleListItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        username() {
            return this.item.userId.username;
        },
        title() {
            return this.item.title;
        },
        articleId() {
            return this.item._id;
        },
        createTime() {
            return `创建于 ${utils.formatDate.time(this.item.createTime)}`;
        },
        editTime() {
            return `${utils.formatDate.time(this.item.editTime)}`;
        },
        tag() {
            return this.item.tagName;
        },
        support() {
            return this.item.support;
        },
        collect() {
            return this.item.collect;
        }
    },
    methods: {
        handleDetail(articleId) {
            this.$router.push({
                path: `/detail/${articleId}`
            });
        }
    }
};
</script>
