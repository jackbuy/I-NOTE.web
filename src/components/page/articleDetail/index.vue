<template>
    <detail-layout>
        <div class="article-detail" slot="content">
            <div class="article-detail__title">
                {{ title }}
            </div>
            <div class="article-detail__info">
                <span>{{ username }}</span>
                <span :title="createTime">{{ editTime }}</span>
                <span>{{ tag }}</span>
                <span>赞：{{ supportCount }}次</span>
                <span>阅读：{{ viewCount }}次</span>
            </div>
            <div
                v-highlight
                v-html="content"
                class="article-detail__content" >
            </div>
        </div>
    </detail-layout>
</template>

<script>
import DetailLayout from './layout';
import api from '@/utils/api';
import utils from '@/utils/utils';
import message from '@/mixins/message';
export default {
    name: 'ArticleDetail',
    mixins: [ message ],
    components: {
        DetailLayout
    },
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
        username() {
            if (this.detail.userId) return this.detail.userId.username;
        },
        createTime() {
            return `创建于 ${utils.formatDate.time(this.detail.createTime)}`;
        },
        editTime() {
            return `${utils.formatDate.time(this.detail.editTime)}`;
        },
        tag() {
            return this.detail.tagName;
        },
        supportCount() {
            return this.detail.supportCount || 0;
        },
        viewCount() {
            return this.detail.viewCount || 0;
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
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
