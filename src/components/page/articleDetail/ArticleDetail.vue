<template>
    <div class="article-detail">
        <div class="article-detail__title">
            {{ title }}
            <b v-if="isOwn">
                <span @click="handleEdit(articleId)">编辑</span>
                <span @click="handleDelete(articleId)">删除</span>
            </b>
        </div>
        <div class="article-detail__content" v-html="content"></div>
    </div>
</template>

<script>
import api from '@/utils/api';
import message from '@/mixins/message';
export default {
    name: 'ArticleDetail',
    mixins: [ message ],
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
        },
        isOwn() {
            const userId = localStorage.getItem('userId');
            return this.detail.userId === userId;
        }
    },
    created() {
        this.getDetail(this.articleId);
    },
    methods: {
        getDetail(articleId) {
            const params = { articleId };
            api.getDetail(params).then((res) => {
                this.detail = res.data;
            });
        },
        handleEdit(articleId) {
            this.$router.push(`/write/${articleId}`);
        },
        handleDelete(articleId) {
            api.articleDelete(articleId).then(() => {
                this.showSuccessMsg('删除成功！');
                this.$router.push(`/`);
            });
        }
    }
};
</script>

<style lang="less">
.article-detail{
    &__title{
        line-height: 1.4;
        padding: 20px 0 30px 0;
        font-size: 24px;
        span{
            font-size: 12px;
            color: #409EFF;
            padding-left: 20px;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
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
