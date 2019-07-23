<template>
    <div class="article-detail">
        <div class="article-detail__title">{{ title }}</div>
        <div class="article-detail__content" v-html="content"></div>
    </div>
</template>

<script>
import api from '@/utils/api';
export default {
    name: 'ArticleDetail',
    data() {
        return {
            detail: {}
        };
    },
    computed: {
        articleId() {
            return this.$route.params.articleId;
        },
        title() {
            return this.detail.title;
        },
        content() {
            return this.detail.contentHtml;
        }
    },
    created() {
        this.getDetail(this.articleId);
    },
    methods: {
        getDetail(articleId) {
            const params = {
                articleId
            };
            api.getDetail(params).then((res) => {
                this.detail = res.data;
            });
        }
    }
};
</script>

<style lang="less">
.article-detail{
    &__title{
        line-height: 1.4;
        padding: 20px 0;
        font-size: 24px;
    }
    &__content{
        line-height: 1.8;
        font-size: 16px;
        p,
        pre{
            margin-bottom: 10px;
        }
        pre{
            background: #f5f5f5;
            border-radius: 4px;
            padding: 15px;
        }
    }
}
</style>
