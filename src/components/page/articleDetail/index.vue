<template>
    <detail-layout>
        <div class="article-detail" slot="content">
            <div class="article-detail__title">
                {{ title }}
                <span v-if="currentUserId === userId" @click="handleRouterEdit(articleId)">编辑</span>
            </div>
            <UserAvatar
                v-if="userInfo"
                :user="userInfo"
                :follow="isFollow"
                @doFollow="handleFollow">
                <div class="article-detail__info">
                    <span :title="createTime">{{ editTime }}</span>
                    <span>{{ tag }}</span>
                    <span>浏览：{{ viewCount }}次</span>
                </div>
            </UserAvatar>
            <div
                v-highlight
                v-html="content"
                class="article-detail__content" >
            </div>
        </div>
        <card slot="recommend" title="相关文章" v-model="recommendData">
        </card>
    </detail-layout>
</template>

<script>
import DetailLayout from './layout';
import Card from '@/components/common/card';
import UserAvatar from '@/components/common/userAvatar';
import api from '@/utils/api';
import utils from '@/utils/utils';
import ArticleCommon from '@/mixins/articleCommon';
export default {
    name: 'ArticleDetail',
    mixins: [ ArticleCommon ],
    components: {
        DetailLayout,
        Card,
        UserAvatar
    },
    data() {
        return {
            detail: {},
            recommendData: []
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
        userInfo() {
            if (this.detail.userId) return this.detail.userId;
        },
        username() {
            if (this.detail.userId) return this.detail.userId.username;
        },
        userId() {
            if (this.detail.userId) return this.detail.userId._id;
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
        },
        isFollow() {
            return this.detail.isFollow;
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
        // 关注
        handleFollow() {
            api.followUser(this.userId).then(() => {
                this.detail.isFollow = !this.detail.isFollow;
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
