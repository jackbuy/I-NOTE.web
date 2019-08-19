<template>
    <detail-layout>
        <div
            class="article-author"
            slot="author">
            <user-avatar
                v-if="userInfo"
                :user="userInfo"
                :follow="isFollow"
                @doFollow="handleFollow">
                <div class="article-detail__info">
                    <span :title="createTime">{{ editTime }}</span>
                    <span>{{ tag }}</span>
                    <span>浏览 {{ viewCount }}</span>
                </div>
            </user-avatar>
        </div>
        <div class="article-detail__menu" slot="menu">
            <button
                :disabled="currentUserId === userId"
                :class="{'active': isSupport}"
                @click="handleSupport(isSupport)">
                <i v-if="isSupport" class="icon icon-dianzan"></i>
                <i v-else class="icon icon-dianzan-o"></i>
                <span v-if="supportCount > 0">{{ supportCount }}</span>
            </button>
            <button
                :disabled="currentUserId === userId"
                :class="{'active': isCollect}"
                @click="handleCollect(isCollect)">
                <i v-if="isCollect" class="icon icon-like"></i>
                <i v-else class="icon icon-like-o"></i>
                <span v-if="collectCount > 0">{{ collectCount }}</span>
            </button>
        </div>
        <div class="article-detail" slot="content">
            <div class="article-detail__title">
                {{ title }}
                <span v-if="currentUserId === userId" @click="handleRouterEdit(articleId)">编辑</span>
            </div>
            <div
                v-highlight
                v-html="content"
                class="article-detail__content" >
            </div>
        </div>
        <card slot="recommend" icon="icon icon-wenzhang" title="相关文章">
            <article-recommend
                slot="content"
                v-for="item in recommendFilterData"
                :key="item._id"
                :item="item"
                @doDetail="handleRecommend">
            </article-recommend>
        </card>
    </detail-layout>
</template>

<script>
import DetailLayout from './DetailLayout';
import Card from '@/components/common/card';
import UserAvatar from '@/components/common/userAvatar';
import ArticleRecommend from '@/components/common/articleRecommend';
import api from '@/utils/api';
import utils from '@/utils/utils';
export default {
    name: 'ArticleDetail',
    components: {
        DetailLayout,
        Card,
        UserAvatar,
        ArticleRecommend
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
            if (this.detail.tagId) return this.detail.tagId.title;
        },
        supportCount() {
            return this.detail.supportCount || 0;
        },
        collectCount() {
            return this.detail.collectCount || 0;
        },
        viewCount() {
            return this.detail.viewCount || 0;
        },
        isFollow() {
            return this.detail.isFollow;
        },
        isSupport() {
            return this.detail.isSupport;
        },
        isCollect() {
            return this.detail.isCollect;
        },
        recommendFilterData() {
            let arr = [];
            this.recommendData.map((item) => {
                if (item._id !== this.articleId) arr.push(item);
            });
            return arr;
        },
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    watch: {
        articleId: {
            handler(n, o) {
                this.getDetail(n);
            },
            immediate: true
        }
    },
    methods: {
        getDetail(articleId) {
            const params = { articleId };
            api.getDetail(params).then((res) => {
                this.detail = res.data;
                this.recommend(this.detail.tagId._id);
            });
        },
        // 关注
        handleFollow() {
            const params = {
                followId: this.userId,
                type: 0
            };
            api.follow(params).then(() => {
                this.detail.isFollow = !this.detail.isFollow;
            });
        },
        // 收藏
        handleCollect(type) {
            api.articleCollect(this.articleId).then(() => {
                if (!type) {
                    this.detail.isCollect = true;
                    this.detail.collectCount++;
                } else {
                    this.detail.isCollect = false;
                    this.detail.collectCount--;
                }
            });
        },
        // 赞
        handleSupport(type) {
            api.articleSupport(this.articleId).then(() => {
                if (!type) {
                    this.detail.isSupport = true;
                    this.detail.supportCount++;
                } else {
                    this.detail.isSupport = false;
                    this.detail.supportCount--;
                }
            });
        },
        // 相关文章
        recommend(tagId) {
            const params = {
                publish: true,
                pageSize: 6,
                currentPage: 1,
                tagId
            };
            api.articleQuery(params).then((res) => {
                this.recommendData = res.data;
            });
        },
        // 详情
        handleRecommend(articleId) {
            this.$router.push(`/detail/${articleId}`);
        },
        // 编辑
        handleRouterEdit(articleId) {
            this.$router.push(`/write/${articleId}`);
        }
    }
};
</script>
