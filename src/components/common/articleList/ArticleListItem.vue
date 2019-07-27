<template>
    <div class="article-list__item">
        <div class="article-list__item-header">
            <span>{{ username }}</span>
            <span :title="createTime">{{ editTime }}</span>
            <span>{{ tag }}</span>
            <span>赞：{{ supportCount }}次</span>
            <span>阅读：{{ viewCount }}次</span>
        </div>
        <div class="article-list__item-title">
            <span @click="handleDetail(articleId)">{{ title }}</span>
        </div>
        <div class="article-list__item-action">
            <slot :row="item"></slot>
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
        supportCount() {
            return this.item.supportCount || 0;
        },
        viewCount() {
            return this.item.viewCount || 0;
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
