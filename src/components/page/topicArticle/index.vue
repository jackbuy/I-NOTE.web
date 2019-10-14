<template>
    <layout :is-has="isHas" :loading="pageLoading">
        <card slot="content" :visible-header="true" :padding="false">
            <infinite-scroll
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(topicId)">
                <template slot-scope="scope">
                    <article-item
                        :item="scope.row.articleId"
                        :show-menu-edit="false"
                        :item-id="scope.row._id"
                        @delete="handleDelete">
                    </article-item>
                </template>
            </infinite-scroll>
        </card>
        <card slot="topicDetail" icon="icon icon-zhuanti" :title="topicTitle">
            <template slot="menu">
                <div class="menu">
                    <div v-if="userId !== mine" @click="handleFollow(topicDetail._id, topicDetail.userId._id)" class="menu-btn round">
                        <span v-if="!topicDetail.isFollow">关注</span>
                        <span v-else>已关注</span>
                    </div>
                    <div v-else class="menu-btn round" @click="handleEdit(topicDetail._id)">编辑</div>
                </div>
            </template>
            <template>
                <div v-if="img" class="topic-img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
                <div v-if="description" class="topic-description">{{ description }}</div>
                <div v-if="articleCount > 0" class="topic-count">文章 {{ articleCount }} 篇</div>
                <div v-if="followCount > 0" class="topic-count">关注 {{ followCount }} 人</div>
                <div class="topic-time">{{ createTime }}</div>
            </template>
        </card>
        <card slot="author" icon="icon icon-zuozhe" title="管理员">
            <author-recommend :item="userInfo"></author-recommend>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import AuthorRecommend from '@/components/common/authorRecommend';
import message from '@/mixins/message';
import api from '@/utils/api';
import utils from '@/utils/utils';
import { imgBaseUrl } from '@/constants/url-config';

export default {
    name: 'TopicArticle',
    mixins: [ message ],
    components: {
        Layout,
        Card,
        InfiniteScroll,
        ArticleItem,
        AuthorRecommend
    },
    data() {
        return {
            isHas: true,
            listData: [],
            topicDetail: {},
            pageLoading: false,
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        img() {
            return this.topicDetail.img ? `${imgBaseUrl}/${this.topicDetail.img}` : '';
        },
        topicTitle() {
            return this.topicDetail.title || '未命名专题';
        },
        topicId() {
            return this.$route.params.topicId;
        },
        description() {
            return this.topicDetail.description;
        },
        createTime() {
            return this.topicDetail.createTime ? `创建于 ${utils.formatDate.date(this.topicDetail.createTime)}` : '';
        },
        followCount() {
            return this.topicDetail.followCount;
        },
        articleCount() {
            return this.topicDetail.articleCount;
        },
        userInfo() {
            return this.topicDetail.userId;
        },
        mine() {
            return localStorage.getItem('userId');
        },
        userId() {
            return this.topicDetail.userId ? this.topicDetail.userId._id : '';
        }
    },
    watch: {
        topicId: {
            handler(n, o) {
                this.refresh(n);
            },
            immediate: true
        }
    },
    methods: {
        refresh(topicId) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getTopicInfo(topicId);
        },
        getList(topicId) {
            const params = {
                topicId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.topicArticleQuery(params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        getTopicInfo(topicId) {
            this.pageLoading = true;
            api.topicDetail({ topicId }).then((res) => {
                this.topicDetail = res.data;
                this.getList(topicId);
                this.isHas = true;
                this.pageLoading = false;
            }).catch(() => {
                this.isHas = false;
                this.pageLoading = false;
            });
        },
        // 关注
        handleFollow(topicId, userId) {
            const params = {
                followTopicId: topicId,
                followUserId: userId
            };
            api.followTopic(params).then(() => {
                this.topicDetail.isFollow = !this.topicDetail.isFollow;
            }).catch(() => {});
        },
        // 删除专题文章
        handleDelete(itemId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.topicArticleDelete(this.topicId, itemId).then(() => {
                    let _ids = this.listData.map((item) => item._id);
                    let index = _ids.indexOf(itemId);
                    this.listData.splice(index, 1);
                    this.showSuccessMsg('删除成功');
                });
            }).catch(() => {});
        },
        // 编辑
        handleEdit(topicId) {
            this.$router.push(`/topicWrite/${topicId}`).catch(() => {});
        }
    }
};
</script>
