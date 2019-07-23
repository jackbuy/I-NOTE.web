<template>
    <div class="article-list__item">
        <div class="article-list__item-header">
            <span>{{ username }}</span>
            <span>{{ updateTime }}</span>
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
            return this.item.username;
        },
        title() {
            return this.item.title;
        },
        articleId() {
            return this.item._id;
        },
        updateTime() {
            return this.item.updateTime;
        },
        tag() {
            return this.item.tag;
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
