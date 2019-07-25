<template>
    <div class="article-detail">
        <div class="article-detail__title">
            {{ title }}
            <b v-if="isOwn">
                <span @click="handleEdit(articleId)">编辑</span>
                <span @click="handleDelete(articleId)">删除</span>
            </b>
        </div>
        <div
            v-highlight
            v-html="content"
            class="article-detail__content" >
        </div>
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
@import './index.less';
</style>
